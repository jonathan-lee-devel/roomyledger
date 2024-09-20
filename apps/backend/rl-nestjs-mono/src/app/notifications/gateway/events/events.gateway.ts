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

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
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
