export interface TrialAndSubscriptionsForUserDto {
  activeSubscriptions: {status: string, id: string, createdAt: Date}[];
  trial: {isTrialActive: boolean, trialEndDate: Date};
}
