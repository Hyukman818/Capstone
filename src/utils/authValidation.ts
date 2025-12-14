// TODO: Replace with secure backend authentication when backend is implemented
// This is a frontend-only implementation for UI/UX testing

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export interface PasswordValidationResult {
  valid: boolean;
  feedback: string[];
}

// Email validation with regex
export function validateEmail(email: string): ValidationResult {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    return { valid: false, error: '이메일을 입력해주세요' };
  }

  if (!emailRegex.test(email)) {
    return { valid: false, error: '이메일 형식이 올바르지 않습니다' };
  }

  return { valid: true };
}

// Password validation with requirements
export function validatePassword(password: string): PasswordValidationResult {
  const feedback: string[] = [];

  if (!password) {
    return { valid: false, feedback: ['비밀번호를 입력해주세요'] };
  }

  if (password.length < 8) {
    feedback.push('비밀번호는 최소 8자 이상이어야 합니다');
  }

  if (!/[A-Z]/.test(password)) {
    feedback.push('대문자를 최소 1개 포함해야 합니다');
  }

  if (!/[0-9]/.test(password)) {
    feedback.push('숫자를 최소 1개 포함해야 합니다');
  }

  return {
    valid: feedback.length === 0,
    feedback
  };
}

// Check if passwords match
export function checkPasswordMatch(password: string, confirmPassword: string): ValidationResult {
  if (!confirmPassword) {
    return { valid: false, error: '비밀번호 확인을 입력해주세요' };
  }

  if (password !== confirmPassword) {
    return { valid: false, error: '비밀번호가 일치하지 않습니다' };
  }

  return { valid: true };
}

// Simple password hashing for frontend-only implementation
// TODO: Replace with secure backend hashing (bcrypt, argon2, etc.) when backend is implemented
export function hashPassword(password: string): string {
  // Using base64 encoding for frontend testing only
  // This is NOT secure for production use
  return btoa(password);
}

// Compare password with stored hash
export function comparePasswords(password: string, hash: string): boolean {
  const hashedInput = hashPassword(password);
  return hashedInput === hash;
}

// Get password strength indicator
export function getPasswordStrength(password: string): {
  strength: 'weak' | 'medium' | 'strong';
  color: string;
  text: string;
} {
  if (!password) {
    return { strength: 'weak', color: 'gray', text: '' };
  }

  const validation = validatePassword(password);

  if (validation.valid) {
    // Check for additional complexity
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLong = password.length >= 12;

    if (hasSpecialChar && isLong) {
      return { strength: 'strong', color: 'green', text: '강력한 비밀번호' };
    }
    return { strength: 'medium', color: 'yellow', text: '보통 비밀번호' };
  }

  return { strength: 'weak', color: 'red', text: '약한 비밀번호' };
}
