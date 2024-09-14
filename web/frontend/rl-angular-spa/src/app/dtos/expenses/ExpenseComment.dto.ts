import {UserProfile} from '../auth/UserProfile';
import {UserDto} from '../users/User.dto';

export interface ExpenseCommentDto {
  expenseId: string;

  propertyId: string;

  createdBy: UserDto & {profile: UserProfile};

  text: string;

  createdAt: string;

  updatedAt: string;
}
