import type { Lesson } from './data';

// API utility for making authenticated requests to the backend
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'https://equcationsystem-self.vercel.app/api'
  : '/api';

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
  otp?: string;
}

interface LoginData {
  email: string;
  password: string;
}

const apiRequest = async <T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: any
): Promise<ApiResponse<T>> => {
  const token = getToken();
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache'
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
  
  const separator = endpoint.includes('?') ? '&' : '?';
  const url = `${API_BASE_URL}${endpoint}${method === 'GET' ? `${separator}_t=${Date.now()}` : ''}`;
  const response = await fetch(url, config);
  const data = await response.json();
  
  return data;
};

// ─── Auth API functions ──────────────────────────────────────────────────────

export const authApi = {
  // Register new user
  register: async (data: RegisterData): Promise<{ success: boolean; message: string; user?: AuthUser; token?: string }> => {
    const result = await apiRequest<AuthUser>('/auth/register', 'POST', data);
    if (result.success && result.token) {
      setToken(result.token);
    }
    return result;
  },

  // Login user
  login: async (data: LoginData): Promise<{ success: boolean; message: string; user?: AuthUser; token?: string }> => {
    const result = await apiRequest<AuthUser>('/auth/login', 'POST', data);
    if (result.success && result.token) {
      setToken(result.token);
    }
    return result;
  },

  // Send OTP to email
  sendOtp: async (email: string, type: 'register' | 'forgot_password' = 'register'): Promise<{ success: boolean; message: string }> => {
    return await apiRequest('/auth/send-otp', 'POST', { email, type });
  },

  // Verify OTP
  verifyOtp: async (email: string, otp: string): Promise<{ success: boolean; message: string }> => {
    return await apiRequest('/auth/verify-otp', 'POST', { email, otp });
  },

  // Get current user
  getMe: async (): Promise<{ success: boolean; user?: AuthUser }> => {
    return await apiRequest<AuthUser>('/auth/me');
  },

  // Update profile
  updateProfile: async (data: Partial<AuthUser>): Promise<{ success: boolean; message: string; user?: AuthUser }> => {
    return await apiRequest<AuthUser>('/auth/update-profile', 'PUT', data);
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

export const usersApi = {
  // Fetch all users from MongoDB Atlas backend
  getAll: async (): Promise<{ success: boolean; users?: AuthUser[]; message?: string }> => {
    return await apiRequest('/auth/users');
  }
};

export interface CustomVideoResponse {
  id: string;
  lessonId: string;
  moduleId: string;
  title: string;
  duration: number;
  uploadedAt: string;
  hasVideoData: boolean;
  videoData?: string;
  thumbnailData?: string;
}

export const videosApi = {
  // Get all custom videos
  getAll: async (): Promise<ApiResponse<CustomVideoResponse[]>> => {
    return await apiRequest<CustomVideoResponse[]>('/videos');
  },

  // Get a single custom video by lesson ID
  getByLesson: async (lessonId: string): Promise<ApiResponse<CustomVideoResponse>> => {
    return await apiRequest<CustomVideoResponse>(`/videos/lesson/${lessonId}`);
  },

  // Upload custom video and thumbnail
  upload: async (uploadData: {
    lessonId: string;
    moduleId: string;
    title: string;
    videoData: string;
    thumbnailData: string;
    duration?: number;
  }): Promise<ApiResponse<any>> => {
    return await apiRequest<any>('/videos/upload', 'POST', uploadData);
  }
};

export const lessonsApi = {
  getAll: async (): Promise<ApiResponse<Lesson[]>> => {
    return await apiRequest<Lesson[]>('/lessons');
  },
  save: async (lesson: Lesson): Promise<ApiResponse<Lesson>> => {
    return await apiRequest<Lesson>('/lessons/save', 'POST', lesson);
  },
  delete: async (id: string): Promise<ApiResponse<any>> => {
    return await apiRequest<any>(`/lessons/${id}`, 'DELETE');
  }
};

export { getToken, setToken, removeToken };
