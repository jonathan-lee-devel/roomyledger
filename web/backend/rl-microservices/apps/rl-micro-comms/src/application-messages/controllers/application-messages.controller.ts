import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {Public} from '@rl-auth/auth/supabase/decorators/is-public.decorator';

import {CreateApplicationMessageDto} from '../dto/create-application-message.dto';
import {UpdateApplicationMessageDto} from '../dto/update-application-message.dto';
import {ApplicationMessagesService} from '../services/application-messages.service';

@ApiTags('ApplicationMessages')
@Controller('application-messages')
export class ApplicationMessagesController {
  constructor(
    private readonly applicationMessagesService: ApplicationMessagesService,
  ) {}

  @Public()
  @Get('public')
  async findAll() {
    return this.applicationMessagesService.findAllPublicShownMessages();
  }

  @Post('admin')
  create(@Body() createApplicationMessageDto: CreateApplicationMessageDto) {
    return this.applicationMessagesService.create(createApplicationMessageDto);
  }

  @Get('admin/:id')
  findOne(@Param('id') id: string) {
    return this.applicationMessagesService.findOne(+id);
  }

  @Patch('admin/:id')
  update(
    @Param('id') id: string,
    @Body() updateApplicationMessageDto: UpdateApplicationMessageDto,
  ) {
    return this.applicationMessagesService.update(
      +id,
      updateApplicationMessageDto,
    );
  }

  @Delete('admin/:id')
  remove(@Param('id') id: string) {
    return this.applicationMessagesService.remove(+id);
  }
}
