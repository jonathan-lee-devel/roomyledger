import {Controller, Get, Inject, Logger, OnModuleInit} from '@nestjs/common';
import {ClientGrpc} from '@nestjs/microservices';
import {ApiTags} from '@nestjs/swagger';
import {paymentsProto} from '@rl-gw';

import {PaymentsServiceClient} from '../../proto/payments';

@ApiTags('Payments')
@Controller('customers')
export class CustomersController implements OnModuleInit {
  private paymentsServiceClient: PaymentsServiceClient;

  constructor(
    private readonly logger: Logger,
    @Inject(paymentsProto.PAYMENTS_PACKAGE_NAME)
    private readonly paymentsClientGrpc: ClientGrpc,
  ) {}

  async onModuleInit() {
    this.paymentsServiceClient =
      this.paymentsClientGrpc.getService<PaymentsServiceClient>(
        paymentsProto.PAYMENTS_SERVICE_NAME,
      );
  }

  @Get('payment-status')
  getPaymentStatus() {
    this.logger.log(`Request to get payment status for user with ID: 12345`);
    return this.paymentsServiceClient.getPaymentStatusForUserId({
      id: '12345',
    });
  }
}
