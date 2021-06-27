import { Module } from '@nestjs/common';
import { HandlerException } from './exceptions/handler.exceptiont';
import { S3Storage } from './storage/s3.storage';
import * as aws from "aws-sdk";
import { EncryptUtil } from './utils/encrypt.util';
import { AuthorizationGuard } from './security/authorization.security';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
        }
      },
    }),
  ],
  controllers: [],
  providers: [
    HandlerException,
    EncryptUtil,
    AuthorizationGuard,
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
    EncryptUtil,
    AuthorizationGuard,
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
