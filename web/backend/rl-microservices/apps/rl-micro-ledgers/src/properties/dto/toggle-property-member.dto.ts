import {ApiProperty} from '@nestjs/swagger';
import {IsDefined, IsEmail, IsNotEmpty, IsString} from 'class-validator';

export class TogglePropertyMemberDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @IsEmail()
  @ApiProperty({required: true})
  email: string;
}
