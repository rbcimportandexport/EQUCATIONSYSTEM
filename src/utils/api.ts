// API utility for making authenticated requests to the backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getToken = (): string | null => {
  return localStorage.getItem('rbc_auth_token');
};

const setToken = (token: string): void => {
  localStorage.setItem('rbc_auth_token', token);
};

const removeToken = (): void => {
  localStorage.removeItem('rbc_auth_token');
};

interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  token?: string;
  user?: AuthUser;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  country?: string;
  role: 'student' | 'admin';
  avatar?: string;
  progressPercentage: number;
  lastLogin?: string;
  createdAt?: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  country?: string;
  role?: 'student' | 'admin';
}

interface LoginData {
  email: string;
  password: string;
}

const apiRequest = async <T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: Record<string, unknown>
): Promise<ApiResponse<T>> => {
  const token = getToken();
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const config: RequestInit = {
    method,
    headers,
  };
  
  if (body && method !== 'GET') {
    config.body = JSON.stringify(body);
  }
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  const data = await response.json();
  
  return data;
};

// ─── Auth API functions ──────────────────────────────────────────────────────

export const authApi = {
  // Register new user
  register: async (data: RegisterData): Promise<{ success: boolean; message: string; user?: AuthUser; token?: string }> => {
    const result = await apiRequest<AuthUser>('/auth/register', 'POST', data as Record<string, unknown>);
    if (result.success && result.token) {
      setToken(result.token);
    }
    return result;
  },

  // Login user
  login: async (data: LoginData): Promise<{ success: boolean; message: string; user?: AuthUser; token?: string }> => {
    const result = await apiRequest<AuthUser>('/auth/login', 'POST', data as Record<string, unknown>);
    if (result.success && result.token) {
      setToken(result.token);
    }
    return result;
  },

  // Get current user
  getMe: async (): Promise<{ success: boolean; user?: AuthUser }> => {
    return await apiRequest<AuthUser>('/auth/me');
  },

  // Update profile
  updateProfile: async (data: Partial<AuthUser>): Promise<{ success: boolean; message: string; user?: AuthUser }> => {
    return await apiRequest<AuthUser>('/auth/update-profile', 'PUT', data as Record<string, unknown>);
  },

  // Change password
  changePassword: async (currentPassword: string, newPassword: string): Promise<{ success: boolean; message: string }> => {
    return await apiRequest('/auth/change-password', 'PUT', { currentPassword, newPassword });
  },

  // Logout
  logout: async (): Promise<void> => {
    try {
      await apiRequest('/auth/logout', 'POST');
    } catch {
      // Ignore errors on logout
    } finally {
      removeToken();
    }
  },

  // Check if user is logged in (has valid token)
  isLoggedIn: (): boolean => {
    return !!getToken();
  },

  // Check backend health
  checkHealth: async (): Promise<boolean> => {
    try {
      const result = await apiRequest('/health');
      return result.success === true;
    } catch {
      return false;
    }
  }
};

export { getToken, setToken, removeToken };
