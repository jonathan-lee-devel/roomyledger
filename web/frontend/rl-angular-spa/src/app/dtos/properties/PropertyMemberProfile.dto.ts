import {Dto} from '../Dto';

export interface PropertyMemberProfileDto extends Dto {
  userId: string;
  displayName: string;
  firstName: string;
  lastName: string;
  iban?: string;
  revTag?: string;
}
