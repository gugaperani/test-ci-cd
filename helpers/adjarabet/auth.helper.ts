import { authApi } from './auth.api';

class AuthHelper {
  private deepLinkScheme: string;
  private iosBundleId: string;
  private androidPackage: string;

  constructor() {
    // Load configuration from environment variables
    this.deepLinkScheme = process.env.APP_DEEP_LINK_SCHEME || 'adjarabet';
    this.iosBundleId = process.env.IOS_BUNDLE_ID || 'com.adjarabet.Mobile';
    this.androidPackage = process.env.ANDROID_PACKAGE || 'com.adjarabet';
  }

  /**
   * Login via deep link by first getting access token from API, then opening deep link
   * @param userKey - The user key to retrieve credentials from AWS Secrets Manager
   */
  async loginViaDeepLink(userKey: string): Promise<void> {
    try {
      // 1) API login – get access token
      const auth = await authApi.login(userKey);
      const token = auth.accessToken;

      if (!token) {
        throw new Error('accessToken was not returned from login API');
      }

      // 2) Open deep link (iOS / Android)
      const deepLinkUrl = `${this.deepLinkScheme}://auth?token=${token}`;

      if (driver.isIOS) {
        await driver.execute('mobile: deepLink', {
          url: deepLinkUrl,
          bundleId: this.iosBundleId,
        });
      } else {
        await driver.execute('mobile: deepLink', {
          url: deepLinkUrl,
          package: this.androidPackage,
        });
      }
    } catch (error) {
      throw new Error(`Failed to login via deep link for user "${userKey}": ${error}`);
    }
  }

  /**
   * Logout via deep link
   */
  async logoutViaDeepLink(): Promise<void> {
    try {
      const deepLinkUrl = `${this.deepLinkScheme}://logout`;

      if (driver.isIOS) {
        await driver.execute('mobile: deepLink', {
          url: deepLinkUrl,
          bundleId: this.iosBundleId,
        });
      } else {
        await driver.execute('mobile: deepLink', {
          url: deepLinkUrl,
          package: this.androidPackage,
        });
      }
    } catch (error) {
      throw new Error(`Failed to logout via deep link: ${error}`);
    }
  }

  /**
   * Navigate to a specific route via deep link
   * @param route - The route to navigate to (e.g., 'profile', 'deposit', 'home')
   */
  async navigateViaDeepLink(route: string): Promise<void> {
    try {
      const deepLinkUrl = `${this.deepLinkScheme}://${route}`;

      if (driver.isIOS) {
        await driver.execute('mobile: deepLink', {
          url: deepLinkUrl,
          bundleId: this.iosBundleId,
        });
      } else {
        await driver.execute('mobile: deepLink', {
          url: deepLinkUrl,
          package: this.androidPackage,
        });
      }
    } catch (error) {
      throw new Error(`Failed to navigate to "${route}" via deep link: ${error}`);
    }
  }
}

export const authHelper = new AuthHelper();
