import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

export class AWSSecretsHelper {
  private client: SecretsManagerClient;
  private secretsCache: Record<string, any> | null = null;
  private cacheTimestamp: number | null = null;
  private readonly cacheTTL: number = 5 * 60 * 1000; // 5 minutes in milliseconds

  constructor() {
    // Validate required AWS environment variables
    const requiredVars = ['AWS_REGION', 'AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY'];
    const missingVars = requiredVars.filter((varName) => !process.env[varName]);

    if (missingVars.length > 0) {
      throw new Error(`Missing required AWS environment variables: ${missingVars.join(', ')}`);
    }

    this.client = new SecretsManagerClient({
      region: process.env.AWS_REGION!,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
  }

  /**
   * Get secrets from AWS Secrets Manager with caching
   * @param forceRefresh - Force refresh the cache
   * @returns Object containing all user credentials
   */
  async getSecrets(forceRefresh: boolean = false): Promise<Record<string, any>> {
    try {
      // Return cached secrets if available and not expired
      if (!forceRefresh && this.isCacheValid()) {
        return this.secretsCache!;
      }

      // Fetch secrets from AWS
      const secretName = process.env.AWS_SECRET_NAME || 'users-ABMobile';
      const command = new GetSecretValueCommand({
        SecretId: secretName,
      });

      const response = await this.client.send(command);

      if (!response.SecretString) {
        throw new Error(`AWS SecretString is empty for secret: "${secretName}"`);
      }

      // Parse and cache the secrets
      this.secretsCache = JSON.parse(response.SecretString);
      this.cacheTimestamp = Date.now();

      return this.secretsCache!;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to retrieve secrets from AWS: ${error.message}`);
      }
      throw new Error('Failed to retrieve secrets from AWS: Unknown error');
    }
  }

  /**
   * Get a specific user's credentials by key
   * @param userKey - The user key to lookup
   * @returns User credentials object
   */
  async getUserCredentials(userKey: string): Promise<any> {
    const allSecrets = await this.getSecrets();

    if (!allSecrets[userKey]) {
      throw new Error(`User credentials not found for key: "${userKey}"`);
    }

    return allSecrets[userKey];
  }

  /**
   * Check if cache is still valid
   * @returns True if cache is valid, false otherwise
   */
  private isCacheValid(): boolean {
    if (!this.secretsCache || !this.cacheTimestamp) {
      return false;
    }

    const now = Date.now();
    const cacheAge = now - this.cacheTimestamp;

    return cacheAge < this.cacheTTL;
  }

  /**
   * Clear the secrets cache
   */
  clearCache(): void {
    this.secretsCache = null;
    this.cacheTimestamp = null;
  }

  /**
   * Get cache status information
   * @returns Cache status object
   */
  getCacheStatus(): { isCached: boolean; age: number | null; ttl: number } {
    return {
      isCached: this.isCacheValid(),
      age: this.cacheTimestamp ? Date.now() - this.cacheTimestamp : null,
      ttl: this.cacheTTL,
    };
  }
}

export default new AWSSecretsHelper();
