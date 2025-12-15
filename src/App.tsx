import { useState, useEffect } from 'react';
import { ProfileForm } from './components/ProfileForm';
import { LifestyleForm } from './components/LifestyleForm';
import { DeviceSimulator } from './components/DeviceSimulator';
import { HealthDataChart } from './components/HealthDataChart';
import { Recommendations } from './components/Recommendations';
import { BottomNav } from './components/BottomNav';
import { AuthPage } from './components/AuthPage';
import { NearbyHospitalMap } from './components/NearbyHospitalMap';
import { useAuth } from './context/AuthContext';
import { Activity, Heart, User, BarChart3, Home, LogOut, TrendingUp } from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState<'home' | 'measure' | 'stats' | 'hospital' | 'profile'>('home');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingLifestyle, setIsEditingLifestyle] = useState(false);

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

  // Show auth page if user is not logged in
  if (!authUser) {
    return <AuthPage />;
  }

  // Show edit forms
  if (isEditingProfile) {
    return (
      <div className="app-container">
        <div className="min-h-screen flex flex-col">
          {/* Mobile Header */}
          <div className="bs-card sticky top-0 z-10 rounded-none border-b border-gray-100">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsEditingProfile(false)}
                className="text-gray-700 font-medium"
              >
                ← 뒤로
              </button>
              <div className="flex items-center gap-3">
                <div className="bs-icon-container-sm bs-gradient-purple">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-base font-semibold bs-text-primary">신상정보 수정</h1>
                  <p className="text-xs bs-text-secondary">정보를 업데이트하세요</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 bs-scroll-container bs-container">
            <div className="py-4">
              <ProfileForm onSubmit={handleProfileSubmit} initialData={profile} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isEditingLifestyle) {
    return (
      <div className="app-container">
        <div className="min-h-screen flex flex-col">
          {/* Mobile Header */}
          <div className="bs-card sticky top-0 z-10 rounded-none border-b border-gray-100">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsEditingLifestyle(false)}
                className="text-gray-700 font-medium"
              >
                ← 뒤로
              </button>
              <div className="flex items-center gap-3">
                <div className="bs-icon-container-sm bs-gradient-green">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-base font-semibold bs-text-primary">생활습관 수정</h1>
                  <p className="text-xs bs-text-secondary">정보를 업데이트하세요</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 bs-scroll-container bs-container">
            <div className="py-4">
              <LifestyleForm onSubmit={handleLifestyleSubmit} initialData={lifestyle} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show onboarding if no profile
  if (currentStep === 'profile' || currentStep === 'lifestyle') {
    return (
      <div className="app-container">
        <div className="min-h-screen flex flex-col">
          {/* Mobile Header */}
          <div className="bs-card sticky top-0 z-10 rounded-none border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="bs-icon-container-sm bs-gradient-purple">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold bs-text-primary">헬스케어 AI</h1>
                <p className="text-xs bs-text-secondary">맞춤형 건강 관리</p>
              </div>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="bs-card rounded-none border-b border-gray-100">
            <div className="flex items-center justify-center gap-3">
              <div className={`flex items-center gap-2 ${currentStep === 'profile' ? 'text-purple-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${currentStep === 'profile' ? 'bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-md' : 'bg-gray-200 text-gray-600'}`}>
                  1
                </div>
                <span className="text-sm font-medium">신상정보</span>
              </div>
              <div className="w-10 h-1 bg-gray-200 rounded-full"></div>
              <div className={`flex items-center gap-2 ${currentStep === 'lifestyle' ? 'text-purple-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${currentStep === 'lifestyle' ? 'bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-md' : 'bg-gray-200 text-gray-600'}`}>
                  2
                </div>
                <span className="text-sm font-medium">생활습관</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 bs-scroll-container bs-container">
            <div className="py-4">
              {currentStep === 'profile' && (
                <ProfileForm onSubmit={handleProfileSubmit} initialData={profile} />
              )}

              {currentStep === 'lifestyle' && (
                <LifestyleForm onSubmit={handleLifestyleSubmit} initialData={lifestyle} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Calculate BMI for display
  const bmi = profile ? (profile.weight / Math.pow(profile.height / 100, 2)).toFixed(1) : '0';
  const latestData = healthData[healthData.length - 1];

  // Main Dashboard
  return (
    <div className="app-container">
      {/* Mobile Header */}
      <div className="bs-card sticky top-0 z-10 rounded-none border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bs-icon-container bs-gradient-purple">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold bs-text-primary">헬스케어 AI</h1>
              <p className="text-xs bs-text-secondary">안녕하세요, {profile?.gender === 'male' ? '님' : '님'}!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - with bottom nav padding */}
      <div className="bs-scroll-container">
        {/* Home Tab */}
        {activeTab === 'home' && (
          <div className="bs-container py-4 space-y-4">
            {/* Health Summary Cards */}
            {latestData && (
              <div className="grid grid-cols-2 gap-3 mb-4">
                {/* Sodium Card */}
                <div className="bs-card bs-gradient-blue">
                  <div className="flex flex-col h-full">
                    <p className="text-white text-opacity-90 text-xs font-medium mb-2">나트륨</p>
                    <p className="text-white text-2xl font-bold mb-auto">{latestData.sodium}</p>
                    <p className="text-white text-opacity-80 text-xs">mEq/L</p>
                  </div>
                </div>

                {/* Glucose Card */}
                <div className="bs-card bs-gradient-orange">
                  <div className="flex flex-col h-full">
                    <p className="text-white text-opacity-90 text-xs font-medium mb-2">혈당</p>
                    <p className="text-white text-2xl font-bold mb-auto">{latestData.glucose}</p>
                    <p className="text-white text-opacity-80 text-xs">mg/dL</p>
                  </div>
                </div>
              </div>
            )}

            <Recommendations
              profile={profile!}
              lifestyle={lifestyle!}
              latestHealthData={latestData}
              onShowMap={() => setActiveTab('hospital')}
            />
          </div>
        )}

        {/* Measure Tab */}
        {activeTab === 'measure' && (
          <div className="bs-container py-4">
            <DeviceSimulator onNewData={handleNewHealthData} />
          </div>
        )}

        {/* Stats Tab */}
        {activeTab === 'stats' && (
          <div className="bs-container py-4">
            {healthData.length > 0 ? (
              <HealthDataChart data={healthData} />
            ) : (
              <div className="bs-card text-center py-12">
                <div className="bs-icon-container mx-auto mb-4 bg-gray-100">
                  <BarChart3 className="w-6 h-6 text-gray-400" />
                </div>
                <p className="bs-text-primary font-semibold mb-1">아직 측정 데이터가 없습니다</p>
                <p className="text-sm bs-text-secondary">측정 탭에서 건강 데이터를 측정해보세요</p>
              </div>
            )}
          </div>
        )}

        {/* Hospital Tab */}
        {activeTab === 'hospital' && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 40 }}>
            <NearbyHospitalMap onClose={() => setActiveTab('home')} />
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bs-container py-4 space-y-3">
            {/* BMI Card */}
            <div className="bs-card">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bs-icon-container-sm bs-gradient-purple">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs bs-text-secondary">체질량지수</p>
                    <p className="text-sm font-medium bs-text-primary">BMI</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="bs-amount-sm">{bmi}</p>
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="bs-card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="bs-section-title mb-0">내 정보</h2>
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="text-sm font-semibold px-3 py-1.5 rounded-lg transition-colors"
                  style={{ color: 'var(--banksalad-primary)', background: 'rgba(108, 92, 231, 0.08)' }}
                >
                  편집
                </button>
              </div>
              <div className="space-y-0">
                <div className="bs-list-item">
                  <span className="bs-text-secondary text-sm">나이</span>
                  <span className="bs-text-primary font-medium">{profile?.age}세</span>
                </div>
                <div className="bs-list-item">
                  <span className="bs-text-secondary text-sm">성별</span>
                  <span className="bs-text-primary font-medium">{profile?.gender === 'male' ? '남성' : '여성'}</span>
                </div>
                <div className="bs-list-item">
                  <span className="bs-text-secondary text-sm">키</span>
                  <span className="bs-text-primary font-medium">{profile?.height}cm</span>
                </div>
                <div className="bs-list-item">
                  <span className="bs-text-secondary text-sm">몸무게</span>
                  <span className="bs-text-primary font-medium">{profile?.weight}kg</span>
                </div>
              </div>
            </div>

            {/* Lifestyle Info */}
            <div className="bs-card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="bs-section-title mb-0">생활습관</h2>
                <button
                  onClick={() => setIsEditingLifestyle(true)}
                  className="text-sm font-semibold px-3 py-1.5 rounded-lg transition-colors"
                  style={{ color: 'var(--banksalad-primary)', background: 'rgba(108, 92, 231, 0.08)' }}
                >
                  편집
                </button>
              </div>
              <div className="space-y-0">
                <div className="bs-list-item">
                  <span className="bs-text-secondary text-sm">음주</span>
                  <span className="bs-text-primary font-medium text-sm">
                    {lifestyle?.alcoholFrequency === 'none' ? '거의 안 마심' :
                     lifestyle?.alcoholFrequency === 'monthly' ? '월 1-2회' :
                     lifestyle?.alcoholFrequency === 'weekly' ? '주 1-2회' :
                     lifestyle?.alcoholFrequency === 'frequent' ? '주 3회 이상' : '거의 매일'}
                  </span>
                </div>
                <div className="bs-list-item">
                  <span className="bs-text-secondary text-sm">흡연</span>
                  <span className="bs-text-primary font-medium">{lifestyle?.smoking ? '흡연' : '비흡연'}</span>
                </div>
                <div className="bs-list-item">
                  <span className="bs-text-secondary text-sm">운동</span>
                  <span className="bs-text-primary font-medium text-sm">
                    {lifestyle?.exerciseFrequency === 'none' ? '거의 안 함' :
                     lifestyle?.exerciseFrequency === 'rarely' ? '월 1-2회' :
                     lifestyle?.exerciseFrequency === 'sometimes' ? '주 1-2회' :
                     lifestyle?.exerciseFrequency === 'regular' ? '주 3-4회' : '주 5회 이상'}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bs-card">
              <h2 className="bs-section-title">측정 통계</h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl text-center" style={{ background: 'rgba(108, 92, 231, 0.08)' }}>
                  <p className="text-xs font-medium mb-2" style={{ color: 'var(--banksalad-primary)' }}>총 측정</p>
                  <p className="text-2xl font-bold" style={{ color: 'var(--banksalad-primary)' }}>{healthData.length}</p>
                  <p className="text-xs bs-text-tertiary mt-1">회</p>
                </div>
                <div className="p-4 rounded-xl text-center" style={{ background: 'rgba(0, 210, 160, 0.08)' }}>
                  <p className="text-xs font-medium mb-2" style={{ color: 'var(--banksalad-success)' }}>최근 측정</p>
                  <p className="text-xs font-semibold" style={{ color: 'var(--banksalad-success)' }}>
                    {healthData.length > 0
                      ? new Date(healthData[healthData.length - 1].timestamp).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })
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
              className="w-full bs-touch-button text-white font-semibold"
              style={{ background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)' }}
            >
              <LogOut className="w-5 h-5" />
              로그아웃
            </button>

            {/* Reset Button */}
            <button
              onClick={resetProfile}
              className="w-full bs-touch-button font-semibold"
              style={{ color: 'var(--banksalad-danger)', background: 'rgba(255, 107, 107, 0.08)' }}
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
