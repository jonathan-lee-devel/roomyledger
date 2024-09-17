import {Expose} from 'class-transformer';
import {IsEmail, IsNotEmpty, IsString} from 'class-validator';

export class RequestingUserEmailHeaderDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Expose({name: 'x-requesting-user-email'})
  requestingUserEmail: string;
}
