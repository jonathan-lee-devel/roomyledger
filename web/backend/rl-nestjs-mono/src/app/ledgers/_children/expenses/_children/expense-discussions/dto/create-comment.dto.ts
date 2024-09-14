import {ApiProperty} from '@nestjs/swagger';
import {IsDefined, IsNotEmpty, IsString, MaxLength} from 'class-validator';

export class CreateCommentDto {
  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty({required: true})
  text: string;
}
