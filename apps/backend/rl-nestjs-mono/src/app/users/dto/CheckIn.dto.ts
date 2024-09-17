import {ApiProperty} from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CheckInDto {
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  @IsEmail()
  @ApiProperty({required: true})
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiProperty({required: false})
  displayName?: string;
}
