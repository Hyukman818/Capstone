import { useState } from 'react';
import { LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface LoginFormProps {
  onSwitchToSignup: () => void;
}

export function LoginForm({ onSwitchToSignup }: LoginFormProps) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login(email, password);
      // Login successful - AuthContext will handle the state update
    } catch (err) {
      setError(err instanceof Error ? err.message : '로그인에 실패했습니다');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-indigo-100 p-2.5 rounded-xl">
          <LogIn className="w-5 h-5 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-indigo-900">로그인</h2>
          <p className="text-gray-600 text-xs">계정에 로그인하세요</p>
        </div>
      </div>

      {error && (
        <div className="mb-5 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-700 mb-2 text-sm">이메일</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-base"
            placeholder="example@email.com"
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2 text-sm">비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-base"
            placeholder="비밀번호를 입력하세요"
            required
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-600 text-white py-4 rounded-xl hover:bg-indigo-700 transition-colors active:scale-98 touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? '로그인 중...' : '로그인'}
        </button>

        <div className="text-center pt-2">
          <button
            type="button"
            onClick={onSwitchToSignup}
            className="text-sm text-indigo-600 hover:text-indigo-700 hover:underline"
          >
            계정이 없으신가요? 회원가입
          </button>
        </div>
      </form>
    </div>
  );
}
