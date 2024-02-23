import { Body, Controller, Get, Post, Req, Session, UploadedFile, UseFilters, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { User } from "src/db/entities/user.entity";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }




    @Post('register')
    @UseInterceptors(FileInterceptor('userProfile', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                cb(null, `${file.originalname}`)
            }
        })
    }))
    uploadFile(@UploadedFile() file: Express.Multer.File,
        @Body() createUserDto: CreateUserDto) {
        createUserDto.userProfile = file?.filename ?? "userprofile.png";
        return this.authService.register(createUserDto)
    }

    @Post('login')
    @UseGuards(AuthGuard('local'))
    login(@Req() req: any) {

        const payload = {
            id: req.user.id,
            username: req.user.userName,
        }
        return this.authService.login(payload)
        // return this.authService.login(req.user) //authguard automatically append user in reqest object
    }



}
