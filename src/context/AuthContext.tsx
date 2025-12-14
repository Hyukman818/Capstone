import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { validateEmail, validatePassword, hashPassword, comparePasswords } from '../utils/authValidation';

// TODO: Replace with backend API integration when backend is implemented
// This is a frontend-only implementation using localStorage

export interface AuthUser {
  email: string;
  registeredAt: number;
}

interface RegisteredUser {
  email: string;
  password: string;
  registeredAt: number;
}

interface AuthContextType {
  authUser: AuthUser | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load auth user from localStorage on mount
  useEffect(() => {
    try {
      const savedAuthUser = localStorage.getItem('authUser');
      if (savedAuthUser) {
        setAuthUser(JSON.parse(savedAuthUser));
      }
    } catch (err) {
      console.error('Failed to load auth user:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get registered users from localStorage
  const getRegisteredUsers = (): Record<string, RegisteredUser> => {
    try {
      const users = localStorage.getItem('registeredUsers');
      return users ? JSON.parse(users) : {};
    } catch (err) {
      console.error('Failed to load registered users:', err);
      return {};
    }
  };

  // Save registered users to localStorage
  const saveRegisteredUsers = (users: Record<string, RegisteredUser>) => {
    try {
      localStorage.setItem('registeredUsers', JSON.stringify(users));
    } catch (err) {
      console.error('Failed to save registered users:', err);
    }
  };

  // Signup function
  const signup = async (email: string, password: string): Promise<void> => {
    setError(null);
    setIsLoading(true);

    try {
      // Validate email
      const emailValidation = validateEmail(email);
      if (!emailValidation.valid) {
        throw new Error(emailValidation.error);
      }

      // Validate password
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.valid) {
        throw new Error(passwordValidation.feedback.join(', '));
      }

      // Check if email already exists
      const registeredUsers = getRegisteredUsers();
      if (registeredUsers[email.toLowerCase()]) {
        throw new Error('이미 가입된 이메일입니다');
      }

      // Create new user
      const newUser: RegisteredUser = {
        email: email.toLowerCase(),
        password: hashPassword(password),
        registeredAt: Date.now()
      };

      // Save to registered users
      registeredUsers[email.toLowerCase()] = newUser;
      saveRegisteredUsers(registeredUsers);

      // Auto-login after signup
      const authUserData: AuthUser = {
        email: email.toLowerCase(),
        registeredAt: newUser.registeredAt
      };

      setAuthUser(authUserData);
      localStorage.setItem('authUser', JSON.stringify(authUserData));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '회원가입에 실패했습니다';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Login function
  const login = async (email: string, password: string): Promise<void> => {
    setError(null);
    setIsLoading(true);

    try {
      // Validate email format
      const emailValidation = validateEmail(email);
      if (!emailValidation.valid) {
        throw new Error('이메일 또는 비밀번호가 올바르지 않습니다');
      }

      // Get registered users
      const registeredUsers = getRegisteredUsers();
      const user = registeredUsers[email.toLowerCase()];

      // Check if user exists and password matches
      if (!user || !comparePasswords(password, user.password)) {
        throw new Error('이메일 또는 비밀번호가 올바르지 않습니다');
      }

      // Set auth user
      const authUserData: AuthUser = {
        email: user.email,
        registeredAt: user.registeredAt
      };

      setAuthUser(authUserData);
      localStorage.setItem('authUser', JSON.stringify(authUserData));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '로그인에 실패했습니다';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setAuthUser(null);
    localStorage.removeItem('authUser');
    setError(null);
  };

  // Clear error function
  const clearError = () => {
    setError(null);
  };

  const value: AuthContextType = {
    authUser,
    isLoading,
    error,
    login,
    signup,
    logout,
    clearError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
