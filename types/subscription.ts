export type PackageType = 'individual' | 'family';
export type PlanTier = 'free' | 'basic' | 'premium';

export interface SubscriptionPlan {
  packageType: PackageType;
  planTier: PlanTier;
}

