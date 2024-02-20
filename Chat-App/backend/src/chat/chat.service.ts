import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Chat } from "src/db/entities/chat.entity";
import type { Repository } from "typeorm";

@Injectable()
export class ChatService {
    userRepository: any;

    //inject user repo
    constructor(@InjectRepository(Chat) private readonly chatRepository: Repository<Chat>) { }

    async create(chats) {
        try {
            // Create a new user object with the hashed password
            const chat = this.chatRepository.create(chats);

            return this.chatRepository.save(chat);
        } catch (error) {
            throw error
        }

    }

    async getChats() {
        try {
            return await this.chatRepository.find();
        } catch (error) {
            throw new BadRequestException()
        }
    }

}