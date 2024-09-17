import {ApiProperty} from '@nestjs/swagger';
import {IsDefined, IsEmail, IsNotEmpty, IsString} from 'class-validator';

export class LoginDto {
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
  password: string;
}
