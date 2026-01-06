import axios, { AxiosError } from 'axios';
import secrets from './awsS3Helper';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  [key: string]: any;
}

interface UserCredentials {
  username: string;
  password: string;
}

class AuthApi {
  private readonly maxRetries: number = 3;
  private readonly retryDelay: number = 1000; // milliseconds
  private readonly apiBaseUrl: string;

  constructor() {
    // Validate API_BASE_URL is set
    if (!process.env.API_BASE_URL) {
      throw new Error('API_BASE_URL environment variable is not set');
    }
    this.apiBaseUrl = process.env.API_BASE_URL;
  }

  /**
   * Login user via API and return access/refresh tokens
   * @param userKey - The key to lookup user credentials in AWS Secrets Manager
   * @returns Login response with tokens
   */
  async login(userKey: string): Promise<LoginResponse> {
    try {
      // Get user credentials from AWS Secrets Manager
      const allUsers = await secrets.getSecrets();
      const user = allUsers[userKey] as UserCredentials;

      if (!user) {
        throw new Error(`No credentials found for userKey: "${userKey}"`);
      }

      if (!user.username || !user.password) {
        throw new Error(`Invalid credentials for userKey: "${userKey}" - missing username or password`);
      }

      // Attempt login with retry logic
      const response = await this.loginWithRetry(user.username, user.password);

      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Login failed for user "${userKey}": ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Internal method to perform login with retry logic
   * @param username - User's username
   * @param password - User's password
   * @returns Login response with tokens
   */
  private async loginWithRetry(username: string, password: string): Promise<LoginResponse> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        const response = await axios.post<LoginResponse>(
          `${this.apiBaseUrl}/auth/login`,
          {
            username,
            password,
          },
          {
            timeout: 10000, // 10 second timeout
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        // Validate response contains required fields
        if (!response.data.accessToken) {
          throw new Error('API response missing accessToken');
        }

        return response.data;
      } catch (error) {
        lastError = this.handleAxiosError(error, attempt);

        // Don't retry on 4xx errors (client errors)
        if (
          axios.isAxiosError(error) &&
          error.response?.status &&
          error.response.status >= 400 &&
          error.response.status < 500
        ) {
          throw lastError;
        }

        // Wait before retrying (except on last attempt)
        if (attempt < this.maxRetries) {
          await this.sleep(this.retryDelay * attempt); // Exponential backoff
        }
      }
    }

    throw new Error(`Login failed after ${this.maxRetries} attempts: ${lastError?.message}`);
  }

  /**
   * Handle Axios errors and convert to meaningful error messages
   * @param error - The error from axios
   * @param attempt - Current attempt number
   * @returns Formatted error
   */
  private handleAxiosError(error: unknown, attempt: number): Error {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      if (axiosError.response) {
        // Server responded with error status
        const status = axiosError.response.status;
        const data = axiosError.response.data;
        return new Error(`HTTP ${status}: ${JSON.stringify(data)} (attempt ${attempt}/${this.maxRetries})`);
      } else if (axiosError.request) {
        // Request made but no response received
        return new Error(`No response from server (attempt ${attempt}/${this.maxRetries})`);
      }
    }

    if (error instanceof Error) {
      return new Error(`${error.message} (attempt ${attempt}/${this.maxRetries})`);
    }

    return new Error(`Unknown error during login (attempt ${attempt}/${this.maxRetries})`);
  }

  /**
   * Sleep for specified milliseconds
   * @param ms - Milliseconds to sleep
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export const authApi = new AuthApi();
