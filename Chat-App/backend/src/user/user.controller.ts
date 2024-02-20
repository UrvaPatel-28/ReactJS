import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from "src/db/entities/user.entity";
import { Express } from 'express'
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, memoryStorage } from 'multer';



@Controller('user')

export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }


  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        cb(null, `${file.originalname}`)
      }
    })
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log("hii", file);
  }



}






