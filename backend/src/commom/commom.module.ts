import { Module } from '@nestjs/common';
import { HandlerException } from './exceptions/handler.exceptiont';
import { S3Storage } from './storage/s3.storage';
import * as aws from "aws-sdk";

@Module({
  controllers: [],
  providers: [
    HandlerException,
    {
      provide: "Storage",
      useFactory: () => {
        return new S3Storage(new aws.S3({
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          }
        }));
      }
    }
  ],
  exports: [
    {
      provide: "Storage",
      useFactory: () => {
        return new S3Storage(new aws.S3({
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          },
        }));
      }
    }
  ]
})
export class CommomModule {}
