import { useState } from 'react';
import { Activity, Droplet, Gauge, AlertTriangle, Info } from 'lucide-react';

interface DeviceSimulatorProps {
  onNewData: (sodium: number, glucose: number) => void;
}

export function DeviceSimulator({ onNewData }: DeviceSimulatorProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [currentSodium, setCurrentSodium] = useState<number | null>(null);
  const [currentGlucose, setCurrentGlucose] = useState<number | null>(null);
  const [isReading, setIsReading] = useState(false);
  const [showMealQuestion, setShowMealQuestion] = useState(false);
  const [mealStatus, setMealStatus] = useState<'fasting' | 'after-meal' | null>(null);

  const simulateReading = () => {
    setIsReading(true);

    // Simulate device reading delay
    setTimeout(() => {
      // Normal ranges:
      // Sodium: 135-145 mEq/L
      // Glucose: 70-140 mg/dL (fasting: 70-100, after meal: 70-140)
      const sodium = Math.floor(Math.random() * 20) + 130; // 130-150
      const glucose = Math.floor(Math.random() * 80) + 70; // 70-150

      setCurrentSodium(sodium);
      setCurrentGlucose(glucose);
      onNewData(sodium, glucose);
      setIsReading(false);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-5">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="bg-purple-100 p-2.5 rounded-xl">
            <Activity className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-gray-900">건강 측정 소자</h2>
            <p className="text-xs text-gray-600">실시간 건강 데이터</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
          <span className="text-xs text-gray-600">{isConnected ? '연결됨' : '미연결'}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        {/* Sodium Reading */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Droplet className="w-4 h-4 text-blue-600" />
            <span className="text-xs text-blue-900">나트륨</span>
          </div>
          {currentSodium !== null ? (
            <div>
              <p className="text-blue-900">
                {currentSodium} <span className="text-xs">mEq/L</span>
              </p>
              <p className="text-xs text-blue-700 mt-1">
                {currentSodium < 135 ? '낮음' :
                 currentSodium > 145 ? '높음' : '정상'}
              </p>
            </div>
          ) : (
            <p className="text-sm text-blue-700">대기중</p>
          )}
        </div>

        {/* Glucose Reading */}
        <div className="bg-gradient-to-br from-rose-50 to-rose-100 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Gauge className="w-4 h-4 text-rose-600" />
            <span className="text-xs text-rose-900">혈당</span>
          </div>
          {currentGlucose !== null ? (
            <div>
              <p className="text-rose-900">
                {currentGlucose} <span className="text-xs">mg/dL</span>
              </p>
              <p className="text-xs text-rose-700 mt-1">
                {currentGlucose < 70 ? '낮음' :
                 currentGlucose > 140 ? '높음' : '정상'}
              </p>
            </div>
          ) : (
            <p className="text-sm text-rose-700">대기중</p>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        {!isConnected ? (
          <button
            onClick={() => {
              setIsConnected(true);
              setShowMealQuestion(true);
            }}
            className="flex-1 bg-indigo-600 text-white py-4 rounded-xl hover:bg-indigo-700 transition-colors active:scale-98 touch-manipulation"
          >
            소자 연결
          </button>
        ) : (
          <>
            <button
              onClick={simulateReading}
              disabled={isReading || !mealStatus}
              className="flex-1 bg-indigo-600 text-white py-4 rounded-xl hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed active:scale-98 touch-manipulation"
            >
              {isReading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  측정 중...
                </span>
              ) : (
                '측정 시작'
              )}
            </button>
            <button
              onClick={() => {
                setIsConnected(false);
                setCurrentSodium(null);
                setCurrentGlucose(null);
                setShowMealQuestion(false);
                setMealStatus(null);
              }}
              className="px-5 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors active:scale-98 touch-manipulation"
            >
              연결 해제
            </button>
          </>
        )}
      </div>

      {/* Meal Status Question */}
      {showMealQuestion && !mealStatus && (
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-2 mb-3">
            <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-blue-900 font-semibold mb-1">식사 여부 확인</p>
              <p className="text-xs text-blue-800 leading-relaxed">
                혈당 수치를 정확히 해석하기 위해 측정 전 식사 여부를 알려주세요.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setMealStatus('fasting')}
              className="py-3 px-4 bg-white border-2 border-blue-300 text-blue-900 rounded-xl hover:bg-blue-100 transition-colors font-semibold text-sm active:scale-98"
            >
              공복 (식사 전)
            </button>
            <button
              onClick={() => setMealStatus('after-meal')}
              className="py-3 px-4 bg-white border-2 border-blue-300 text-blue-900 rounded-xl hover:bg-blue-100 transition-colors font-semibold text-sm active:scale-98"
            >
              식후 (식사 후)
            </button>
          </div>
        </div>
      )}

      {/* Meal Status Info */}
      {mealStatus && (
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-3">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <p className="text-xs text-blue-900">
              <span className="font-semibold">측정 시점:</span> {mealStatus === 'fasting' ? '공복 (식사 전)' : '식후 (식사 후)'}
              {mealStatus === 'fasting' && currentGlucose !== null && currentGlucose > 100 && (
                <span className="ml-1 text-blue-800">• 공복 혈당 기준 정상 범위는 70-100mg/dL입니다.</span>
              )}
              {mealStatus === 'after-meal' && currentGlucose !== null && currentGlucose > 140 && (
                <span className="ml-1 text-blue-800">• 식후 2시간 혈당 기준 정상 범위는 140mg/dL 이하입니다.</span>
              )}
            </p>
          </div>
        </div>
      )}

      {/* Health Status Alerts */}
      {currentSodium !== null && currentGlucose !== null && (
        <div className="mt-4 space-y-2">
          {/* Sodium Alerts */}
          {currentSodium < 137 && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-orange-900 font-semibold mb-1">혈중 나트륨 주의</p>
                  <p className="text-xs text-orange-800 leading-relaxed">
                    현재 혈중나트륨이 정상 하한({currentSodium < 135 ? '135mEq/L' : '정상 범위'})에 근접합니다. 수분 섭취를 확인하세요.
                    {currentSodium < 135 && ' 어지럼증/구토 등 증상 있으면 병원 방문을 권합니다.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentSodium > 145 && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-red-900 font-semibold mb-1">혈중 나트륨 높음</p>
                  <p className="text-xs text-red-800 leading-relaxed">
                    현재 혈중나트륨이 정상 상한(145mEq/L)을 초과했습니다. 저나트륨 식단을 유지하고 충분한 수분을 섭취하세요. 지속될 경우 병원 방문을 권합니다.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Glucose Alerts */}
          {currentGlucose < 80 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-yellow-900 font-semibold mb-1">혈당 주의</p>
                  <p className="text-xs text-yellow-800 leading-relaxed">
                    현재 혈당이 다소 낮습니다. {currentGlucose < 70 && '저혈당 증상(어지러움, 식은땀, 떨림)이 있다면 당분을 섭취하고 '}규칙적인 식사를 유지하세요.
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentGlucose > 125 && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-red-900 font-semibold mb-1">혈당 높음</p>
                  <p className="text-xs text-red-800 leading-relaxed">
                    현재 혈당이 {currentGlucose > 140 ? '정상 범위(140mg/dL)를 초과' : '당뇨 전단계 수준(126mg/dL 이상)'}입니다.
                    저GI 식단을 유지하고 규칙적인 운동을 하세요. {currentGlucose > 140 && '지속될 경우 병원 방문을 권합니다.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Normal Status */}
          {currentSodium >= 137 && currentSodium <= 145 && currentGlucose >= 80 && currentGlucose <= 125 && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-3">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-green-900 font-semibold mb-1">건강 상태 양호</p>
                  <p className="text-xs text-green-800 leading-relaxed">
                    현재 나트륨과 혈당 수치가 모두 정상 범위입니다. 건강한 생활 습관을 유지하세요.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-xl p-3">
        <p className="text-xs text-yellow-800">
          💡 실제 소자와 연동하려면 Bluetooth/USB 연결 기능이 필요합니다.
        </p>
      </div>
    </div>
  );
}