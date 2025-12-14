import { useState, useEffect } from 'react';
import { ProfileForm } from './components/ProfileForm';
import { LifestyleForm } from './components/LifestyleForm';
import { DeviceSimulator } from './components/DeviceSimulator';
import { HealthDataChart } from './components/HealthDataChart';
import { Recommendations } from './components/Recommendations';
import { BottomNav } from './components/BottomNav';
import { AuthPage } from './components/AuthPage';
import { useAuth } from './context/AuthContext';
import { Activity, Heart, User, BarChart3, Home, LogOut } from 'lucide-react';

export interface UserProfile {
  age: number;
  height: number;
  weight: number;
  gender: string;
}

export interface Lifestyle {
  alcoholFrequency: string;
  alcoholAmount: string;
  smoking: boolean;
  exerciseFrequency: string;
}

export interface HealthData {
  timestamp: number;
  sodium: number;
  glucose: number;
}

export default function App() {
  const { authUser, logout } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [lifestyle, setLifestyle] = useState<Lifestyle | null>(null);
  const [healthData, setHealthData] = useState<HealthData[]>([]);
  const [currentStep, setCurrentStep] = useState<'profile' | 'lifestyle' | 'dashboard'>('profile');
  const [activeTab, setActiveTab] = useState<'home' | 'measure' | 'stats' | 'profile'>('home');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingLifestyle, setIsEditingLifestyle] = useState(false);

  // Show auth page if user is not logged in
  if (!authUser) {
    return <AuthPage />;
  }

  useEffect(() => {
    // Load data from localStorage
    const savedProfile = localStorage.getItem('userProfile');
    const savedLifestyle = localStorage.getItem('userLifestyle');
    const savedHealthData = localStorage.getItem('healthData');

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
      setCurrentStep('lifestyle');
    }
    if (savedLifestyle) {
      setLifestyle(JSON.parse(savedLifestyle));
      setCurrentStep('dashboard');
    }
    if (savedHealthData) {
      setHealthData(JSON.parse(savedHealthData));
    }
  }, []);

  const handleProfileSubmit = (data: UserProfile) => {
    setProfile(data);
    localStorage.setItem('userProfile', JSON.stringify(data));
    if (isEditingProfile) {
      setIsEditingProfile(false);
      setActiveTab('profile');
    } else {
      setCurrentStep('lifestyle');
    }
  };

  const handleLifestyleSubmit = (data: Lifestyle) => {
    setLifestyle(data);
    localStorage.setItem('userLifestyle', JSON.stringify(data));
    if (isEditingLifestyle) {
      setIsEditingLifestyle(false);
      setActiveTab('profile');
    } else {
      setCurrentStep('dashboard');
    }
  };

  const handleNewHealthData = (sodium: number, glucose: number) => {
    const newData: HealthData = {
      timestamp: Date.now(),
      sodium,
      glucose
    };
    const updatedData = [...healthData, newData];
    setHealthData(updatedData);
    localStorage.setItem('healthData', JSON.stringify(updatedData));
  };

  const resetProfile = () => {
    if (confirm('모든 데이터를 초기화하시겠습니까?')) {
      localStorage.clear();
      setProfile(null);
      setLifestyle(null);
      setHealthData([]);
      setCurrentStep('profile');
      setActiveTab('home');
      setIsEditingProfile(false);
      setIsEditingLifestyle(false);
    }
  };

  // Show edit forms
  if (isEditingProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-safe">
        <div className="min-h-screen flex flex-col">
          {/* Mobile Header */}
          <div className="bg-white shadow-sm pt-safe px-4 py-4 sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsEditingProfile(false)}
                className="text-indigo-600"
              >
                ← 뒤로
              </button>
              <div className="flex items-center gap-3">
                <div className="bg-indigo-600 p-2.5 rounded-xl">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-indigo-900">신상정보 수정</h1>
                  <p className="text-xs text-gray-600">정보를 업데이트하세요</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <ProfileForm onSubmit={handleProfileSubmit} initialData={profile} />
          </div>
        </div>
      </div>
    );
  }

  if (isEditingLifestyle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-safe">
        <div className="min-h-screen flex flex-col">
          {/* Mobile Header */}
          <div className="bg-white shadow-sm pt-safe px-4 py-4 sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsEditingLifestyle(false)}
                className="text-indigo-600"
              >
                ← 뒤로
              </button>
              <div className="flex items-center gap-3">
                <div className="bg-indigo-600 p-2.5 rounded-xl">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-indigo-900">생활습관 수정</h1>
                  <p className="text-xs text-gray-600">정보를 업데이트하세요</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <LifestyleForm onSubmit={handleLifestyleSubmit} initialData={lifestyle} />
          </div>
        </div>
      </div>
    );
  }

  // Show onboarding if no profile
  if (currentStep === 'profile' || currentStep === 'lifestyle') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-safe">
        <div className="min-h-screen flex flex-col">
          {/* Mobile Header */}
          <div className="bg-white shadow-sm pt-safe px-4 py-4 sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2.5 rounded-xl">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-indigo-900">헬스케어 AI</h1>
                <p className="text-xs text-gray-600">맞춤형 건강 관리</p>
              </div>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="bg-white shadow-sm px-4 py-4 mb-4">
            <div className="flex items-center justify-center gap-3">
              <div className={`flex items-center gap-2 ${currentStep === 'profile' ? 'text-indigo-600' : 'text-gray-400'}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm ${currentStep === 'profile' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>
                  1
                </div>
                <span className="text-sm">신상정보</span>
              </div>
              <div className="w-8 h-0.5 bg-gray-300"></div>
              <div className={`flex items-center gap-2 ${currentStep === 'lifestyle' ? 'text-indigo-600' : 'text-gray-400'}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm ${currentStep === 'lifestyle' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>
                  2
                </div>
                <span className="text-sm">생활습관</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-4 pb-4">
            {currentStep === 'profile' && (
              <ProfileForm onSubmit={handleProfileSubmit} initialData={profile} />
            )}

            {currentStep === 'lifestyle' && (
              <LifestyleForm onSubmit={handleLifestyleSubmit} initialData={lifestyle} />
            )}
          </div>
        </div>
      </div>
    );
  }

  // Main Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Mobile Header */}
      <div className="bg-white shadow-sm pt-safe px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2.5 rounded-xl">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-indigo-900">헬스케어 AI</h1>
              <p className="text-xs text-gray-600">안녕하세요, {profile?.gender === 'male' ? '님' : '님'}!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - with bottom nav padding */}
      <div className="pb-20 overflow-y-auto" style={{ minHeight: 'calc(100vh - 80px)' }}>
        {/* Home Tab */}
        {activeTab === 'home' && (
          <div className="px-4 py-4 space-y-4">
            <Recommendations 
              profile={profile!}
              lifestyle={lifestyle!}
              latestHealthData={healthData[healthData.length - 1]}
            />
          </div>
        )}

        {/* Measure Tab */}
        {activeTab === 'measure' && (
          <div className="px-4 py-4">
            <DeviceSimulator onNewData={handleNewHealthData} />
          </div>
        )}

        {/* Stats Tab */}
        {activeTab === 'stats' && (
          <div className="px-4 py-4">
            {healthData.length > 0 ? (
              <HealthDataChart data={healthData} />
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">아직 측정 데이터가 없습니다</p>
                <p className="text-sm text-gray-500">측정 탭에서 건강 데이터를 측정해보세요</p>
              </div>
            )}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="px-4 py-4 space-y-4">
            {/* Profile Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-gray-900">내 정보</h2>
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="text-sm text-indigo-600 hover:text-indigo-700 px-3 py-1 rounded-lg hover:bg-indigo-50 transition-colors"
                >
                  편집
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">나이</span>
                  <span className="text-gray-900">{profile?.age}세</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">성별</span>
                  <span className="text-gray-900">{profile?.gender === 'male' ? '남성' : '여성'}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">키</span>
                  <span className="text-gray-900">{profile?.height}cm</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">몸무게</span>
                  <span className="text-gray-900">{profile?.weight}kg</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">BMI</span>
                  <span className="text-gray-900">
                    {profile && (profile.weight / Math.pow(profile.height / 100, 2)).toFixed(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Lifestyle Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-gray-900">생활습관</h2>
                <button
                  onClick={() => setIsEditingLifestyle(true)}
                  className="text-sm text-indigo-600 hover:text-indigo-700 px-3 py-1 rounded-lg hover:bg-indigo-50 transition-colors"
                >
                  편집
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">음주</span>
                  <span className="text-gray-900 text-sm">
                    {lifestyle?.alcoholFrequency === 'none' ? '거의 안 마심' : 
                     lifestyle?.alcoholFrequency === 'monthly' ? '월 1-2회' :
                     lifestyle?.alcoholFrequency === 'weekly' ? '주 1-2회' :
                     lifestyle?.alcoholFrequency === 'frequent' ? '주 3회 이상' : '거의 매일'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">흡연</span>
                  <span className="text-gray-900">{lifestyle?.smoking ? '흡연' : '비흡연'}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">운동</span>
                  <span className="text-gray-900 text-sm">
                    {lifestyle?.exerciseFrequency === 'none' ? '거의 안 함' :
                     lifestyle?.exerciseFrequency === 'rarely' ? '월 1-2회' :
                     lifestyle?.exerciseFrequency === 'sometimes' ? '주 1-2회' :
                     lifestyle?.exerciseFrequency === 'regular' ? '주 3-4회' : '주 5회 이상'}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-gray-900 mb-4">측정 통계</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-indigo-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-indigo-700 mb-1">총 측정</p>
                  <p className="text-indigo-900">{healthData.length}회</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-green-700 mb-1">최근 측정</p>
                  <p className="text-green-900 text-xs">
                    {healthData.length > 0 
                      ? new Date(healthData[healthData.length - 1].timestamp).toLocaleDateString('ko-KR')
                      : '없음'}
                  </p>
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={() => {
                if (confirm('로그아웃 하시겠습니까?')) {
                  logout();
                }
              }}
              className="w-full bg-indigo-50 text-indigo-600 py-3 rounded-xl hover:bg-indigo-100 transition-colors border border-indigo-200 flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              로그아웃
            </button>

            {/* Reset Button */}
            <button
              onClick={resetProfile}
              className="w-full bg-red-50 text-red-600 py-3 rounded-xl hover:bg-red-100 transition-colors border border-red-200"
            >
              데이터 초기화
            </button>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}