import {Logger, Module} from '@nestjs/common';
import {EmailService} from '@rl-email/email/services/email.service';

@Module({
  providers: [
    {
      provide: Logger,
      useFactory: () => new Logger(EmailModule.name),
    },
    EmailService,
  ],
})
export class EmailModule {}
