// src/socket.gateway.ts
import { Inject } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from 'src/chat/chat.service';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(@Inject(ChatService) private readonly ChatService: ChatService) { }
    @WebSocketServer()
    server: Server;

    private users = {};

    handleConnection(client: Socket) {
        console.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
        const userName = this.users[client.id];
        if (userName) {
            this.server.emit('leave', { user: 'Admin', message: `${userName} has left` });
            delete this.users[client.id];
        }
    }

    @SubscribeMessage('joined')
    handleJoin(client: Socket, data) {
        console.log("atitbjb", data);

        this.users[client.id] = data.user;
        console.log(`${data.user} has joined`);
        console.log(this.users);
        client.broadcast.emit('userJoined', { user: 'Admin', message: `${this.users[client.id]} has joined` });
        client.emit('welcome', { user: 'Admin', message: `Welcome to the chat ${this.users[client.id]}` });
    }

    @SubscribeMessage('message')
    handleMessage(client: Socket, data: any) {
        console.log('data', data);
        this.server.emit('sendMessage', data);
        this.ChatService.create(data);
    }

    @SubscribeMessage('getMessages')
    async getMessages(client: Socket, data: any) {
        console.log('data', data);
        const chats = await this.ChatService.getChats();
        // console.log(chats);

        this.server.emit('sendMessages', chats);
    }
}
