import { UserProfile, Lifestyle, HealthData } from '../App';
import { Meal, meals, getMealsByTags, getMealsByCategory } from '../data/mealDatabase';

export interface DietRecommendation {
  dailyCalorieTarget: number;
  recommendedMeals: Meal[];
  dietType: string;
  guidelines: string[];
}

/**
 * 사용자의 건강 데이터를 기반으로 식단을 추천합니다
 */
export function generateDietRecommendation(
  profile: UserProfile,
  lifestyle: Lifestyle,
  latestHealthData?: HealthData
): DietRecommendation {
  const bmi = profile.weight / Math.pow(profile.height / 100, 2);

  // 우선순위에 따른 식단 타입 결정
  let dietType: string;
  let targetTags: string[];
  let guidelines: string[];
  let dailyCalorieTarget: number;

  // 고나트륨 (최우선)
  if (latestHealthData && latestHealthData.sodium > 145) {
    dietType = '저나트륨 식단';
    targetTags = ['저나트륨'];
    guidelines = [
      '하루 나트륨 섭취량 2000mg 이하로 제한하기',
      '가공식품과 인스턴트 식품 피하기',
      '신선한 채소와 과일 충분히 섭취하기',
      '소금 대신 허브와 레몬즙 활용하기'
    ];
    dailyCalorieTarget = calculateDailyCalories(profile, lifestyle);
  }
  // 저나트륨
  else if (latestHealthData && latestHealthData.sodium < 135) {
    dietType = '전해질 균형 식단';
    targetTags = ['저나트륨']; // 저나트륨 메뉴 중에서도 적절한 염분 포함
    guidelines = [
      '적절한 염분 섭취 필요',
      '전해질 음료 고려하기',
      '수분 섭취량 확인하기',
      '의사와 상담하여 염분 섭취량 조절하기'
    ];
    dailyCalorieTarget = calculateDailyCalories(profile, lifestyle);
  }
  // 고혈당
  else if (latestHealthData && latestHealthData.glucose > 125) {
    dietType = '혈당 관리 식단 (저GI)';
    targetTags = ['저GI', '고섬유'];
    guidelines = [
      '정제 탄수화물 피하고 통곡물 선택하기',
      '식이섬유 풍부한 채소 충분히 섭취하기',
      '단 음식과 음료 제한하기',
      '식사 시간 규칙적으로 유지하기',
      '한 끼 과식 피하고 소량씩 자주 먹기'
    ];
    dailyCalorieTarget = Math.min(
      calculateDailyCalories(profile, lifestyle),
      1800 // 혈당 관리를 위해 제한
    );
  }
  // 저혈당
  else if (latestHealthData && latestHealthData.glucose < 70) {
    dietType = '저혈당 예방 식단';
    targetTags = ['균형식', '고섬유'];
    guidelines = [
      '규칙적인 식사와 간식으로 혈당 안정시키기',
      '복합 탄수화물과 단백질 조합하기',
      '공복 피하고 3-4시간마다 식사하기',
      '간식으로 견과류나 과일 준비하기'
    ];
    dailyCalorieTarget = calculateDailyCalories(profile, lifestyle);
  }
  // 고BMI (과체중/비만)
  else if (bmi > 25) {
    dietType = '체중 관리 식단 (칼로리 제한)';
    targetTags = ['저칼로리', '다이어트', '고단백'];
    guidelines = [
      '하루 칼로리 1500-1800kcal로 제한하기',
      '고단백 저지방 식품 선택하기',
      '포만감 주는 채소 많이 먹기',
      '천천히 씹어 먹고 물 충분히 마시기',
      '주 0.5-1kg 감량 목표로 하기'
    ];
    dailyCalorieTarget = Math.min(
      calculateDailyCalories(profile, lifestyle) - 500, // 감량을 위해 500kcal 감소
      1800
    );
  }
  // 저BMI (저체중)
  else if (bmi < 18.5) {
    dietType = '체중 증가 식단';
    targetTags = ['균형식', '고단백'];
    guidelines = [
      '하루 칼로리 충분히 섭취하기',
      '영양가 높은 음식 선택하기',
      '식사 횟수 늘려 자주 먹기',
      '단백질과 건강한 지방 충분히 섭취하기'
    ];
    dailyCalorieTarget = calculateDailyCalories(profile, lifestyle) + 500; // 증량을 위해 500kcal 증가
  }
  // 정상 (건강 유지)
  else {
    dietType = '균형 잡힌 건강 식단';
    targetTags = ['균형식'];
    guidelines = [
      '현재 건강 상태 유지하기',
      '다양한 영양소 골고루 섭취하기',
      '신선한 재료 활용한 한식 위주로 먹기',
      '규칙적인 식사 시간 유지하기',
      '과식 피하고 적정량 먹기'
    ];
    dailyCalorieTarget = calculateDailyCalories(profile, lifestyle);
  }

  // 추천 식사 선택 (아침, 점심, 저녁 각 1개씩)
  const recommendedMeals = selectMeals(targetTags, dailyCalorieTarget);

  return {
    dailyCalorieTarget,
    recommendedMeals,
    dietType,
    guidelines
  };
}

