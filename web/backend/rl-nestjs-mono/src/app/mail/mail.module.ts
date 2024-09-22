import {Logger, Module} from '@nestjs/common';

import {MailService} from './services/mail/mail.service';

@Module({
  providers: [
    {
      provide: Logger,
      useFactory: () => new Logger(MailModule.name),
    },
    MailService,
  ],
})
export class MailModule {}
