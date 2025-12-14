import { useState } from 'react';
import { Heart } from 'lucide-react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';

export function AuthPage() {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-safe">
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-sm pt-safe px-4 py-6">
          <div className="flex items-center justify-center gap-3">
            <div className="bg-indigo-600 p-3 rounded-xl">
              <Heart className="w-7 h-7 text-white" />
            </div>
            <div className="text-center">
              <h1 className="text-indigo-900 text-xl">헬스케어 AI</h1>
              <p className="text-xs text-gray-600">맞춤형 건강 관리</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white shadow-sm px-4 py-3 mb-6">
          <div className="flex gap-2 max-w-md mx-auto">
            <button
              onClick={() => setAuthMode('login')}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm transition-all ${
                authMode === 'login'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              로그인
            </button>
            <button
              onClick={() => setAuthMode('signup')}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm transition-all ${
                authMode === 'signup'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              회원가입
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex items-start justify-center px-4 pt-4 pb-8">
          <div className="w-full max-w-md">
            {authMode === 'login' ? (
              <LoginForm onSwitchToSignup={() => setAuthMode('signup')} />
            ) : (
              <SignupForm onSwitchToLogin={() => setAuthMode('login')} />
            )}

            {/* Info Text */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-600">
                가입하시면 맞춤형 건강 관리 서비스를 이용하실 수 있습니다
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
