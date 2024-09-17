import {ApiProperty} from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

import {Currency} from '../types/Currency.type';

export class CreateExpenseDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty({required: true})
  propertyId: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty({required: true})
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty({required: true})
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty({required: true})
  amount: number;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty({required: true})
  currencyCode: Currency;
}