/**
 * 일일 권장 칼로리 계산 (Harris-Benedict 공식 사용)
 */
function calculateDailyCalories(profile: UserProfile, lifestyle: Lifestyle): number {
  let bmr: number; // 기초대사량

  // 성별에 따른 BMR 계산
  if (profile.gender === 'male') {
    bmr = 88.362 + (13.397 * profile.weight) + (4.799 * profile.height) - (5.677 * profile.age);
  } else {
    bmr = 447.593 + (9.247 * profile.weight) + (3.098 * profile.height) - (4.330 * profile.age);
  }

  // 활동량에 따른 계수
  let activityMultiplier: number;
  switch (lifestyle.exerciseFrequency) {
    case 'none':
      activityMultiplier = 1.2; // 운동 거의 안함
      break;
    case 'rarely':
      activityMultiplier = 1.375; // 가벼운 운동 (주 1-2회)
      break;
    case 'sometimes':
      activityMultiplier = 1.55; // 보통 운동 (주 3-4회)
      break;
    case 'regular':
      activityMultiplier = 1.725; // 활발한 운동 (주 5-6회)
      break;
    case 'frequent':
      activityMultiplier = 1.9; // 매우 활발한 운동 (주 7회)
      break;
    default:
      activityMultiplier = 1.2;
  }

  return Math.round(bmr * activityMultiplier);
}

/**
 * 태그와 칼로리 목표에 맞는 식사 선택
 */
function selectMeals(targetTags: string[], dailyCalorieTarget: number): Meal[] {
  const selectedMeals: Meal[] = [];

  // 각 식사 카테고리별로 1개씩 선택
  const categories: Meal['category'][] = ['breakfast', 'lunch', 'dinner'];

  for (const category of categories) {
    // 해당 카테고리에서 태그가 맞는 식사 필터링
    const candidateMeals = meals.filter(meal =>
      meal.category === category &&
      targetTags.some(tag => meal.tags.includes(tag))
    );

    // 후보가 있으면 첫 번째 선택 (향후 랜덤 또는 칼로리 기준 선택 가능)
    if (candidateMeals.length > 0) {
      selectedMeals.push(candidateMeals[0]);
    } else {
      // 태그가 없으면 카테고리만 맞는 식사 중 선택
      const fallbackMeals = meals.filter(meal => meal.category === category);
      if (fallbackMeals.length > 0) {
        selectedMeals.push(fallbackMeals[0]);
      }
    }
  }

  return selectedMeals;
}

/**
 * 식사의 총 칼로리 계산
 */
export function calculateTotalCalories(meals: Meal[]): number {
  return meals.reduce((total, meal) => total + meal.calories, 0);
}

/**
 * 식사의 총 영양소 계산
 */
export function calculateTotalNutrition(meals: Meal[]): {
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sodium: number;
} {
  return meals.reduce(
    (total, meal) => ({
      protein: total.protein + meal.protein,
      carbs: total.carbs + meal.carbs,
      fat: total.fat + meal.fat,
      fiber: total.fiber + meal.fiber,
      sodium: total.sodium + meal.sodium
    }),
    { protein: 0, carbs: 0, fat: 0, fiber: 0, sodium: 0 }
  );
}
