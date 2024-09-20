import {PartialType} from '@nestjs/mapped-types';

import {CreateApplicationMessageDto} from './create-application-message.dto';

export class UpdateApplicationMessageDto extends PartialType(
  CreateApplicationMessageDto,
) {}
