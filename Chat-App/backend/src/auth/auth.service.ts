import { Injectable, Post } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { User } from "src/db/entities/user.entity";
import { UserService } from "src/user/user.service";



@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService,
        private readonly jwtService: JwtService) {

    }

    login(payload: object) {
        const token: string = this.jwtService.sign(payload, { expiresIn: 15 * 60 });
        return { token }
    }

    register(createUserDto: CreateUserDto): Promise<User> {
        console.log("urva", createUserDto);
        return this.userService.create(createUserDto);
    }
}