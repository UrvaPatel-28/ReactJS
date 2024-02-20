import { Body, Controller, Get, Post, Req, Session, UseFilters, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { User } from "src/db/entities/user.entity";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('register')
    rigister(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.authService.register(createUserDto)
    }

    @Post('login')
    @UseGuards(AuthGuard('local'))
    login(@Req() req: any) {
        console.log(req.user);

        const payload = {
            id: req.user.id,
            username: req.user.userName,
        }
        return this.authService.login(payload)
        // return this.authService.login(req.user) //authguard automatically append user in reqest object
    }



}
