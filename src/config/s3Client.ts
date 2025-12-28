import { S3Client } from "@aws-sdk/client-s3"
import { getTypedEnv } from "./env.js"

export const s3Client = new S3Client({
    region: getTypedEnv().AWS_REGION,
    credentials: {
        accessKeyId: getTypedEnv().AWS_ACCESS_KEY,
        secretAccessKey: getTypedEnv().AWS_SECRET_KEY
    }
})