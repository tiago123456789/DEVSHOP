import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { Session } from "./entities/session.entity"
import { UserResolver } from './user.resolve';
import { UserService } from './user.service';
import { CommomModule } from 'src/commom/commom.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Session, User]),
        JwtModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => {
            return {
              secret: configService.get('JWT_SECRET'),
            }
          },
        }),
      CommomModule
    ],
    providers: [UserService, UserResolver]
})
export class UserModule {}
