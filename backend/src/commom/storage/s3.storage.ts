import { Injectable } from "@nestjs/common";
import { FileUpload, StorageInterface } from "./storage.interface";
import * as aws from "aws-sdk";
import * as sharp from "sharp";

@Injectable()
export class S3Storage implements StorageInterface {

    constructor(private readonly s3: aws.S3) { }

    async upload(fileUpload: FileUpload): Promise<any> {
        fileUpload.mimetype = fileUpload.fileContent.split(";")[0].split(":")[1];
        let buffer = Buffer.from(fileUpload.fileContent.replace(/^data:image\/\w+;base64,/, ""), 'base64');
        buffer = await sharp(buffer)
            .resize(300)
            .toBuffer();

        const params = {
            ACL: "public-read",
            Body: buffer,
            ContentEncoding: 'base64',
            Bucket: process.env.S3_BUCKET,
            ContentType: fileUpload.mimetype,
            Key: fileUpload.filename
        };
        await this.s3.putObject(params).promise();
        return `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${fileUpload.filename}`;
    }

    remove(linkImageS3: String) {
        const filename = linkImageS3.replace(
            `https://${process.env.S3_BUCKET}.s3.amazonaws.com/`, ""
        );
        return this.s3.deleteObject({
            Bucket: process.env.S3_BUCKET,
            Key: filename
        }).promise();
    }

}