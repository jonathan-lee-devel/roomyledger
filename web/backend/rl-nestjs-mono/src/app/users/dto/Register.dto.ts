import {ApiProperty} from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

import {Match} from '../../../validation/match.validator';
import {PasswordConstants} from '../constants/password.constants';

export class RegisterDto {
  @IsNotEmpty()
  @IsDefined()
  @IsEmail()
  @IsString()
  @ApiProperty({required: true})
  email: string;

  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @ApiProperty({required: true})
  displayName: string;

  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @MinLength(PasswordConstants.MIN_PASSWORD_LENGTH)
  @ApiProperty({required: true})
  password: string;

  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @MinLength(PasswordConstants.MIN_PASSWORD_LENGTH)
  @Match(RegisterDto, (dto) => dto.password, {
    message: 'Passwords must match',
  })
  @ApiProperty({required: true})
  confirmPassword: string;
}
