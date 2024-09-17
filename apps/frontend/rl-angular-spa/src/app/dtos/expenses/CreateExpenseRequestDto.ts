import {Currency} from '../../types';

export interface CreateExpenseRequestDto {
  propertyId: string;
  name: string;
  description: string;
  amount: number;
  currencyCode: Currency;
}
