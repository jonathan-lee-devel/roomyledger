import {Dto} from '../Dto';

export interface PropertyRulesDto extends Dto {
  propertyId: string;
  numberOfExpenseApprovalsRequired: number;
}
