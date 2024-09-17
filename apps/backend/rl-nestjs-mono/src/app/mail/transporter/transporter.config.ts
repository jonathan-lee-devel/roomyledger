import * as nodemailer from 'nodemailer';
import {Transporter} from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export const transporterConfig = (
  emailUser: string,
  emailPassword: string,
): Transporter<SMTPTransport.SentMessageInfo> =>
  nodemailer.createTransport({
    // @ts-expect-error Host is the recommended field
    host: 'smtp.office365.com',
    secure: false,
    port: '587',
    tls: {
      ciphers: 'SSLv3',
      rejectUnauthorized: false,
    },
    requireTLS: true,
    auth: {
      user: emailUser,
      pass: emailPassword,
    },
  });
