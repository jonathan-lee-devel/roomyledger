import {Dto} from '../Dto';

export interface UserDto extends Dto {
  email: string;
  userProfileId: string;
}
