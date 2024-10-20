import {Body, Controller, Post} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {AuthUser} from '@supabase/supabase-js';

import {CurrentUser} from '../../../../lib/auth/supabase/decorators/current-user.decorator';
import {CheckInDto} from '../../dto/CheckIn.dto';
import {UsersService} from '../../services/users.service';

@ApiTags('Users')
@Controller('authenticated')
export class AuthenticatedUsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('check-in')
  async checkIn(
    @CurrentUser()
    currentUser: AuthUser,
    @Body() {displayName}: CheckInDto,
  ) {
    return this.usersService.checkIn(
      currentUser.email?.toLowerCase(),
      displayName ?? currentUser.user_metadata['name'],
    );
  }
}
