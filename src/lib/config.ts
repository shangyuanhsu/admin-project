/**
 * Environment configuration utility.
 * Centralizes all access to environment variables.
 */

export const config = {
  // Access environment variables using import.meta.env
  // NOTE: Only variables prefixed with VITE_ are exposed to the client
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  appName: import.meta.env.VITE_APP_NAME || 'Admin Project',
  enableMock: import.meta.env.VITE_ENABLE_MOCK === 'true',
};
