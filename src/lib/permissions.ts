import { SubscriptionLevel } from "./subscription";

export function canCreateResume(
  subscriptionLevel: SubscriptionLevel,
  currentResumeCount: number,
) {
  const maxResumeMap: Record<SubscriptionLevel, number> = {
    // free: 1,
    // pro: 3,
    // pro_plus: Infinity,
    free: Infinity,
    pro: Infinity,
    pro_plus: Infinity,
  };

  const maxResumes = maxResumeMap[subscriptionLevel];

  return currentResumeCount < maxResumes;
}

// subscriptionLevel: SubscriptionLevel
export function canUseAITools() {
  // return subscriptionLevel !== "free";
  return true;
}

// subscriptionLevel: SubscriptionLevel
export function canUseCustomizations() {
  // return subscriptionLevel === "pro_plus";
  return true;
}
