import 'dotenv/config';
import LoginScreen from '../../screenObjects/ios/Login.screen';
import HomeScreen from '../../screenObjects/ios/Home.screen';
import ProfileScreen from '../../screenObjects/ios/Profile.screen';
import { TestUsers } from '../../../testData/users';
import { authHelper } from '../../../helpers/adjarabet/auth.helper';
import { waits } from '../../../helpers/waits.helper';

describe('Blocked user flow', () => {
  const bundleId = process.env.IOS_BUNDLE_ID || 'com.adjarabet.Mobile';

  beforeEach(async () => {
    // Launch app
    await driver.execute('mobile: terminateApp', { bundleId });
    await driver.execute('mobile: launchApp', { bundleId });
    await LoginScreen.waitForLoaded();

    // Login as blocked user
    await LoginScreen.login(TestUsers.FULL_BLOCK_USER);
  });

  afterEach(async () => {
    // Logout via deep link
    try {
      await authHelper.navigateViaDeepLink('profile');
      await waits.waitForDisplayed(ProfileScreen.logoutButton, 5000);
      await ProfileScreen.logoutButton.click();
      await waits.waitForDisplayed(LoginScreen.loginButton, 5000);
    } catch (error) {
      // If logout fails, terminate app as fallback
      await driver.execute('mobile: terminateApp', { bundleId });
    }
  });

  it('should prevent blocked user from opening games', async () => {
    // Navigate to games section
    await waits.waitForClickable(HomeScreen.gamesSection);
    await HomeScreen.gamesSection.click();

    // Try to open a game
    await waits.waitForDisplayed(HomeScreen.firstGame);
    await HomeScreen.firstGame.click();

    // Verify block message is displayed
    await waits.waitForDisplayed(HomeScreen.blockMessage, 10000, 'Block message not displayed for blocked user');
    await expect(HomeScreen.blockMessage).toBeDisplayed();
  });

  it('should prevent blocked user from accessing deposit page', async () => {
    // Try to navigate to deposit
    await waits.waitForClickable(HomeScreen.depositSection);
    await HomeScreen.depositSection.click();

    // Verify deposit blocked alert is displayed
    await waits.waitForDisplayed(HomeScreen.depositBlockedAlert, 10000, 'Deposit blocked alert not displayed');
    await expect(HomeScreen.depositBlockedAlert).toBeDisplayed();
  });

  it('should prevent blocked user from withdrawing funds', async () => {
    // Navigate to profile
    await authHelper.navigateViaDeepLink('profile');
    await waits.waitForDisplayed(ProfileScreen.withdrawButton, 5000);

    // Try to withdraw
    await ProfileScreen.withdrawButton.click();

    // Verify withdrawal blocked message
    await waits.waitForDisplayed(ProfileScreen.withdrawBlockedMessage, 10000, 'Withdraw blocked message not displayed');
    await expect(ProfileScreen.withdrawBlockedMessage).toBeDisplayed();
  });
});
