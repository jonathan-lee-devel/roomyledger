import {Injectable, Logger} from '@nestjs/common';

import {PrismaService} from '../../../../prisma/services/prisma.service';

@Injectable()
export class RegistrationService {
  constructor(
    private readonly logger: Logger,
    private readonly prismaService: PrismaService,
  ) {}

  async createPreVerifiedUser(email: string, displayName: string) {
    this.logger.log(`Creating pre-verified user with e-mail: ${email}`);
    await this.prismaService.user.create({
      data: {
        email,
        isEmailVerified: true,
        profile: {
          create: {
            displayName,
          },
        },
      },
    });
  }

  async verifyUser(userId: string, displayName: string) {
    this.logger.log(`Verified user with ID: ${userId}`);
    await this.prismaService.user.update({
      where: {id: userId},
      data: {
        isEmailVerified: true,
        profile: {
          update: {
            displayName,
          },
        },
      },
    });
  }
}
