import { useState } from 'react';
import { Activity, Droplet, Gauge } from 'lucide-react';

interface DeviceSimulatorProps {
  onNewData: (sodium: number, glucose: number) => void;
}

export function DeviceSimulator({ onNewData }: DeviceSimulatorProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [currentSodium, setCurrentSodium] = useState<number | null>(null);
  const [currentGlucose, setCurrentGlucose] = useState<number | null>(null);
  const [isReading, setIsReading] = useState(false);

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
            onClick={() => setIsConnected(true)}
            className="flex-1 bg-indigo-600 text-white py-4 rounded-xl hover:bg-indigo-700 transition-colors active:scale-98 touch-manipulation"
          >
            소자 연결
          </button>
        ) : (
          <>
            <button
              onClick={simulateReading}
              disabled={isReading}
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
              }}
              className="px-5 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors active:scale-98 touch-manipulation"
            >
              연결 해제
            </button>
          </>
        )}
      </div>

      <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-xl p-3">
        <p className="text-xs text-yellow-800">
          💡 실제 소자와 연동하려면 Bluetooth/USB 연결 기능이 필요합니다.
        </p>
      </div>
    </div>
  );
}