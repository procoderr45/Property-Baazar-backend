import { FileCategory, FileExtension, UploadFileContentType } from "../../../types/aws.type.js";
import { BASE_BUCKET_KEY } from "../../constants.js";

export const generateFileKey = (type: FileCategory, fileName: string, fileExtension: FileExtension) => {
    const uniqueFileName = fileName + `-${Date.now()}.${fileExtension}`;

    const key = BASE_BUCKET_KEY + '/' + type + '/' + uniqueFileName;

    return key;
}