import { Controller, Get, Inject, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { Express } from 'express'

@Controller('chat')

export class ChatController {
    constructor(@Inject(ChatService) private readonly chatService: ChatService) { }

    // @Post()
    // create(@Body() createUserDto): Promise<User> {
    //     return this.userService.create(createUserDto);
    // }

    @Get()
    getChats() {
        return this.chatService.getChats();
    }



}
