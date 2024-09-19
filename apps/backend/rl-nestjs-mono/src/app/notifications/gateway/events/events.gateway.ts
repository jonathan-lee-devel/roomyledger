import {Logger} from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import {Server} from 'socket.io';
import {v4} from 'uuid';

import {NotificationDto} from '../../dto/Notification.dto';
import {ClientToServerNotificationEvents} from '../../types/ClientToServerNotificationEvents.type';
import {ServerToClientNotificationEvents} from '../../types/ServerToClientNotificationEvents.type';

@WebSocketGateway({namespace: 'notifications'})
export class EventsGateway {
  @WebSocketServer() private readonly server: Server<
    ClientToServerNotificationEvents,
    ServerToClientNotificationEvents
  >;

  constructor(private readonly logger: Logger) {}

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    this.logger.log(`Handling message from client: ${JSON.stringify(client)}`);
    return payload;
  }

  sendMessage() {
    const notification: NotificationDto = {
      id: v4(),
      type: 'PROPERTY_INVITATION',
      title: 'Hello world!',
      extendedMessage: 'Hello world!',
      targetUserEmail: 'test@example.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.server.emit('newNotification', notification);
  }
}
