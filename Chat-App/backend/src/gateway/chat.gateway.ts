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

        this.users[data.userId] = client.id;
        console.log(this.users)
        console.log(`${data.user} has joined`);
        console.log(this.users);
        client.broadcast.emit('userJoined', { user: 'Admin', id: client.id, message: `${this.users[client.id]} has joined` });
        client.emit('welcome', { user: 'Admin', message: `Welcome to the chat ${this.users[client.id]}` });
    }

    @SubscribeMessage('message')
    handleMessage(client: Socket, data: any) {
        console.log('data', data);
        console.log('data', data.receiverId);

        const { receiverId, senderId } = data;
        console.log("jjbh", data);


        const wsRecvId = this.users[receiverId];
        // const senderRoom = this.users[senderId]

        // console.log(receiverId, receiverRoom);
        // console.log(senderId, senderRoom);


        // if (receiverRoom ) {
        //     // Emit the message directly to the receiver's room using their WebSocket room ID
        //     client.to(receiverRoom).emit('sendMessage', data);
        // }
        // this.ChatService.create(data);

        // this.server.to(data.receiverId).to(data.senderId).emit('sendMessage', data);
        if (wsRecvId != null) {
            client.to(wsRecvId).emit('sendMessage', data);
        }
        // this.server.emit('sendMessage', data);
        this.ChatService.create(data);

    }

    @SubscribeMessage('getMessages')
    async getMessages(client: Socket, data) {
        console.log("ddd", data);

        const { senderId, receiverId } = data;
        // console.log("urva", receiverId  );

        const chats = await this.ChatService.getChats(senderId, receiverId);


        client.emit('allMessages', chats);
    }
}
