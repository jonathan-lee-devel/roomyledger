export const CURRENCY_CODES = ['EUR', 'USD'] as const;
export type Currency = (typeof CURRENCY_CODES)[number];
