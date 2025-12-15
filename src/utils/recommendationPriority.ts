import { HealthData, UserProfile, Lifestyle } from '../App';

export type Priority = 'high' | 'medium' | 'low';

interface PriorityResult {
  diet: Priority;
  exercise: Priority;
  hospital: Priority;
}

/**
 * 사용자의 건강 데이터를 기반으로 각 추천 카테고리의 우선순위를 계산합니다.
 */
export function calculateRecommendationPriorities(
  profile: UserProfile,
  lifestyle: Lifestyle,
  latestHealthData?: HealthData
): PriorityResult {
  const bmi = profile.weight / Math.pow(profile.height / 100, 2);

  // 건강 이슈 체크
  const hasHighSodium = latestHealthData && latestHealthData.sodium > 145;
  const hasLowSodium = latestHealthData && latestHealthData.sodium < 135;
  const hasHighGlucose = latestHealthData && latestHealthData.glucose > 140;
  const hasLowGlucose = latestHealthData && latestHealthData.glucose < 70;
  const hasPreDiabetes = latestHealthData && latestHealthData.glucose > 125 && latestHealthData.glucose <= 140;
  const hasHighBMI = bmi > 25;
  const hasLowBMI = bmi < 18.5;
  const isSmoker = lifestyle.smoking;

  // 즉시 주의 필요 (Critical)
  const hasCriticalIssue = hasHighSodium || hasLowSodium || hasHighGlucose || hasLowGlucose;

  // 주의 사항 (Warning)
  const hasWarning = hasPreDiabetes || hasHighBMI || hasLowBMI || isSmoker;

  // 식단 우선순위
  let dietPriority: Priority = 'low';
  if (hasCriticalIssue) {
    dietPriority = 'high';
  } else if (hasPreDiabetes || hasHighBMI) {
    dietPriority = 'medium';
  }

  // 운동 우선순위
  let exercisePriority: Priority = 'low';
  const noExercise = lifestyle.exerciseFrequency === 'none';
  const rareExercise = lifestyle.exerciseFrequency === 'rarely';

  if (hasHighGlucose || (hasHighBMI && noExercise)) {
    exercisePriority = 'high';
  } else if (hasPreDiabetes || hasHighBMI || noExercise || rareExercise) {
    exercisePriority = 'medium';
  }

  // 병원 우선순위
  let hospitalPriority: Priority = 'low';
  if (hasCriticalIssue) {
    hospitalPriority = 'high';
  } else if (hasWarning) {
    hospitalPriority = 'medium';
  }

  return {
    diet: dietPriority,
    exercise: exercisePriority,
    hospital: hospitalPriority
  };
}

/**
 * 우선순위에 따른 설명 텍스트를 반환합니다.
 */
export function getPriorityDescription(priority: Priority): string {
  switch (priority) {
    case 'high':
      return '즉시 조치가 필요합니다';
    case 'medium':
      return '개선이 권장됩니다';
    case 'low':
      return '예방 차원의 관리';
    default:
      return '';
  }
}
