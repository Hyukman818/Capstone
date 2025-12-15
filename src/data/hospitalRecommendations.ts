export type Urgency = 'immediate' | '1week' | 'monthly' | 'annual';

export interface HospitalRecommendation {
  id: string;
  condition: string;
  urgency: Urgency;
  urgencyLabel: string;
  departments: string[];
  tests: string[];
  estimatedCost: {
    min: number;
    max: number;
  };
  timeline: string;
  notes: string[];
}

export const hospitalRecommendations: HospitalRecommendation[] = [
  // 나트륨 관련
  {
    id: 'high-sodium',
    condition: '고나트륨혈증',
    urgency: 'immediate',
    urgencyLabel: '즉시',
    departments: ['신장내과', '내과', '응급의학과'],
    tests: ['전해질 검사', '신장 기능 검사', '소변 검사'],
    estimatedCost: {
      min: 5,
      max: 15
    },
    timeline: '즉시 병원 방문',
    notes: [
      '탈수나 신장 문제의 징후일 수 있습니다',
      '응급실 방문이 필요할 수 있습니다',
      '충분한 수분 섭취가 필요합니다',
      '의료진의 지시에 따라 염분 섭취를 조절하세요'
    ]
  },
  {
    id: 'low-sodium',
    condition: '저나트륨혈증',
    urgency: 'immediate',
    urgencyLabel: '즉시',
    departments: ['신장내과', '내과', '내분비내과'],
    tests: ['전해질 검사', '신장 기능 검사', '혈액 검사'],
    estimatedCost: {
      min: 5,
      max: 15
    },
    timeline: '즉시 병원 방문',
    notes: [
      '과도한 수분 섭취나 호르몬 문제의 징후일 수 있습니다',
      '두통, 구토, 혼란 증상이 있으면 응급실로 가세요',
      '전해질 불균형은 심각한 합병증을 유발할 수 있습니다',
      '의료진의 지시 없이 염분을 과도하게 섭취하지 마세요'
    ]
  },
  {
    id: 'sodium-borderline',
    condition: '전해질 경계 수치',
    urgency: '1week',
    urgencyLabel: '1주일 내',
    departments: ['신장내과', '가정의학과'],
    tests: ['전해질 검사', '신장 기능 검사'],
    estimatedCost: {
      min: 3,
      max: 8
    },
    timeline: '1주일 내 병원 방문',
    notes: [
      '전해질 수치를 모니터링할 필요가 있습니다',
      '수분 섭취량과 염분 섭취를 체크하세요',
      '정기적인 혈액 검사가 권장됩니다'
    ]
  },

  // 혈당 관련
  {
    id: 'high-glucose-critical',
    condition: '고혈당 (140mg/dL 이상)',
    urgency: 'immediate',
    urgencyLabel: '즉시',
    departments: ['내분비내과', '내과'],
    tests: ['공복혈당', '당화혈색소(HbA1c)', '경구당부하검사'],
    estimatedCost: {
      min: 5,
      max: 12
    },
    timeline: '즉시 병원 방문',
    notes: [
      '당뇨병 진단이 필요할 수 있습니다',
      '합병증 예방을 위해 즉시 관리가 필요합니다',
      '식단 조절과 운동이 필수입니다',
      '정기적인 혈당 모니터링이 필요합니다'
    ]
  },
  {
    id: 'prediabetes',
    condition: '당뇨 전단계 (125-140mg/dL)',
    urgency: '1week',
    urgencyLabel: '1주일 내',
    departments: ['내분비내과', '가정의학과'],
    tests: ['공복혈당', '당화혈색소(HbA1c)', '인슐린 저항성 검사'],
    estimatedCost: {
      min: 4,
      max: 10
    },
    timeline: '1-2주 내 병원 방문',
    notes: [
      '당뇨병으로 진행될 위험이 있습니다',
      '생활습관 개선으로 당뇨병 예방이 가능합니다',
      '3-6개월마다 혈당 검사를 받으세요',
      '체중 감량과 규칙적인 운동이 중요합니다'
    ]
  },
  {
    id: 'low-glucose',
    condition: '저혈당 (70mg/dL 미만)',
    urgency: 'immediate',
    urgencyLabel: '즉시',
    departments: ['내분비내과', '내과'],
    tests: ['공복혈당', '인슐린 검사', '호르몬 검사'],
    estimatedCost: {
      min: 5,
      max: 12
    },
    timeline: '즉시 병원 방문',
    notes: [
      '저혈당 원인을 파악해야 합니다',
      '당분을 섭취하고 증상이 지속되면 응급실로 가세요',
      '규칙적인 식사가 중요합니다',
      '저혈당 증상(떨림, 식은땀, 어지러움)을 기억하세요'
    ]
  },

  // BMI 관련
  {
    id: 'obesity',
    condition: '과체중/비만 (BMI 25 이상)',
    urgency: 'monthly',
    urgencyLabel: '1개월 내',
    departments: ['가정의학과', '비만클리닉', '내분비내과'],
    tests: ['체성분 검사', '혈액 검사', '대사증후군 검사'],
    estimatedCost: {
      min: 10,
      max: 30
    },
    timeline: '1개월 내 병원 방문',
    notes: [
      '체중 감량 계획 수립이 필요합니다',
      '대사증후군 위험을 평가해야 합니다',
      '식단 상담과 운동 처방을 받으세요',
      '정기적인 건강 검진이 중요합니다'
    ]
  },
  {
    id: 'underweight',
    condition: '저체중 (BMI 18.5 미만)',
    urgency: 'monthly',
    urgencyLabel: '1개월 내',
    departments: ['가정의학과', '내과', '영양상담실'],
    tests: ['혈액 검사', '영양 상태 평가', '갑상선 검사'],
    estimatedCost: {
      min: 5,
      max: 15
    },
    timeline: '1개월 내 병원 방문',
    notes: [
      '영양실조나 기저 질환을 확인해야 합니다',
      '영양 상담을 받으세요',
      '균형 잡힌 식단과 충분한 칼로리 섭취가 필요합니다',
      '갑상선이나 소화기 질환 검사를 고려하세요'
    ]
  },

  // 흡연 관련
  {
    id: 'smoking',
    condition: '흡연자',
    urgency: 'monthly',
    urgencyLabel: '1개월 내',
    departments: ['금연클리닉', '가정의학과', '호흡기내과'],
    tests: ['폐 기능 검사', '흉부 X-ray', '일산화탄소 측정'],
    estimatedCost: {
      min: 0,
      max: 10
    },
    timeline: '편한 시기에 방문 (금연 의지 있을 때)',
    notes: [
      '금연클리닉은 대부분 무료 또는 저렴합니다',
      '금연 보조제 처방을 받을 수 있습니다',
      '상담과 행동 치료가 효과적입니다',
      '폐 건강 상태를 확인하세요',
      '금연 성공률을 높이려면 전문가의 도움을 받으세요'
    ]
  },

  // 과도한 음주
  {
    id: 'heavy-drinking',
    condition: '과도한 음주',
    urgency: 'monthly',
    urgencyLabel: '1개월 내',
    departments: ['가정의학과', '정신건강의학과', '소화기내과'],
    tests: ['간 기능 검사', '혈액 검사', 'γ-GTP 검사'],
    estimatedCost: {
      min: 3,
      max: 10
    },
    timeline: '1개월 내 병원 방문',
    notes: [
      '간 건강을 확인해야 합니다',
      '알코올 의존도 평가를 받으세요',
      '절주 또는 금주 계획을 수립하세요',
      '필요시 알코올 중독 치료 프로그램을 고려하세요'
    ]
  },

  // 정상 - 정기 검진
  {
    id: 'normal-checkup',
    condition: '정상 범위 - 건강 유지',
    urgency: 'annual',
    urgencyLabel: '연 1회',
    departments: ['가정의학과', '건강검진센터'],
    tests: ['종합 건강검진', '혈액 검사', '소변 검사', '기본 검진'],
    estimatedCost: {
      min: 10,
      max: 50
    },
    timeline: '연 1회 정기 건강검진',
    notes: [
      '현재 건강 상태가 양호합니다',
      '예방적 차원에서 연 1회 검진을 받으세요',
      '40세 이상은 국가 건강검진 대상입니다',
      '건강한 생활습관을 계속 유지하세요',
      '이상 증상이 나타나면 즉시 병원을 방문하세요'
    ]
  },

  // 복합 건강 이슈
  {
    id: 'metabolic-syndrome',
    condition: '대사증후군 위험',
    urgency: '1week',
    urgencyLabel: '1주일 내',
    departments: ['내분비내과', '가정의학과', '심장내과'],
    tests: ['공복혈당', '지질 검사', '혈압 측정', '허리둘레 측정'],
    estimatedCost: {
      min: 8,
      max: 20
    },
    timeline: '1-2주 내 병원 방문',
    notes: [
      '심혈관 질환 위험이 높아질 수 있습니다',
      '종합적인 건강 관리가 필요합니다',
      '생활습관 개선이 가장 중요합니다',
      '정기적인 모니터링이 필요합니다'
    ]
  }
];

// 조건별 병원 추천 검색
export function getRecommendationByCondition(condition: string): HospitalRecommendation | undefined {
  return hospitalRecommendations.find(rec => rec.condition === condition);
}

// 긴급도별 병원 추천 필터링
export function getRecommendationsByUrgency(urgency: Urgency): HospitalRecommendation[] {
  return hospitalRecommendations.filter(rec => rec.urgency === urgency);
}
