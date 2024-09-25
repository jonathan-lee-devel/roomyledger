import {Controller, Logger} from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import {RabbitmqService} from '@rl-config/config/micro/rabbitmq/rabbitmq.service';

import {NotificationsService} from '../services/notifications.service';

@Controller()
export class NotificationsController {
  constructor(
    private readonly logger: Logger,
    private readonly notificationsService: NotificationsService,
    private readonly rabbitMqService: RabbitmqService,
  ) {}

  @MessagePattern({cmd: 'get-notification-by-id'})
  async getNotificationById(
    @Payload() payload: any,
    @Ctx() context: RmqContext,
  ) {
    this.logger.log(`Payload received, ACK-ing`, payload);
    // this.rabbitMqService.ack(context);
    // return this.notificationsService.findOne(data.user.email, data.id);
  }

  @EventPattern('notification')
  handleNotification(@Payload() data: any) {
    this.logger.log(`Received notification event: `, data);
  }
}
