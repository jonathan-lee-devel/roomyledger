import {Injectable} from '@nestjs/common';

import {PrismaService} from '../../../lib/prisma/services/prisma.service';
import {CreateApplicationMessageDto} from '../dto/create-application-message.dto';
import {UpdateApplicationMessageDto} from '../dto/update-application-message.dto';

@Injectable()
export class ApplicationMessagesService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllPublicShownMessages() {
    return this.prismaService.applicationMessage.findMany({
      where: {
        isPublic: true,
        isShow: true,
      },
    });
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
}
