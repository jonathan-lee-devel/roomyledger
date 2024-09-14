import {PartialType} from '@nestjs/mapped-types';

import {InviteTenantToPropertyDto} from './invite-tenant-to-property.dto';

export class UpdatePropertyInvitationDto extends PartialType(
  InviteTenantToPropertyDto,
) {}
