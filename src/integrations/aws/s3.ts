import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3"
import { UploadFileContentType } from "../../types/aws.type.js"
import { getTypedEnv } from "../../config/env.js"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { s3Client } from "../../config/s3Client.js"
const bucketName = getTypedEnv().AWS_BUCKET;

export const getUploadSignedUrl = async (fileKey: string, fileContentType: UploadFileContentType) => {

    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: fileKey,
        ContentType: fileContentType
    })

    const url = await getSignedUrl(s3Client, command, {
        expiresIn: 180
    });
    return url;
}

export const getSignedFileUrl = async (key: string) => {
    const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: key,
    });

    return await getSignedUrl(s3Client, command, {
        expiresIn: 60 * 60,
    });
};