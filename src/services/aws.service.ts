import { FileUploadRequestType, BulkFileUploadRequestType } from "../types/aws.type.js";
import { AppError } from "../utils/error/AppError.js";
import {
    MAX_IMAGE_SIZE_LIMIT,
    MAX_VIDEO_SIZE_LIMIT,
    validFileContentTypes,
    validFileExtensions,
    validFileTypes,
} from "../utils/constants.js";
import { getUploadSignedUrl } from "../integrations/aws/s3.js";
import { generateFileKey } from "../utils/integration/aws/generateFileKey.js";
import { randomUUID } from "crypto";

class AwsService {

    // ── Single file (existing, unchanged) ─────────────────────────────────────
    async generateSignedUploadUrl(uploadData: FileUploadRequestType) {
        const { fileContentType, fileExtension, fileName, fileSize, fileType, fileCategory } = uploadData;

        if (!fileContentType || !fileExtension || !fileName || !fileSize || !fileType || !fileCategory) {
            throw new AppError("Missing file data", 400);
        }
        if (!validFileTypes.includes(fileType)) {
            throw new AppError("Invalid file type", 400);
        }
        if (!validFileContentTypes.includes(fileContentType)) {
            throw new AppError("Invalid content type", 400);
        }

        const fileSizeInMb = fileSize / (1024 * 1024);
        const maxUploadLimit = fileType === "video" ? MAX_VIDEO_SIZE_LIMIT : MAX_IMAGE_SIZE_LIMIT;
        if (fileSizeInMb > maxUploadLimit) {
            throw new AppError(`File size exceeds ${maxUploadLimit} MB for ${fileType}`, 400);
        }
        if (!validFileExtensions.includes(fileExtension)) {
            throw new AppError("Invalid file extension", 400);
        }

        const fileKey = generateFileKey(fileCategory, fileName, fileExtension);
        const url = await getUploadSignedUrl(fileKey, fileContentType);

        return { key: fileKey, url, fileType };
    }

    // ── Bulk property upload ──────────────────────────────────────────────────
    async generateBulkSignedUploadUrls(data: BulkFileUploadRequestType) {
        const { propertyId, files } = data;

        if (!propertyId) throw new AppError("Property ID is required", 400);
        if (!files || files.length === 0) throw new AppError("No files provided", 400);
        if (files.length > 11) throw new AppError("Max 11 files allowed (7 images + 4 videos)", 400);

        const images: { key: string; url: string; fileType: string }[] = [];
        const videos: { key: string; url: string; fileType: string }[] = [];

        await Promise.all(
            files.map(async (file) => {
                const { fileContentType, fileExtension, fileName, fileSize, fileType } = file;

                // Validate file metadata
                if (!fileType || !validFileTypes.includes(fileType)) {
                    throw new AppError(`Invalid file type: ${fileType}`, 400);
                }
                if (!fileContentType || !validFileContentTypes.includes(fileContentType)) {
                    throw new AppError(`Invalid content type: ${fileContentType}`, 400);
                }
                if (!fileExtension || !validFileExtensions.includes(fileExtension)) {
                    throw new AppError(`Invalid file extension: ${fileExtension}`, 400);
                }

                const fileSizeInMb = fileSize / (1024 * 1024);
                const maxLimit = fileType === "video" ? MAX_VIDEO_SIZE_LIMIT : MAX_IMAGE_SIZE_LIMIT;
                if (fileSizeInMb > maxLimit) {
                    throw new AppError(`${fileName} exceeds ${maxLimit} MB limit for ${fileType}`, 400);
                }

                // Build S3 key: uploads/property/property-{id}/images|videos/{uuid}-{name}.{ext}
                const subfolder = fileType === "video" ? "videos" : "images";
                const fileKey = `uploads/property/property-${propertyId}/${subfolder}/${randomUUID()}-${fileName}.${fileExtension}`;

                const url = await getUploadSignedUrl(fileKey, fileContentType);
                const result = { key: fileKey, url, fileType };

                if (fileType === "video") {
                    videos.push(result);
                } else {
                    images.push(result);
                }
            })
        );

        return { propertyId, images, videos, total: files.length };
    }
}

export const awsService = new AwsService();