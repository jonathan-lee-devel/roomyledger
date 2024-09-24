import { Controller, Inject, Logger, OnModuleInit } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { commsProto } from '@rl-gw';
import {
  PAYMENTS_PACKAGE_NAME,
  PAYMENTS_SERVICE_NAME,
  PaymentsServiceClient,
} from '../../../rl-micro-api-gateway/src/proto/payments';
import { ClientGrpc } from '@nestjs/microservices';

@Controller()
@commsProto.CommsServiceControllerMethods()
export class CommsController
  implements commsProto.CommsServiceController, OnModuleInit
{
  private paymentsServiceClient: PaymentsServiceClient;

  constructor(
    private readonly logger: Logger,
    @Inject(PAYMENTS_PACKAGE_NAME)
    private readonly paymentsClientGrpc: ClientGrpc,
  ) {}

  async onModuleInit() {
    this.paymentsServiceClient =
      this.paymentsClientGrpc.getService<PaymentsServiceClient>(
        PAYMENTS_SERVICE_NAME,
      );
  }

  getPublicApplicationMessages(
    request: commsProto.GetPublicApplicationMessagesDto,
  ):
    | Promise<commsProto.ApplicationMessageDtos>
    | Observable<commsProto.ApplicationMessageDtos>
    | commsProto.ApplicationMessageDtos {
    return this.paymentsServiceClient
      .getPaymentStatusForUserId({
        id: '12345',
      })
      .pipe(
        map((paymentStatusResponse) => {
          return {
            messages: [
              {
                id: '12345',
                message: `payment status: ${paymentStatusResponse.status}`,
                title: 'Introduction',
                isPublic: true,
                isShow: true,
                createdByEmail: request.email,
                createdByUserId: '12345',
                routerLink: '/login',
                routerLinkText: 'Login',
                severity: 'info',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
            ],
          };
        }),
      );
  }
}
