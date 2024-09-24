import { Controller, Get, Inject, Logger, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  PAYMENTS_PACKAGE_NAME,
  PAYMENTS_SERVICE_NAME,
  PaymentsServiceClient,
} from './proto/payments';
import {
  COMMS_PACKAGE_NAME,
  COMMS_SERVICE_NAME,
  CommsServiceClient,
} from './proto/comms';

@Controller()
export class RlMicroApiGatewayController implements OnModuleInit {
  private paymentsServiceClient: PaymentsServiceClient;
  private commsServiceClient: CommsServiceClient;

  constructor(
    private readonly logger: Logger,
    @Inject(PAYMENTS_PACKAGE_NAME)
    private readonly paymentsClientGrpc: ClientGrpc,
    @Inject(COMMS_PACKAGE_NAME)
    private readonly commsClientGrpc: ClientGrpc,
  ) {}

  async onModuleInit() {
    this.paymentsServiceClient =
      this.paymentsClientGrpc.getService<PaymentsServiceClient>(
        PAYMENTS_SERVICE_NAME,
      );
    this.commsServiceClient =
      this.commsClientGrpc.getService<CommsServiceClient>(COMMS_SERVICE_NAME);
  }

  @Get('payment-status')
  getPaymentStatus() {
    this.logger.log(`Request to get payment status for user with ID: 12345`);
    return this.paymentsServiceClient.getPaymentStatusForUserId({
      id: '12345',
    });
  }

  @Get('public-messages')
  getPublicMessages() {
    this.logger.log(
      `Request to get public-messages for user with e-mail test@test.com`,
    );
    return this.commsServiceClient.getPublicApplicationMessages({
      email: 'test@test.com',
    });
  }
}
