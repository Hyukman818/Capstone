import { useState } from 'react';
import { UserPlus, CheckCircle2, XCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { validatePassword, checkPasswordMatch, getPasswordStrength } from '../utils/authValidation';

interface SignupFormProps {
  onSwitchToLogin: () => void;
}

export function SignupForm({ onSwitchToLogin }: SignupFormProps) {
  const { signup } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const passwordValidation = validatePassword(password);
  const passwordStrength = getPasswordStrength(password);
  const passwordsMatch = password && confirmPassword ? checkPasswordMatch(password, confirmPassword) : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate password
    if (!passwordValidation.valid) {
      setError(passwordValidation.feedback.join(', '));
      return;
    }

    // Check passwords match
    const matchResult = checkPasswordMatch(password, confirmPassword);
    if (!matchResult.valid) {
      setError(matchResult.error || '비밀번호가 일치하지 않습니다');
      return;
    }

    setIsLoading(true);

    try {
      await signup(email, password);
      // Signup successful - AuthContext will handle the state update
    } catch (err) {
      setError(err instanceof Error ? err.message : '회원가입에 실패했습니다');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-indigo-100 p-2.5 rounded-xl">
          <UserPlus className="w-5 h-5 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-indigo-900">회원가입</h2>
          <p className="text-gray-600 text-xs">새 계정을 만드세요</p>
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

          {/* Password strength indicator */}
          {password && (
            <div className="mt-2">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      passwordStrength.strength === 'weak'
                        ? 'w-1/3 bg-red-500'
                        : passwordStrength.strength === 'medium'
                        ? 'w-2/3 bg-yellow-500'
                        : 'w-full bg-green-500'
                    }`}
                  />
                </div>
                <span
                  className={`text-xs ${
                    passwordStrength.strength === 'weak'
                      ? 'text-red-600'
                      : passwordStrength.strength === 'medium'
                      ? 'text-yellow-600'
                      : 'text-green-600'
                  }`}
                >
                  {passwordStrength.text}
                </span>
              </div>

              {/* Password requirements */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  {password.length >= 8 ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5 text-gray-400" />
                  )}
                  <span className={password.length >= 8 ? 'text-green-600' : 'text-gray-600'}>
                    최소 8자 이상
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  {/[A-Z]/.test(password) ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5 text-gray-400" />
                  )}
                  <span className={/[A-Z]/.test(password) ? 'text-green-600' : 'text-gray-600'}>
                    대문자 1개 이상
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  {/[0-9]/.test(password) ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5 text-gray-400" />
                  )}
                  <span className={/[0-9]/.test(password) ? 'text-green-600' : 'text-gray-600'}>
                    숫자 1개 이상
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-2 text-sm">비밀번호 확인</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-base"
            placeholder="비밀번호를 다시 입력하세요"
            required
            disabled={isLoading}
          />

          {/* Password match indicator */}
          {confirmPassword && (
            <div className="mt-2">
              {passwordsMatch?.valid ? (
                <div className="flex items-center gap-2 text-xs text-green-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>비밀번호가 일치합니다</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-xs text-red-600">
                  <XCircle className="w-3.5 h-3.5" />
                  <span>{passwordsMatch?.error || '비밀번호가 일치하지 않습니다'}</span>
                </div>
              )}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || !passwordValidation.valid || !passwordsMatch?.valid}
          className="w-full bg-indigo-600 text-white py-4 rounded-xl hover:bg-indigo-700 transition-colors active:scale-98 touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? '가입 중...' : '회원가입'}
        </button>

        <div className="text-center pt-2">
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-sm text-indigo-600 hover:text-indigo-700 hover:underline"
          >
            이미 계정이 있으신가요? 로그인
          </button>
        </div>
      </form>
    </div>
  );
}
