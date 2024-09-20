import {PartialType} from '@nestjs/mapped-types';

import {CreateExpenseDistributionDto} from './create-expense-distribution.dto';

export class UpdateExpenseDistributionDto extends PartialType(
  CreateExpenseDistributionDto,
) {}
