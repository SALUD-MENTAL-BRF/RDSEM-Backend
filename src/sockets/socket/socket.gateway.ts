import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private activeUsers = new Map<string, string>(); // Map de userId a clientId

  handleConnection(client: Socket) {
    const rawUserId = client.handshake.query.userId as string;
    const userType = client.handshake.query.userType as string; // Tipo de usuario: "patient" o "professional"
    const userId = `${userType}_${rawUserId}`; // Ejemplo: "patient_1" o "professional_6"

    if (userId) {
      this.activeUsers.set(userId, client.id);
      client.join(userId); // Crear una "sala" privada para el usuario
      console.log(`Client connected: ${client.id}, userId: ${userId}`);
    }
  }

  handleDisconnect(client: Socket) {
    const userId = [...this.activeUsers.entries()].find(([_, id]) => id === client.id)?.[0];
    if (userId) {
      this.activeUsers.delete(userId);
      console.log(`Client disconnected: ${client.id}, userId: ${userId}`);
    }
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: { message: string, to: string, toType: string }): void {
    const fromUserId = [...this.activeUsers.entries()]
      .find(([_, id]) => id === client.id)?.[0];

    if (!fromUserId) {
      console.log(`Sender not found for client: ${client.id}`);
      return;
    }

    const targetUserId = `${payload.toType}_${payload.to}`;
    const message = {
      body: payload.message,
      from: fromUserId,
      to: targetUserId,
    };

    if (this.activeUsers.has(targetUserId)) {
      this.server.to(targetUserId).emit('message', message);
    } else {
      console.log(`User ${targetUserId} is not connected`);
    }
  }

  @SubscribeMessage('join_room')
  joinRoom(client: Socket, room: string): void {
    client.join(room);
    client.emit('joined', room);
    console.log(`Client ${client.id} joined room ${room}`);
  }

  @SubscribeMessage('send_message')
  sendMessage(client: Socket, data: { message: string, room: string, author: string, time: string }): void {
    console.log("Mensaje recibido");
    console.log(data);

    // Emitir el mensaje a todos los clientes en la sala especificada 
    this.server.to(data.room).emit('receive_message', data);
  }

}
