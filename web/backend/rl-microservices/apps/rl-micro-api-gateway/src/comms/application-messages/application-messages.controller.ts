import {Controller, Get} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {CurrentUser} from '@rl-auth/auth/supabase/decorators/current-user.decorator';
import {AuthUser} from '@supabase/supabase-js';

@ApiTags('Comms')
@Controller('application-messages')
export class ApplicationMessagesController {
  @Get('public')
  getPublicMessages(@CurrentUser() currentUser: AuthUser) {}
}
