import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { RlMicroApiGatewayService } from './rl-micro-api-gateway.service';
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
    private readonly rlMicroApiGatewayService: RlMicroApiGatewayService,
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

  @Get()
  getHello(): string {
    return this.rlMicroApiGatewayService.getHello();
  }

  @Get('payment-status')
  getPaymentStatus() {
    return this.paymentsServiceClient.getPaymentStatusForUserId({
      id: '12345',
    });
  }

  @Get('public-messages')
  getPublicMessages() {
    return this.commsServiceClient.getPublicApplicationMessages({
      email: 'test@test.com',
    });
  }
}
