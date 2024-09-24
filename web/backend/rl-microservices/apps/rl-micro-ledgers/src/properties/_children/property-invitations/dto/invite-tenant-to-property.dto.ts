import {ApiProperty} from '@nestjs/swagger';
import {IsDefined, IsNotEmpty, IsString} from 'class-validator';

export class InviteTenantToPropertyDto {
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  @ApiProperty({required: true})
  email: string;
}
