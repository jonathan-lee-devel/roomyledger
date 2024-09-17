import {Inject, Injectable, Logger} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {Transporter} from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import {EnvironmentVariables} from '../../../../config/environment';
import {MailModuleInjectionTokens} from '../../constants/injection-tokens';

/**
 * Class representing a MailService.
 * @class
 * @public
 * @Injectable()
 */
@Injectable()
export class MailService {
  private static readonly NODE_ENV_STAGING = 'staging';
  private static readonly NODE_ENV_PRODUCTION = 'production';

  constructor(
    private readonly logger: Logger,
    private readonly configService: ConfigService,
    @Inject(MailModuleInjectionTokens.NODEMAILER_TRANSPORTER)
    private readonly transporter: Transporter<SMTPTransport.SentMessageInfo>,
  ) {}

  async sendEmail(addressTo: string, subject: string, html: string) {
    const fromName = this.getFromName();
    this.logger.log(
      `Sending e-mail from: ${fromName} to: <${addressTo}> with subject: ${subject}`,
    );
    const result = await this.transporter.sendMail({
      from: `${fromName} <${this.configService.getOrThrow<string>(EnvironmentVariables.EMAIL_USER)}>`,
      to: addressTo,
      subject,
      html,
    });
    if (result.accepted.includes(addressTo)) {
      this.logger.log(`Successfully sent e-mail to: <${addressTo}>`);
    } else {
      this.logger.error(
        `Error while sending e-mail to: <${addressTo}>: ${result.response}`,
      );
    }
  }

  private getFromName() {
    let fromName: string;
    const nodeEnv = this.configService.getOrThrow<string>(
      EnvironmentVariables.NODE_ENV,
    );
    if (nodeEnv === MailService.NODE_ENV_STAGING) {
      fromName = 'Staging.RoomyLedger';
    } else if (nodeEnv === MailService.NODE_ENV_PRODUCTION) {
      fromName = 'RoomyLedger';
    } else {
      fromName = 'Dev.RoomyLedger';
    }
    return fromName;
  }
}
