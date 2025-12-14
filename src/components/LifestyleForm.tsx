import { useState } from 'react';
import { Lifestyle } from '../App';
import { Coffee } from 'lucide-react';

interface LifestyleFormProps {
  onSubmit: (data: Lifestyle) => void;
  initialData: Lifestyle | null;
}

export function LifestyleForm({ onSubmit, initialData }: LifestyleFormProps) {
  const [formData, setFormData] = useState<Lifestyle>(
    initialData || {
      alcoholFrequency: 'none',
      alcoholAmount: 'none',
      smoking: false,
      exerciseFrequency: 'none'
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-green-100 p-2.5 rounded-xl">
          <Coffee className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <h2 className="text-gray-900">생활습관 입력</h2>
          <p className="text-gray-600 text-xs">일상 생활 패턴을 입력해주세요</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-700 mb-2 text-sm">음주 빈도</label>
          <select
            value={formData.alcoholFrequency}
            onChange={(e) => setFormData({ ...formData, alcoholFrequency: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-base appearance-none bg-white"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", backgroundPosition: "right 0.5rem center", backgroundRepeat: "no-repeat", backgroundSize: "1.5em 1.5em" }}
          >
            <option value="none">거의 안 마심</option>
            <option value="monthly">월 1-2회</option>
            <option value="weekly">주 1-2회</option>
            <option value="frequent">주 3회 이상</option>
            <option value="daily">거의 매일</option>
          </select>
        </div>

        {formData.alcoholFrequency !== 'none' && (
          <div>
            <label className="block text-gray-700 mb-2 text-sm">1회 음주량</label>
            <select
              value={formData.alcoholAmount}
              onChange={(e) => setFormData({ ...formData, alcoholAmount: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-base appearance-none bg-white"
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", backgroundPosition: "right 0.5rem center", backgroundRepeat: "no-repeat", backgroundSize: "1.5em 1.5em" }}
            >
              <option value="light">1-2잔</option>
              <option value="moderate">3-4잔</option>
              <option value="heavy">5잔 이상</option>
            </select>
          </div>
        )}

        <div>
          <label className="block text-gray-700 mb-2 text-sm">흡연 여부</label>
          <div className="flex gap-3">
            <label className="flex-1 cursor-pointer">
              <input
                type="radio"
                name="smoking"
                checked={!formData.smoking}
                onChange={() => setFormData({ ...formData, smoking: false })}
                className="hidden"
              />
              <div className={`py-3 px-4 rounded-xl border-2 transition-all text-center ${
                !formData.smoking 
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-900' 
                  : 'border-gray-300 text-gray-700'
              }`}>
                비흡연
              </div>
            </label>
            <label className="flex-1 cursor-pointer">
              <input
                type="radio"
                name="smoking"
                checked={formData.smoking}
                onChange={() => setFormData({ ...formData, smoking: true })}
                className="hidden"
              />
              <div className={`py-3 px-4 rounded-xl border-2 transition-all text-center ${
                formData.smoking 
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-900' 
                  : 'border-gray-300 text-gray-700'
              }`}>
                흡연
              </div>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-2 text-sm">운동 빈도</label>
          <select
            value={formData.exerciseFrequency}
            onChange={(e) => setFormData({ ...formData, exerciseFrequency: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-base appearance-none bg-white"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", backgroundPosition: "right 0.5rem center", backgroundRepeat: "no-repeat", backgroundSize: "1.5em 1.5em" }}
          >
            <option value="none">거의 안 함</option>
            <option value="rarely">월 1-2회</option>
            <option value="sometimes">주 1-2회</option>
            <option value="regular">주 3-4회</option>
            <option value="frequent">주 5회 이상</option>
          </select>
        </div>

        {/* Summary */}
        <div className="bg-green-50 rounded-xl p-4 space-y-2">
          <p className="text-sm text-gray-600">입력 요약</p>
          <div className="space-y-1">
            <p className="text-xs text-gray-700">
              • 음주: {formData.alcoholFrequency === 'none' ? '거의 안 마심' : 
                      formData.alcoholFrequency === 'monthly' ? '월 1-2회' :
                      formData.alcoholFrequency === 'weekly' ? '주 1-2회' :
                      formData.alcoholFrequency === 'frequent' ? '주 3회 이상' : '거의 매일'}
            </p>
            <p className="text-xs text-gray-700">
              • 흡연: {formData.smoking ? '흡연' : '비흡연'}
            </p>
            <p className="text-xs text-gray-700">
              • 운동: {formData.exerciseFrequency === 'none' ? '거의 안 함' :
                      formData.exerciseFrequency === 'rarely' ? '월 1-2회' :
                      formData.exerciseFrequency === 'sometimes' ? '주 1-2회' :
                      formData.exerciseFrequency === 'regular' ? '주 3-4회' : '주 5회 이상'}
            </p>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-4 rounded-xl hover:bg-indigo-700 transition-colors active:scale-98 touch-manipulation"
        >
          완료
        </button>
      </form>
    </div>
  );
}