export type NodeEnvironment = 'production' | 'staging' | 'development';

export interface EnvironmentVariables {
  FRONT_END_URL: string;
  NODE_ENV: NodeEnvironment;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: number;
  EMAIL_USER: string;
  EMAIL_PASSWORD: string;
  STRIPE_API_KEY: string;
  STRIPE_WEBHOOK_URL: string;
  STRIPE_WEBHOOK_SECRET: string;
  SUPABASE_URL: string;
  SUPABASE_KEY: string;
  SUPABASE_JWT_SECRET: string;
}
