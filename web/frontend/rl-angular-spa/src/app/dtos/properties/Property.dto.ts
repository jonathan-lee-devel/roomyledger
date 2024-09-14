import {PropertyAdministratorDto} from './PropertyAdministrator.dto';
import {PropertyRulesDto} from './PropertyRules.dto';
import {PropertyTenantDto} from './PropertyTenant.dto';
import {Dto} from '../Dto';
import {PaymentStatusDto} from '../payments/PaymentStatus.dto';
import {UserDto} from '../users/User.dto';

export interface PropertyDto extends Dto {
  name: string;
  administrators: PropertyAdministratorDto[];
  tenants: PropertyTenantDto[];
  rules: PropertyRulesDto;
  rulesId: string;
  createdBy: UserDto;
  createdByUserId: string;
  creatorPaymentStatus: PaymentStatusDto;
}

export const initialPropertyDto: PropertyDto = {
  id: '',
  name: '',
  administrators: [] as PropertyAdministratorDto[],
  tenants: [] as PropertyTenantDto[],
  rules: {
    id: '',
    createdAt: '',
    updatedAt: '',
    propertyId: '',
    numberOfExpenseApprovalsRequired: 1,
  },
  rulesId: '',
  createdBy: {
    id: '',
    createdAt: '',
    updatedAt: '',
    email: '',
    userProfileId: '',
  },
  creatorPaymentStatus: {
    status: 'UNPAID',
    trialEndDate: new Date(),
  },
  createdByUserId: '',
  createdAt: '',
  updatedAt: '',
};
