import {Controller, Get} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';

@ApiTags('Ledgers')
@Controller('properties')
export class PropertiesController {
  @Get('where-involved')
  getPropertiesWhereInvolved() {
    return [];
  }
}
