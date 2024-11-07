import {Body, Controller, Param, Patch, Post} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {AuthUser} from '@supabase/supabase-js';

import {CurrentUser} from '../../../../../../../lib/auth/supabase/decorators/current-user.decorator';
import {IdParamDto} from '../../../../../../../lib/validation/id.param.dto';
import {InviteTenantToPropertyDto} from '../dto/invite-tenant-to-property.dto';
import {PropertyInvitationsService} from '../services/property-invitations.service';

@ApiTags('Properties')
@Controller()
export class PropertyInvitationsController {
  constructor(
    private readonly propertyInvitationsService: PropertyInvitationsService,
  ) {}

  @Post('to-property/:id')
  create(
    @CurrentUser()
    currentUser: AuthUser,
    @Param() {id}: IdParamDto,
    @Body() {email}: InviteTenantToPropertyDto,
  ) {
    return this.propertyInvitationsService.inviteTenantToProperty(
      currentUser.email?.toLowerCase(),
      currentUser.user_metadata['name'],
      id,
      email?.toLowerCase(),
    );
  }

  @Patch('to-property/:id/accept')
  acceptInvitation(
    @CurrentUser() currentUser: AuthUser,
    @Param() {id}: IdParamDto,
    @Body() {tokenValue}: {tokenValue: string},
  ) {
    return this.propertyInvitationsService.acceptInvitationToProperty(
      currentUser.email?.toLowerCase(),
      id,
      tokenValue,
    );
  }
}
