import {Logger, Module} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';

import {MailModuleInjectionTokens} from './constants/injection-tokens';
import {MailService} from './services/mail/mail.service';
import {transporterConfig} from './transporter/transporter.config';
import {EnvironmentVariables} from '../../config/environment';

@Module({
  providers: [
    {
      provide: Logger,
      useFactory: () => new Logger(MailModule.name),
    },
    {
      provide: MailModuleInjectionTokens.NODEMAILER_TRANSPORTER,
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvironmentVariables>) =>
        transporterConfig(
          configService.getOrThrow<string>('EMAIL_USER'),
          configService.getOrThrow<string>('EMAIL_PASSWORD'),
        ),
    },
    MailService,
  ],
})
export class MailModule {}
