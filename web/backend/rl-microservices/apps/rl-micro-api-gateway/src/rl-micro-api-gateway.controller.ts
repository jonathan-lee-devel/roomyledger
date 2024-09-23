import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { RlMicroApiGatewayService } from './rl-micro-api-gateway.service';
import { ClientGrpc } from '@nestjs/microservices';
import {
  PAYMENTS_PACKAGE_NAME,
  PAYMENTS_SERVICE_NAME,
  PaymentsServiceClient,
} from '../../../proto/payments';

@Controller()
export class RlMicroApiGatewayController implements OnModuleInit {
  private paymentsServiceClient: PaymentsServiceClient;

  constructor(
    private readonly rlMicroApiGatewayService: RlMicroApiGatewayService,
    @Inject(PAYMENTS_PACKAGE_NAME) private readonly clientGrpc: ClientGrpc,
  ) {}

  async onModuleInit() {
    this.paymentsServiceClient =
      this.clientGrpc.getService<PaymentsServiceClient>(PAYMENTS_SERVICE_NAME);
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
}
