import { UserProfile, Lifestyle, HealthData } from '../App';
import { Utensils, Dumbbell, Hospital, AlertTriangle, CheckCircle } from 'lucide-react';

interface RecommendationsProps {
  profile: UserProfile;
  lifestyle: Lifestyle;
  latestHealthData?: HealthData;
}

export function Recommendations({ profile, lifestyle, latestHealthData }: RecommendationsProps) {
  // Calculate BMI
  const bmi = profile.weight / Math.pow(profile.height / 100, 2);
  
  // Analyze health status
  const healthIssues: string[] = [];
  const healthWarnings: string[] = [];
  
  if (latestHealthData) {
    if (latestHealthData.sodium < 135) {
      healthIssues.push('저나트륨혈증');
    } else if (latestHealthData.sodium > 145) {
      healthIssues.push('고나트륨혈증');
    }
    
    if (latestHealthData.glucose < 70) {
      healthIssues.push('저혈당');
    } else if (latestHealthData.glucose > 140) {
      healthWarnings.push('혈당 수치 높음');
    } else if (latestHealthData.glucose > 125) {
      healthWarnings.push('당뇨 전단계 의심');
    }
  }
  
  if (bmi > 25) {
    healthWarnings.push('과체중');
  } else if (bmi < 18.5) {
    healthWarnings.push('저체중');
  }
  
  if (lifestyle.smoking) {
    healthWarnings.push('흡연');
  }
  
  if (lifestyle.alcoholFrequency === 'frequent' || lifestyle.alcoholFrequency === 'daily') {
    healthWarnings.push('과도한 음주');
  }
  
  // Generate diet recommendations
  const dietRecommendations: string[] = [];
  
  if (latestHealthData) {
    if (latestHealthData.sodium > 145) {
      dietRecommendations.push('나트륨 섭취 줄이기 (가공식품 피하기)');
      dietRecommendations.push('충분한 수분 섭취 (하루 2L)');
      dietRecommendations.push('신선한 채소와 과일 위주');
    } else if (latestHealthData.sodium < 135) {
      dietRecommendations.push('적절한 염분 섭취');
      dietRecommendations.push('전해질 보충');
    }
    
    if (latestHealthData.glucose > 125) {
      dietRecommendations.push('정제 탄수화물 줄이기');
      dietRecommendations.push('식이섬유가 풍부한 채소 섭취');
      dietRecommendations.push('단백질 위주의 균형잡힌 식단');
      dietRecommendations.push('단 음식과 음료 피하기');
    } else if (latestHealthData.glucose < 70) {
      dietRecommendations.push('규칙적인 식사와 간식');
      dietRecommendations.push('복합 탄수화물과 단백질 조합');
    }
  }
  
  if (bmi > 25) {
    dietRecommendations.push('칼로리 제한 (1500-1800kcal)');
    dietRecommendations.push('고칼로리 음료 피하기');
  }
  
  if (dietRecommendations.length === 0) {
    dietRecommendations.push('현재 건강 상태 양호');
    dietRecommendations.push('균형잡힌 식단 유지');
    dietRecommendations.push('충분한 수분 섭취');
  }
  
  // Generate exercise recommendations
  const exerciseRecommendations: string[] = [];
  
  if (lifestyle.exerciseFrequency === 'none' || lifestyle.exerciseFrequency === 'rarely') {
    exerciseRecommendations.push('하루 30분 걷기부터 시작');
    exerciseRecommendations.push('스트레칭과 가벼운 요가');
  }
  
  if (latestHealthData?.glucose && latestHealthData.glucose > 125) {
    exerciseRecommendations.push('유산소 운동 (주 5회, 30분)');
    exerciseRecommendations.push('근력 운동 (주 2-3회)');
    exerciseRecommendations.push('자전거, 수영 등');
  }
  
  if (bmi > 25) {
    exerciseRecommendations.push('유산소 운동 (주 4-5회)');
    exerciseRecommendations.push('목표: 주 0.5-1kg 감량');
  }
  
  if (exerciseRecommendations.length === 0) {
    exerciseRecommendations.push('현재 운동량 유지');
    exerciseRecommendations.push('근력 운동 추가 (주 2-3회)');
    exerciseRecommendations.push('스트레칭과 유연성 운동');
  }
  
  // Generate hospital visit recommendations
  const hospitalRecommendations: string[] = [];
  
  if (healthIssues.length > 0) {
    hospitalRecommendations.push('즉시 병원 방문 필요');
    hospitalRecommendations.push(`증상: ${healthIssues.join(', ')}`);
    hospitalRecommendations.push('추천: 내과 또는 가정의학과');
  } else if (latestHealthData) {
    if (latestHealthData.glucose > 125 && latestHealthData.glucose <= 140) {
      hospitalRecommendations.push('당뇨 전단계 - 정기 검진 권장');
      hospitalRecommendations.push('추천: 내분비내과 상담');
      hospitalRecommendations.push('3개월마다 혈당 검사');
    }
    
    if (latestHealthData.sodium > 143 || latestHealthData.sodium < 137) {
      hospitalRecommendations.push('전해질 불균형 모니터링');
      hospitalRecommendations.push('추천: 신장내과 상담 고려');
    }
  }
  
  if (lifestyle.smoking) {
    hospitalRecommendations.push('금연 클리닉 방문 권장');
    hospitalRecommendations.push('금연 보조제 상담');
  }
  
  if (hospitalRecommendations.length === 0) {
    hospitalRecommendations.push('현재 정상 범위');
    hospitalRecommendations.push('연 1회 정기 건강검진 권장');
    hospitalRecommendations.push('건강 이상 시 즉시 병원 방문');
  }

  return (
    <div className="space-y-4">
      {/* Health Status Overview */}
      {(healthIssues.length > 0 || healthWarnings.length > 0) && (
        <div className="bg-white rounded-2xl shadow-lg p-5">
          <h2 className="text-gray-900 mb-3">건강 상태 요약</h2>
          
          {healthIssues.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-red-900 mb-1">즉시 주의 필요</p>
                  {healthIssues.map((issue, index) => (
                    <p key={index} className="text-xs text-red-700">• {issue}</p>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {healthWarnings.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-yellow-900 mb-1">주의 사항</p>
                  {healthWarnings.map((warning, index) => (
                    <p key={index} className="text-xs text-yellow-700">• {warning}</p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Diet Recommendations */}
      <div className="bg-white rounded-2xl shadow-lg p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-orange-100 p-2.5 rounded-xl">
            <Utensils className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h2 className="text-gray-900">맞춤 식단 추천</h2>
            <p className="text-xs text-gray-600">건강 데이터 기반</p>
          </div>
        </div>
        
        <div className="space-y-2">
          {dietRecommendations.map((recommendation, index) => (
            <div key={index} className="flex items-start gap-2 p-3 bg-orange-50 rounded-xl">
              <CheckCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-gray-700 flex-1">{recommendation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Exercise Recommendations */}
      <div className="bg-white rounded-2xl shadow-lg p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-green-100 p-2.5 rounded-xl">
            <Dumbbell className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h2 className="text-gray-900">맞춤 운동 추천</h2>
            <p className="text-xs text-gray-600">건강 상태 맞춤</p>
          </div>
        </div>
        
        <div className="space-y-2">
          {exerciseRecommendations.map((recommendation, index) => (
            <div key={index} className="flex items-start gap-2 p-3 bg-green-50 rounded-xl">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-gray-700 flex-1">{recommendation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hospital Recommendations */}
      <div className="bg-white rounded-2xl shadow-lg p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-red-100 p-2.5 rounded-xl">
            <Hospital className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h2 className="text-gray-900">병원 방문 안내</h2>
            <p className="text-xs text-gray-600">전문 의료진 상담</p>
          </div>
        </div>
        
        <div className="space-y-2">
          {hospitalRecommendations.map((recommendation, index) => (
            <div key={index} className="flex items-start gap-2 p-3 bg-red-50 rounded-xl">
              <CheckCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-gray-700 flex-1">{recommendation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-gray-100 rounded-xl p-4">
        <p className="text-xs text-gray-600">
          ⚠️ 본 추천은 참고용이며 의학적 진단을 대체할 수 없습니다. 건강 이상 시 전문 의료진과 상담하세요.
        </p>
      </div>
    </div>
  );
}