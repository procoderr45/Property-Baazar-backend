import { s3Client } from "../config/s3Client.js";
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { FileUploadRequestType } from "../types/aws.type.js";
import { getTypedEnv } from "../config/env.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { AppError } from "../utils/error/AppError.js";
import { MAX_IMAGE_SIZE_LIMIT, MAX_VIDEO_SIZE_LIMIT, validFileContentTypes, validFileExtensions, validFileTypes } from "../utils/constants.js";
import { getUploadSignedUrl } from "../integrations/aws/s3.js";
import { generateFileKey } from "../utils/integration/aws/generateFileKey.js";

class AwsService {
    async generateSignedUploadUrl(uploadData: FileUploadRequestType) {

        const { fileContentType, fileExtension, fileName, fileSize, fileType, fileCategory } = uploadData;

        if (!fileContentType || !fileExtension || !fileName || !fileSize || !fileType || !fileCategory) {
            throw new AppError("Please provide valid file content type, extension, size, type, category and name", 400);
        }

        if (!validFileTypes.includes(fileType)) {
            throw new AppError("Invalid file type provided", 400);
        }

        if (!validFileContentTypes.includes(fileContentType)) {
            throw new AppError("Invalid content type provided", 400);
        }

        const fileSizeInMb = fileSize / (104 * 1024);
        const maxUploadLimit = (fileType === "video" ? MAX_VIDEO_SIZE_LIMIT : MAX_IMAGE_SIZE_LIMIT);

        if(fileSizeInMb > maxUploadLimit) {
            throw new AppError(`File size exceeds ${maxUploadLimit} mb for ${fileType}.`, 400)
        }

        if(!validFileExtensions.includes(fileExtension)) {
            throw new AppError("Please provide valid file extension", 400);
        }

        //TODO: add validation on extension of file also
        const fileKey = generateFileKey(fileCategory, fileName, fileExtension);

        const url = await getUploadSignedUrl(fileKey, fileContentType);

        return url;
    }
}

export const awsService = new AwsService();