import { validFileTypes, validImageUploadContentTypes, validVideoUploadContentTypes, validFileExtensions } from "../utils/constants.js";

export type FileUploadRequestType = {
    fileName: string;
    fileSize: number;
    fileType: FileType;
    fileContentType: UploadFileContentType;
    fileExtension: FileExtension;
    fileCategory: FileCategory;
}

export type UploadImageContentType = typeof validImageUploadContentTypes[number];
export type UploadVideoContentType = typeof validVideoUploadContentTypes[number];
export type UploadFileContentType = UploadImageContentType | UploadVideoContentType;

export type FileType = typeof validFileTypes[number];

export type FileCategory = "property" | "user" | "transaction" | "recording";
export type FileExtension = typeof validFileExtensions[number];