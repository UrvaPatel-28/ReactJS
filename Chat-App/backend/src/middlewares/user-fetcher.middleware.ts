import { ForbiddenException, Inject, Injectable, type NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { log } from "console";
import type { NextFunction, Request, Response } from "express";
import { JwtStrategy } from "src/auth/jwt.strategy";

@Injectable()
export class UserFetcherMiddleware implements NestMiddleware {

    constructor(@Inject(JwtService) private readonly jwtService: JwtService) { }

    async use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization
        if (!authHeader) {
            return next()
        }
        const [tokenType, token] = authHeader.split(' ')
        if (tokenType !== 'Bearer' || !token) {
            throw new ForbiddenException()
        }

        try {
            const decoded = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET_KEY
            })
            console.log(decoded);

            req.user = decoded;
        } catch (error) {

        }


        return next()
    }
}