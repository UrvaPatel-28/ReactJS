import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

import * as dotenv from 'dotenv';
dotenv.config();


@Module({
    imports: [PassportModule, UserModule, JwtModule.register({ secret: process.env.JWT_SECRET_KEY, signOptions: { expiresIn: '1h' } })],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: []
})
export class AuthModule { }
