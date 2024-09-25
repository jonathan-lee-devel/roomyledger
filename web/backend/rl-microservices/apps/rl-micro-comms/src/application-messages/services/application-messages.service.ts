import {Injectable} from '@nestjs/common';
import {ApplicationMessageSeverity} from '@prisma/client';
import {commsProto} from '@rl-gw';
import {PrismaService} from '@rl-prisma/prisma';

import {CreateApplicationMessageDto} from '../dto/create-application-message.dto';
import {UpdateApplicationMessageDto} from '../dto/update-application-message.dto';

@Injectable()
export class ApplicationMessagesService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllPublicShownMessages() {
    return {
      messages: (
        await this.prismaService.applicationMessage.findMany({
          where: {
            isPublic: true,
            isShow: true,
          },
          include: {
            createdBy: true,
          },
        })
      ).map((queryApplicationMessage) =>
        this.mapQueryApplicationMessage(queryApplicationMessage),
      ),
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(createApplicationMessageDto: CreateApplicationMessageDto) {
    return 'This action adds a new applicationMessage';
  }

  findOne(id: number) {
    return `This action returns a #${id} applicationMessage`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateApplicationMessageDto: UpdateApplicationMessageDto) {
    return `This action updates a #${id} applicationMessage`;
  }

  remove(id: number) {
    return `This action removes a #${id} applicationMessage`;
  }

  private mapQueryApplicationMessage(queryApplicationMessage: {
    id: string;
    title: string;
    message: string;
    isShow: boolean;
    isPublic: boolean;
    severity: ApplicationMessageSeverity;
    routerLink?: string;
    routerLinkText?: string;
    createdBy: {
      id: string;
      email: string;
      isEmailVerified: boolean;
      createdAt: Date;
      updatedAt: Date;
    };
    updatedAt: Date;
    createdAt: Date;
  }) {
    return <commsProto.ApplicationMessageDto>{
      id: queryApplicationMessage.id,
      title: queryApplicationMessage.title,
      message: queryApplicationMessage.message,
      isShow: queryApplicationMessage.isShow,
      isPublic: queryApplicationMessage.isPublic,
      createdByEmail: queryApplicationMessage.createdBy.email,
      createdByUserId: queryApplicationMessage.createdBy.id,
      severity: queryApplicationMessage.severity,
      routerLink: queryApplicationMessage.routerLink,
      routerLinkText: queryApplicationMessage.routerLinkText,
      updatedAt: queryApplicationMessage.updatedAt.toISOString(),
      createdAt: queryApplicationMessage.createdAt.toISOString(),
    };
  }
}
