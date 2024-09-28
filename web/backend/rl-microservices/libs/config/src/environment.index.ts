export type NodeEnvironment = 'production' | 'staging' | 'development';

export type EnvironmentVariables = {
  FRONT_END_URL: string;
  NODE_ENV: NodeEnvironment;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  EMAIL_USER: string;
  EMAIL_PASSWORD: string;
  STRIPE_API_KEY: string;
  STRIPE_WEBHOOK_URL: string;
  STRIPE_WEBHOOK_SECRET: string;
  SUPABASE_URL: string;
  SUPABASE_KEY: string;
  SUPABASE_JWT_SECRET: string;
  SUPABASE_SERVICE_KEY: string;
  RESEND_API_KEY: string;
};

export const environment = {
  paymentsService: {
    name: 'PAYMENTS',
  },
  commsService: {
    name: 'COMMS',
  },
  ledgersService: {
    name: 'LEDGERS',
  },
  usersService: {
    name: 'USERS',
  },
} as const;
