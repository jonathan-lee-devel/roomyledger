import {IsDefined, IsNotEmpty, IsUUID} from 'class-validator';

export class IdParamDto {
  @IsDefined()
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
