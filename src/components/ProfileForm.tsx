import { useState } from 'react';
import { UserProfile } from '../App';
import { User } from 'lucide-react';

interface ProfileFormProps {
  onSubmit: (data: UserProfile) => void;
  initialData: UserProfile | null;
}

export function ProfileForm({ onSubmit, initialData }: ProfileFormProps) {
  const [formData, setFormData] = useState<UserProfile>(
    initialData || {
      age: 30,
      height: 170,
      weight: 70,
      gender: 'male'
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-indigo-100 p-2.5 rounded-xl">
          <User className="w-5 h-5 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-indigo-900">신상정보 입력</h2>
          <p className="text-gray-600 text-xs">기본 건강 정보를 입력해주세요</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-700 mb-2 text-sm">나이 (세)</label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-base"
            min="1"
            max="120"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2 text-sm">성별</label>
          <div className="flex gap-3">
            <label className="flex-1 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="hidden"
              />
              <div className={`py-3 px-4 rounded-xl border-2 transition-all text-center ${
                formData.gender === 'male' 
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-900' 
                  : 'border-gray-300 text-gray-700'
              }`}>
                남성
              </div>
            </label>
            <label className="flex-1 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="hidden"
              />
              <div className={`py-3 px-4 rounded-xl border-2 transition-all text-center ${
                formData.gender === 'female' 
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-900' 
                  : 'border-gray-300 text-gray-700'
              }`}>
                여성
              </div>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-2 text-sm">키 (cm)</label>
          <input
            type="number"
            value={formData.height}
            onChange={(e) => setFormData({ ...formData, height: Number(e.target.value) })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-base"
            min="100"
            max="250"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2 text-sm">몸무게 (kg)</label>
          <input
            type="number"
            value={formData.weight}
            onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-base"
            min="30"
            max="300"
            required
          />
        </div>

        {/* BMI Display */}
        <div className="bg-indigo-50 rounded-xl p-4">
          <p className="text-sm text-gray-600 mb-1">BMI (체질량지수)</p>
          <p className="text-indigo-900">
            {(formData.weight / Math.pow(formData.height / 100, 2)).toFixed(1)}
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-4 rounded-xl hover:bg-indigo-700 transition-colors active:scale-98 touch-manipulation"
        >
          다음 단계
        </button>
      </form>
    </div>
  );
}