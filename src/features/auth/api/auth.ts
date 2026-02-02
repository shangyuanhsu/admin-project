/**
 * Mock API for authentication.
 * 
 * This module simulates backend API calls for development and testing purposes.
 * It mimics network latency and returns mock data structure consistent with the expected backend response.
 * 
 * @module features/auth/api
 */

interface LoginCredentials {
  /** User's account identifier (e.g., username or email) */
  account: string;
  /** User's password (optional in this mock, but typically required) */
  password?: string;
  /** Verification code (optional) */
  captcha?: string;
}

interface LoginResponse {
  /** JWT or Session Token for authentication */
  token: string;
  /** Authenticated user's details */
  user: {
    name: string;
    email: string;
  };
}

/**
 * Simulates a login request to the server.
 * 
 * @param {LoginCredentials} credentials - The login credentials provided by the user.
 * @returns {Promise<LoginResponse>} A promise that resolves with the mock success response after a delay.
 * 
 * @example
 * // Usage in an async function (e.g., inside a Thunk or Component)
 * try {
 *   const data = await loginWithCredentials({ account: 'admin', password: 'password123' });
 *   console.log('Token:', data.token);
 * } catch (error) {
 *   console.error('Login failed');
 * }
 */
import { config } from '../../../lib/config';

// ... (JSDoc and interfaces remain same)

/**
 * Simulates a login request to the server.
 * Note: In a real app, this would use fetch/axios with config.apiUrl
 */
export const loginWithCredentials = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  // Example of how you would use the env variable in the future:
  // const response = await fetch(`${config.apiUrl}/auth/login`, ...);
  
  if (config.enableMock) {
    console.log(`[Mock Mode] Connecting to: ${config.apiUrl}`);
    // Simulate network delay (800ms)
    await new Promise((resolve) => setTimeout(resolve, 800));
  }

  console.log('API Call: /api/login', credentials);

  // Mock Success Response
  return {
    token: 'mock-jwt-token-' + Math.random().toString(36).substr(2),
    user: {
      name: 'Admin User',
      email: credentials.account,
    },
  };
};
