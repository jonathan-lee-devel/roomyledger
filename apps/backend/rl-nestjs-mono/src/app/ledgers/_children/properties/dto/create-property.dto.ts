import {ApiProperty} from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePropertyDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @ApiProperty({required: true})
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({required: true})
  addSelfAsTenant: boolean;
}
