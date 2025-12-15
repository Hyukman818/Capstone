import { UserProfile, Lifestyle, HealthData } from '../App';
import { Exercise, exercises } from '../data/exerciseDatabase';

export interface ExerciseRecommendation {
  routineName: string;
  description: string;
  totalDuration: number; // minutes per session
  frequency: string;
  weeklyGoal: string;
  recommendedExercises: Exercise[];
  guidelines: string[];
}

/**
 * 사용자의 건강 데이터와 라이프스타일을 기반으로 운동을 추천합니다
 */
export function generateExerciseRecommendation(
  profile: UserProfile,
  lifestyle: Lifestyle,
  latestHealthData?: HealthData
): ExerciseRecommendation {
  const bmi = profile.weight / Math.pow(profile.height / 100, 2);

  // 우선순위에 따른 운동 타입 결정
  let routineName: string;
  let description: string;
  let targetTags: string[];
  let guidelines: string[];
  let frequency: string;
  let weeklyGoal: string;
  let totalDuration: number;

  // 고혈당 (최우선 - 유산소 집중)
  if (latestHealthData && latestHealthData.glucose > 125) {
    routineName = '혈당 관리 운동 루틴';
    description = '유산소 운동 중심으로 혈당을 효과적으로 관리합니다';
    targetTags = ['유산소', '중강도'];
    frequency = '주 5-6회';
    weeklyGoal = '주 150분 이상 유산소 운동';
    totalDuration = 40;
    guidelines = [
      '식후 30분-1시간 후 운동하기',
      '유산소 운동 주 150분 이상 실시하기',
      '근력 운동 주 2-3회 추가하기',
      '운동 전후 혈당 체크하기',
      '저혈당 대비해 당분 준비하기'
    ];
  }
  // 고BMI (과체중/비만 - 체중 감량)
  else if (bmi > 25) {
    routineName = '체중 감량 운동 루틴';
    description = '유산소와 근력 운동을 병행하여 효과적으로 체중을 감량합니다';
    targetTags = ['유산소', '근력', '중강도'];
    frequency = '주 5-6회';
    weeklyGoal = '주 250분 유산소 + 근력 운동';
    totalDuration = 50;
    guidelines = [
      '유산소 운동 주 250분 이상 (하루 40-50분)',
      '근력 운동 주 2-3회 (주요 근육군)',
      '운동 강도 점진적으로 높이기',
      '관절 보호 위해 저충격 운동부터 시작하기',
      '주 0.5-1kg 감량 목표로 하기'
    ];
  }
  // 저BMI (저체중 - 근력 증진)
  else if (bmi < 18.5) {
    routineName = '근력 증진 운동 루틴';
    description = '근력 운동 중심으로 건강한 체중을 늘립니다';
    targetTags = ['근력', '초급', '중급'];
    frequency = '주 3-4회';
    weeklyGoal = '주 3-4회 근력 운동';
    totalDuration = 40;
    guidelines = [
      '근력 운동 주 3-4회 실시하기',
      '충분한 단백질 섭취와 함께 하기',
      '운동 후 영양 섭취 중요',
      '과도한 유산소 운동 피하기',
      '점진적으로 강도 높이기'
    ];
  }
  // 운동 거의 안함 (초보자)
  else if (lifestyle.exerciseFrequency === 'none' || lifestyle.exerciseFrequency === 'rarely') {
    routineName = '초보자 맞춤 운동 루틴';
    description = '쉽고 안전한 운동으로 건강한 습관을 만듭니다';
    targetTags = ['초급', '저강도', '유산소', '스트레칭'];
    frequency = '주 3-4회';
    weeklyGoal = '주 150분 신체 활동';
    totalDuration = 30;
    guidelines = [
      '하루 30분 걷기부터 시작하기',
      '스트레칭과 가벼운 맨몸 운동 추가하기',
      '무리하지 말고 점진적으로 늘리기',
      '운동 즐길 수 있는 활동 선택하기',
      '규칙적인 운동 습관 만들기가 목표'
    ];
  }
  // 정상 (건강 유지)
  else {
    routineName = '건강 유지 운동 루틴';
    description = '균형 잡힌 운동으로 현재 건강을 유지합니다';
    targetTags = ['중급', '유산소', '근력', '유연성'];
    frequency = '주 4-5회';
    weeklyGoal = '주 150분 유산소 + 근력 운동';
    totalDuration = 40;
    guidelines = [
      '유산소 운동 주 150분 이상 실시하기',
      '근력 운동 주 2-3회 추가하기',
      '유연성 운동 포함하기',
      '다양한 운동 시도하여 흥미 유지하기',
      '현재 건강 상태 잘 유지 중'
    ];
  }

  // 추천 운동 선택
  const recommendedExercises = selectExercises(targetTags, lifestyle.exerciseFrequency, bmi);

  return {
    routineName,
    description,
    totalDuration,
    frequency,
    weeklyGoal,
    recommendedExercises,
    guidelines
  };
}

