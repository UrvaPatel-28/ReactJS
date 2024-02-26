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
        this.users[data.userId] = client.id;
        console.log(`${data.user} has joined`);
        client.broadcast.emit('userJoined', { user: 'Admin', id: client.id, message: `${this.users[client.id]} has joined` });
        client.emit('welcome', { user: 'Admin', message: `Welcome to the chat ${this.users[client.id]}` });
    }

    @SubscribeMessage('message')
    handleMessage(client: Socket, data: any) {
        const { receiverId, senderId } = data;
        const wsRecvId = this.users[receiverId];

        // this.server.to(data.receiverId).to(data.senderId).emit('sendMessage', data);
        if (wsRecvId != null) {
            client.to(wsRecvId).emit('sendMessage', data);
        }
        // this.server.emit('sendMessage', data);
        this.ChatService.create(data);

    }

    @SubscribeMessage('getMessages')
    async getMessages(client: Socket, data) {
        const { senderId, receiverId } = data;

        const chats = await this.ChatService.getChats(senderId, receiverId);
        client.emit('allMessages', chats);
    }
}
