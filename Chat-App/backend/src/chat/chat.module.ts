import { Module } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Chat } from "src/db/entities/chat.entity";
import { ChatController } from "./chat.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Chat])],
    providers: [ChatService],
    controllers: [ChatController],
    exports: [ChatService]
})
export class ChatModule {

}