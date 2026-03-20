import axios from 'axios';
import Constants from 'expo-constants';

const apiBaseUrl =
  Constants.expoConfig?.extra?.apiBaseUrl || process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:4000/api';

export const apiClient = axios.create({
  baseURL: apiBaseUrl,
  timeout: 15000
});
