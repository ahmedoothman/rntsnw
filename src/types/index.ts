// Re-export notification types for easier importing
export type {Notification} from '../redux/slices/notificationSlice';

// Add any other global types here
export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface Theme {
  isDarkMode: boolean;
}

export interface Language {
  currentLanguage: string;
  loadedLanguage: string;
}
