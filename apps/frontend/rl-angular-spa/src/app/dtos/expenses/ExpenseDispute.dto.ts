import {UserProfile} from '../auth/UserProfile';
import {UserDto} from '../users/User.dto';

export interface ExpenseDisputeDto {
  expenseId: string;

  createdBy: UserDto & {profile: UserProfile};

  createdAt: string;

  updatedAt: string;
}
