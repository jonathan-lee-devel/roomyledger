import {PropertyMemberProfileDto} from './PropertyMemberProfile.dto';
import {Dto} from '../Dto';
import {UserDto} from '../users/User.dto';

export interface PropertyAdministratorDto extends Dto {
  propertyId: string;
  user: UserDto & {profile: PropertyMemberProfileDto};
}
