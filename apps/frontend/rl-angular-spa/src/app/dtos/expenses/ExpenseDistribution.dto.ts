import {Dto} from '../Dto';

export interface ExpenseDistributionDto extends Dto {
  expenseId: string;
  propertyId: string;
  name: string;
  amount: number;
  targetTenantEmail: string;
  targetTenantDisplayName: string;
  createdByEmail: string;
  createdByDisplayName: string;
}
