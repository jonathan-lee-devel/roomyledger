import {ExpenseApprovalDto} from './ExpenseApproval.dto';
import {ExpenseCommentDto} from './ExpenseComment.dto';
import {ExpenseDisputeDto} from './ExpenseDispute.dto';
import {Currency} from '../../types';
import {Dto} from '../Dto';
import {UserProfile} from '../auth/UserProfile';
import {UserDto} from '../users/User.dto';

export type ExpenseStateEnum = 'APPROVED' | 'PENDING' | 'DISPUTED';

export interface ExpenseDto extends Dto {
  propertyId: string;
  name: string;
  description: string;
  amount: number;
  currency: Currency;
  filePath?: string;
  imageUrl?: string;
  state: ExpenseStateEnum;
  createdByUserId: string;
  createdBy: UserDto & {profile: UserProfile};
  approvals: ExpenseApprovalDto[];
  disputes: ExpenseDisputeDto[];
  comments: ExpenseCommentDto[];
}

export const initialExpenseDto: ExpenseDto = {
  id: '',
  propertyId: '',
  name: '',
  description: '',
  amount: 0,
  currency: 'EUR',
  state: 'PENDING',
  createdBy: {
    email: '',
    userProfileId: '',
    id: '',
    createdAt: '',
    updatedAt: '',
    profile: {
      email: '',
      displayName: '',
    },
  },
  createdByUserId: '',
  approvals: [],
  disputes: [],
  comments: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
