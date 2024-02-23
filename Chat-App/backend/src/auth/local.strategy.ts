import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local';
import { User } from "src/db/entities/user.entity";
import { UserService } from "src/user/user.service";

import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({ usernameField: 'userName' })
    }

    async validate(userName: string, password: string): Promise<User> {

        const user = await this.userService.findOne(userName);

        if (user && (await bcrypt.compare(password, user.password))) {
            return user
        }
        else {
            throw new UnauthorizedException("Please check your login criteria");
        }
    }
}



// const passwordMatch = await bcrypt.compare(password, user.password);
// console.log(passwordMatch);

