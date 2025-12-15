import { UserProfile, Lifestyle, HealthData } from '../App';
import { HospitalRecommendation, hospitalRecommendations } from '../data/hospitalRecommendations';

export interface HospitalRecommendationResult {
  primaryRecommendation: HospitalRecommendation;
  additionalRecommendations: HospitalRecommendation[];
  summary: string;
}

/**
 * 사용자의 건강 데이터를 기반으로 병원 방문 추천을 생성합니다
 */
export function generateHospitalRecommendation(
  profile: UserProfile,
  lifestyle: Lifestyle,
  latestHealthData?: HealthData
): HospitalRecommendationResult {
  const bmi = profile.weight / Math.pow(profile.height / 100, 2);
  const recommendations: HospitalRecommendation[] = [];

  // 우선순위별로 추천 수집

  // 1. 나트륨 수치 확인 (최우선)
  if (latestHealthData) {
    if (latestHealthData.sodium > 145) {
      const highSodiumRec = hospitalRecommendations.find(r => r.id === 'high-sodium');
      if (highSodiumRec) recommendations.push(highSodiumRec);
    } else if (latestHealthData.sodium < 135) {
      const lowSodiumRec = hospitalRecommendations.find(r => r.id === 'low-sodium');
      if (lowSodiumRec) recommendations.push(lowSodiumRec);
    } else if (latestHealthData.sodium > 143 || latestHealthData.sodium < 137) {
      const borderlineSodiumRec = hospitalRecommendations.find(r => r.id === 'sodium-borderline');
      if (borderlineSodiumRec) recommendations.push(borderlineSodiumRec);
    }
  }

  // 2. 혈당 수치 확인
  if (latestHealthData) {
    if (latestHealthData.glucose < 70) {
      const lowGlucoseRec = hospitalRecommendations.find(r => r.id === 'low-glucose');
      if (lowGlucoseRec) recommendations.push(lowGlucoseRec);
    } else if (latestHealthData.glucose > 140) {
      const highGlucoseRec = hospitalRecommendations.find(r => r.id === 'high-glucose-critical');
      if (highGlucoseRec) recommendations.push(highGlucoseRec);
    } else if (latestHealthData.glucose > 125) {
      const prediabetesRec = hospitalRecommendations.find(r => r.id === 'prediabetes');
      if (prediabetesRec) recommendations.push(prediabetesRec);
    }
  }

  // 3. BMI 확인
  if (bmi > 25) {
    const obesityRec = hospitalRecommendations.find(r => r.id === 'obesity');
    if (obesityRec) recommendations.push(obesityRec);
  } else if (bmi < 18.5) {
    const underweightRec = hospitalRecommendations.find(r => r.id === 'underweight');
    if (underweightRec) recommendations.push(underweightRec);
  }

  // 4. 흡연 확인
  if (lifestyle.smoking) {
    const smokingRec = hospitalRecommendations.find(r => r.id === 'smoking');
    if (smokingRec) recommendations.push(smokingRec);
  }

  // 5. 과도한 음주 확인
  if (lifestyle.alcoholFrequency === 'frequent' || lifestyle.alcoholFrequency === 'daily') {
    const drinkingRec = hospitalRecommendations.find(r => r.id === 'heavy-drinking');
    if (drinkingRec) recommendations.push(drinkingRec);
  }

  // 6. 대사증후군 위험 확인 (복합 조건)
  const hasMetabolicRisk = checkMetabolicSyndromeRisk(bmi, latestHealthData, lifestyle);
  if (hasMetabolicRisk && recommendations.length > 1) {
    const metabolicRec = hospitalRecommendations.find(r => r.id === 'metabolic-syndrome');
    if (metabolicRec && !recommendations.find(r => r.urgency === 'immediate')) {
      // 이미 즉시 방문이 필요한 경우가 아니면 대사증후군 추천 추가
      recommendations.push(metabolicRec);
    }
  }

  // 추천이 없으면 정상 검진 추천
  if (recommendations.length === 0) {
    const normalRec = hospitalRecommendations.find(r => r.id === 'normal-checkup');
    if (normalRec) recommendations.push(normalRec);
  }

  // 우선순위 정렬 (긴급도 순)
  const urgencyOrder = { immediate: 0, '1week': 1, monthly: 2, annual: 3 };
  recommendations.sort((a, b) => urgencyOrder[a.urgency] - urgencyOrder[b.urgency]);

  // 주 추천과 추가 추천 분리
  const primaryRecommendation = recommendations[0];
  const additionalRecommendations = recommendations.slice(1);

  // 요약 생성
  const summary = generateSummary(primaryRecommendation, additionalRecommendations);

  return {
    primaryRecommendation,
    additionalRecommendations,
    summary
  };
}

/**
 * 대사증후군 위험 여부 확인
 */
function checkMetabolicSyndromeRisk(
  bmi: number,
  healthData?: HealthData,
  lifestyle?: Lifestyle
): boolean {
  let riskFactors = 0;

  // 1. 복부비만 (BMI로 대체)
  if (bmi > 25) riskFactors++;

  // 2. 고혈당
  if (healthData && healthData.glucose > 100) riskFactors++;

  // 3. 운동 부족
  if (lifestyle && (lifestyle.exerciseFrequency === 'none' || lifestyle.exerciseFrequency === 'rarely')) {
    riskFactors++;
  }

  // 4. 흡연
  if (lifestyle && lifestyle.smoking) riskFactors++;

  // 5. 과도한 음주
  if (lifestyle && (lifestyle.alcoholFrequency === 'frequent' || lifestyle.alcoholFrequency === 'daily')) {
    riskFactors++;
  }

  // 3개 이상의 위험 요소가 있으면 대사증후군 위험
  return riskFactors >= 3;
}

/**
 * 병원 추천 요약 생성
 */
function generateSummary(
  primary: HospitalRecommendation,
  additional: HospitalRecommendation[]
): string {
  if (primary.urgency === 'immediate') {
    return `${primary.condition}으로 인해 즉시 병원 방문이 필요합니다. ${primary.departments[0]} 진료를 받으세요.`;
  } else if (primary.urgency === '1week') {
    return `${primary.condition}에 대해 1주일 내 ${primary.departments[0]} 방문을 권장합니다.`;
  } else if (primary.urgency === 'monthly') {
    if (additional.length > 0) {
      return `${primary.condition} 외 ${additional.length}가지 항목에 대해 건강 관리가 필요합니다. 한 달 내 병원 방문을 권장합니다.`;
    }
    return `${primary.condition}에 대해 한 달 내 병원 방문을 권장합니다.`;
  } else {
    return '현재 건강 상태가 양호합니다. 정기적인 건강검진으로 건강을 유지하세요.';
  }
}

/**
 * 긴급도별 병원 추천 개수 계산
 */
export function countByUrgency(recommendations: HospitalRecommendation[]): {
  immediate: number;
  week: number;
  monthly: number;
  annual: number;
} {
  return {
    immediate: recommendations.filter(r => r.urgency === 'immediate').length,
    week: recommendations.filter(r => r.urgency === '1week').length,
    monthly: recommendations.filter(r => r.urgency === 'monthly').length,
    annual: recommendations.filter(r => r.urgency === 'annual').length
  };
}
