import {ApplicationMessagesModule} from './application-messages/application-messages.module';
import {ExpenseDiscussionsModule} from './ledgers/_children/expenses/_children/expense-discussions/expense-discussions.module';
import {ExpenseDistributionsModule} from './ledgers/_children/expenses/_children/expense-distributions/expense-distributions.module';
import {ExpensesModule} from './ledgers/_children/expenses/expenses.module';
import {PropertyInvitationsModule} from './ledgers/_children/properties/_children/property-invitations/property-invitations.module';
import {PropertiesModule} from './ledgers/_children/properties/properties.module';
import {NotificationsModule} from './notifications/notifications.module';
import {StripeModule} from './payments/_children/stripe/stripe.module';
import {PaymentsModule} from './payments/payments.module';
import {UsersModule} from './users/users.module';

export const routes = [
  {
    path: 'payments',
    module: PaymentsModule,
    children: [
      {
        path: 'stripe',
        module: StripeModule,
      },
    ],
  },
  {
    path: 'users',
    module: UsersModule,
  },
  {
    path: 'notifications',
    module: NotificationsModule,
  },
  {
    path: 'application-messages',
    modules: ApplicationMessagesModule,
  },
  {
    path: 'ledgers',
    children: [
      {
        path: 'properties',
        module: PropertiesModule,
        children: [
          {
            path: 'invitations',
            module: PropertyInvitationsModule,
          },
        ],
      },
      {
        path: 'expenses',
        module: ExpensesModule,
        children: [
          {
            path: 'discussions',
            module: ExpenseDiscussionsModule,
          },
          {
            path: 'distributions',
            module: ExpenseDistributionsModule,
          },
        ],
      },
    ],
  },
];
