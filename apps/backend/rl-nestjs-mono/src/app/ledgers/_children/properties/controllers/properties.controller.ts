import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {AuthUser} from '@supabase/supabase-js';

import {IdParamDto} from '../../../../../validation/id.param.dto';
import {CurrentUser} from '../../../../auth/supabase/decorators/current-user.decorator';
import {CreatePropertyDto} from '../dto/create-property.dto';
import {TogglePropertyMemberDto} from '../dto/toggle-property-member.dto';
import {PropertiesService} from '../services/properties.service';

@ApiTags('Properties')
@Controller()
export class PropertiesController {
  constructor(
    private readonly logger: Logger,
    private readonly propertiesService: PropertiesService,
  ) {}

  @Post()
  create(
    @CurrentUser()
    currentUser: AuthUser,
    @Body() createPropertyDto: CreatePropertyDto,
  ) {
    this.logger.log(
      `Request from: ${currentUser.email} to create property with name: ${createPropertyDto.name}`,
    );
    return this.propertiesService.create(currentUser.email, createPropertyDto);
  }

  @Get('where-involved')
  findAll(
    @CurrentUser()
    currentUser: AuthUser,
  ) {
    this.logger.log(
      `Request from: ${currentUser.email} to get all properties where involved`,
    );
    return this.propertiesService.findAllWhereInvolved(currentUser.email);
  }

  @Get(':id')
  findOne(
    @CurrentUser()
    currentUser: AuthUser,
    @Param() {id}: IdParamDto,
  ) {
    this.logger.log(
      `Request from: ${currentUser.email} to get property with ID ${id}`,
    );
    return this.propertiesService.findOne(currentUser.email, id);
  }

  @Delete(':id')
  remove(
    @CurrentUser()
    currentUser: AuthUser,
    @Param() {id}: IdParamDto,
  ) {
    this.logger.log(
      `Request from: ${currentUser.email} to delete property with ID ${id}`,
    );
    return this.propertiesService.remove(currentUser.email, id);
  }

  @Patch(':id/toggle-property-admin')
  togglePropertyAdmin(
    @CurrentUser()
    currentUser: AuthUser,
    @Param() {id}: IdParamDto,
    @Body() {email}: TogglePropertyMemberDto,
  ) {
    this.logger.log(
      `Request from ${currentUser.email} to toggle admin ${email} on property with ID ${id}`,
    );
    return this.propertiesService.togglePropertyAdmin(
      currentUser.email,
      id,
      email,
    );
  }

  @Patch(':id/toggle-property-tenant')
  togglePropertyTenant(
    @CurrentUser()
    currentUser: AuthUser,
    @Param() {id}: IdParamDto,
    @Body() {email}: TogglePropertyMemberDto,
  ) {
    this.logger.log(
      `Request from ${currentUser.email} to toggle tenant ${email} on property with ID ${id}`,
    );
    return this.propertiesService.togglePropertyTenant(
      currentUser.email,
      id,
      email,
    );
  }
}