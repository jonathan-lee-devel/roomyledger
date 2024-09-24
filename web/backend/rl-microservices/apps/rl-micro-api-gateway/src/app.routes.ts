import {Routes} from '@nestjs/core';

import {CommsModule} from './comms/comms.module';
import {LedgersModule} from './ledgers/ledgers.module';
import {PaymentsModule} from './payments/payments.module';
import {UsersModule} from './users/users.module';

export const routes: Routes = [
  {
    path: 'comms',
    module: CommsModule,
  },
  {
    path: 'ledgers',
    module: LedgersModule,
  },
  {
    path: 'payments',
    module: PaymentsModule,
  },
  {
    path: 'users',
    module: UsersModule,
  },
];