/**
 * 태그와 운동 빈도에 맞는 운동 선택
 */
function selectExercises(
  targetTags: string[],
  exerciseFrequency: Lifestyle['exerciseFrequency'],
  bmi: number
): Exercise[] {
  const selectedExercises: Exercise[] = [];

  // 운동 빈도에 따른 난이도 결정
  let difficulty: Exercise['difficulty'];
  if (exerciseFrequency === 'none' || exerciseFrequency === 'rarely') {
    difficulty = 'beginner';
  } else if (exerciseFrequency === 'frequent') {
    difficulty = 'advanced';
  } else {
    difficulty = 'intermediate';
  }

  // 1. 유산소 운동 선택 (2개)
  const cardioExercises = exercises.filter(ex =>
    ex.type === 'cardio' &&
    (ex.difficulty === difficulty || ex.difficulty === 'beginner') &&
    targetTags.some(tag => ex.tags.includes(tag))
  );

  if (cardioExercises.length > 0) {
    selectedExercises.push(cardioExercises[0]);
    if (cardioExercises.length > 1) {
      selectedExercises.push(cardioExercises[1]);
    }
  } else {
    // 태그가 없으면 난이도만 맞는 유산소 운동 선택
    const fallbackCardio = exercises.filter(ex =>
      ex.type === 'cardio' && ex.difficulty === difficulty
    );
    if (fallbackCardio.length > 0) {
      selectedExercises.push(fallbackCardio[0]);
    }
  }

  // 2. 근력 운동 선택 (3-4개)
  // 과체중이거나 정상이면 근력 운동 추가
  if (bmi >= 18.5) {
    const strengthExercises = exercises.filter(ex =>
      ex.type === 'strength' &&
      (ex.difficulty === difficulty || ex.difficulty === 'beginner') &&
      targetTags.some(tag => ex.tags.includes(tag))
    );

    // 하체, 상체, 코어 운동을 골고루 선택
    const lowerBody = strengthExercises.find(ex =>
      ex.targetMuscles.some(m => m.includes('대퇴') || m.includes('둔근') || m.includes('하체'))
    );
    const upperBody = strengthExercises.find(ex =>
      ex.targetMuscles.some(m => m.includes('가슴') || m.includes('어깨') || m.includes('삼두'))
    );
    const core = strengthExercises.find(ex =>
      ex.targetMuscles.some(m => m.includes('복') || m.includes('코어'))
    );

    if (lowerBody) selectedExercises.push(lowerBody);
    if (upperBody) selectedExercises.push(upperBody);
    if (core) selectedExercises.push(core);

    // 근력 운동이 부족하면 추가
    if (selectedExercises.filter(ex => ex.type === 'strength').length < 3) {
      const additionalStrength = exercises.filter(ex =>
        ex.type === 'strength' &&
        ex.difficulty === difficulty &&
        !selectedExercises.includes(ex)
      );
      if (additionalStrength.length > 0) {
        selectedExercises.push(additionalStrength[0]);
      }
    }
  }

  // 3. 유연성 운동 선택 (1-2개)
  const flexibilityExercises = exercises.filter(ex =>
    ex.type === 'flexibility' &&
    (ex.difficulty === difficulty || ex.difficulty === 'beginner')
  );

  if (flexibilityExercises.length > 0) {
    selectedExercises.push(flexibilityExercises[0]);
  }

  // 운동이 너무 적으면 추가 운동 선택
  if (selectedExercises.length < 4) {
    const additionalExercises = exercises.filter(ex =>
      ex.difficulty === difficulty &&
      !selectedExercises.includes(ex)
    );
    while (selectedExercises.length < 5 && additionalExercises.length > 0) {
      selectedExercises.push(additionalExercises.shift()!);
    }
  }

  return selectedExercises;
}

/**
 * 운동의 총 예상 소모 칼로리 계산
 */
export function calculateTotalCalories(exercises: Exercise[]): number {
  return exercises.reduce((total, exercise) => total + exercise.calories, 0);
}

/**
 * 운동 루틴의 총 소요 시간 계산
 */
export function calculateTotalDuration(exercises: Exercise[]): number {
  return exercises.reduce((total, exercise) => {
    if (exercise.duration) {
      return total + exercise.duration;
    } else if (exercise.sets && exercise.reps && exercise.rest) {
      // 세트 운동: (세트 수 × 회당 시간) + 휴식 시간
      // 평균적으로 1회당 3초 가정
      const exerciseTime = exercise.sets * exercise.reps * 3;
      const restTime = (exercise.sets - 1) * exercise.rest;
      return total + Math.ceil((exerciseTime + restTime) / 60); // 분으로 변환
    }
    return total;
  }, 0);
}
