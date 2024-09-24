import {Controller, Get} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('profile')
export class ProfileController {
  @Get()
  getUserProfile() {
    return [];
  }
}
