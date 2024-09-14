import * as crypto from 'crypto';

import {Injectable, Logger} from '@nestjs/common';
import {v4 as uuidv4} from 'uuid';

@Injectable()
export class RandomService {
  public static readonly defaultIdLength = 36;
  public static readonly defaultTokenLength = 128;

  constructor(private readonly logger: Logger) {}

  async generateRandomToken(tokenLength?: number) {
    return new Promise<string>((resolve, reject) => {
      const adjustedIdLength = tokenLength ?? RandomService.defaultIdLength;
      crypto.randomBytes(adjustedIdLength / 2, (err, buffer) => {
        if (err) {
          this.logger.error(`Error occurred during generateRandomId: ${err}`);
          return reject(err);
        }
        return resolve(buffer.toString('hex'));
      });
    });
  }

  async generateUUID() {
    return uuidv4();
  }
}
