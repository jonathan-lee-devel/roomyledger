import {PropertyMemberProfileDto} from './PropertyMemberProfile.dto';
import {Dto} from '../Dto';
import {UserDto} from '../users/User.dto';

export interface PropertyTenantDto extends Dto {
  propertyId: string;
  user: UserDto & {profile: PropertyMemberProfileDto};
}
