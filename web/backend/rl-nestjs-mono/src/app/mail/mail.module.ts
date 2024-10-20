import {Logger, Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';

import {MailService} from './services/mail/mail.service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: Logger,
      useFactory: () => new Logger(MailModule.name),
    },
    MailService,
  ],
  exports: [MailService],
})
export class MailModule {}
