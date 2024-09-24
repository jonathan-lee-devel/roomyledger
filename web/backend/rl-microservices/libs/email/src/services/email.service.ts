import {Injectable, Logger} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {EnvironmentVariables} from '@rl-config/config/environment.index';

@Injectable()
export class EmailService {
  private static readonly NODE_ENV_STAGING = 'staging';
  private static readonly NODE_ENV_PRODUCTION = 'production';

  constructor(
    private readonly logger: Logger,
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}

  async sendEmail(addressTo: string, subject: string, html: string) {
    const fromName = this.getFromName();
    this.logger.log(
      `Sending e-mail from: ${fromName} to: <${addressTo}> with subject: ${subject}`,
    );
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.configService.getOrThrow<string>('RESEND_API_KEY')}`,
      },
      body: JSON.stringify({
        from: `${this.getFromName()} <${this.configService.getOrThrow<string>('EMAIL_USER')}>`,
        to: [addressTo],
        subject,
        html,
      }),
    });
    if (!response.ok) {
      this.logger.error(
        `Error while sending e-mail to: ${addressTo}: `,
        response.status,
      );
      return;
    }
    this.logger.log(
      `Successfully sent e-mail to: <${addressTo}> with ID: ${(await response.json())?.['id']}`,
    );
  }

  private getFromName() {
    let fromName: string;
    const nodeEnv = this.configService.getOrThrow<string>('NODE_ENV');
    if (nodeEnv === EmailService.NODE_ENV_STAGING) {
      fromName = 'RoomyLedger Staging';
    } else if (nodeEnv === EmailService.NODE_ENV_PRODUCTION) {
      fromName = 'RoomyLedger';
    } else {
      fromName = 'RoomyLedger Dev';
    }
    return fromName;
  }
}
