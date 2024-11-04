export const CURRENCY_CODES = ['EUR', 'USD', 'GBP'] as const;
export type Currency = (typeof CURRENCY_CODES)[number];
