import 'dotenv/config';
import HomeScreen from '../../screenObjects/ios/Home.screen';
import LoginScreen from '../../screenObjects/ios/Login.screen';
import geStrings from '../../../helpers/adjarabet/data/localization-ka.json';
import { TestUsers, getUserMetadata } from '../../../testData/users';
import { waits } from '../../../helpers/waits.helper';

describe('Authorization', () => {
  const bundleId = process.env.IOS_BUNDLE_ID || 'com.adjarabet.Mobile';

  beforeEach(async () => {
    await driver.execute('mobile: terminateApp', { bundleId });
    await driver.execute('mobile: launchApp', { bundleId });
    await LoginScreen.waitForLoaded();
  });

  it.only('should display error message for invalid login credentials', async () => {
    await LoginScreen.login(TestUsers.STANDARD_USER);
    await waits.waitForDisplayed(LoginScreen.loginErrorMessage);
    await expect(LoginScreen.loginErrorMessage).toHaveText(geStrings.shared_aberror_pattern_not_matched);
  });

  it('should prevent UNVERIFIED users from logging in', async () => {
    const userMetadata = getUserMetadata(TestUsers.UNVERIFIED_USER);
    await LoginScreen.login(TestUsers.UNVERIFIED_USER);
    await waits.waitForDisplayed(LoginScreen.ModuleDescription);
    await expect(LoginScreen.ModuleDescription).toHaveText(userMetadata.expectedErrorMessage!);
  });

  // it('should prevent RESIDENT users from logging in', async () => {
  //   const userMetadata = getUserMetadata(TestUsers.RESIDENT_USER);
  //   await LoginScreen.login(TestUsers.RESIDENT_USER);
  //   await waits.waitForDisplayed(LoginScreen.ModuleDescription);
  //   await expect(LoginScreen.ModuleDescription).toContainText('უცხო ქვეყნის მოქალაქისთვის აპლიკაცია ამჟამად მიუწვდომელია');
  // });

  it('should prevent UNDER AGE users from logging in', async () => {
    const userMetadata = getUserMetadata(TestUsers.UNDER_AGE_USER);
    await LoginScreen.login(TestUsers.UNDER_AGE_USER);
    await waits.waitForDisplayed(LoginScreen.ModuleDescription);
    await expect(LoginScreen.ModuleDescription).toHaveText(userMetadata.expectedErrorMessage!);
  });

  it('should prevent NO-PHONE users from logging in', async () => {
    const userMetadata = getUserMetadata(TestUsers.NO_PHONE_USER);
    await LoginScreen.login(TestUsers.NO_PHONE_USER);
    await waits.waitForDisplayed(LoginScreen.ModuleDescription);
    await expect(LoginScreen.ModuleDescription).toHaveText(userMetadata.expectedErrorMessage!);
  });

  it('should prevent UNVERIFIED PHONE NUMBER users from logging in', async () => {
    const userMetadata = getUserMetadata(TestUsers.UNVERIFIED_PHONE_USER);
    await LoginScreen.login(TestUsers.UNVERIFIED_PHONE_USER);
    await waits.waitForDisplayed(LoginScreen.ModuleDescription);
    await expect(LoginScreen.ModuleDescription).toHaveText(userMetadata.expectedErrorMessage!);
  });

  it('should prevent MANDATORY SDA users from logging in', async () => {
    const userMetadata = getUserMetadata(TestUsers.MANDATORY_SDA_USER);
    await LoginScreen.login(TestUsers.MANDATORY_SDA_USER);
    await waits.waitForDisplayed(LoginScreen.ModuleDescription);
    await expect(LoginScreen.ModuleDescription).toHaveText(userMetadata.expectedErrorMessage!);
  });

  it('should show reverification module for OPTIONAL SDA users', async () => {
    const userMetadata = getUserMetadata(TestUsers.OPTIONAL_SDA_USER);
    await LoginScreen.login(TestUsers.OPTIONAL_SDA_USER);
    await waits.waitForClickable(LoginScreen.xButton);
    await LoginScreen.xButton.click();
    await waits.waitForClickable(HomeScreen.notNow);
    await HomeScreen.notNow.click();
    await waits.waitForDisplayed(LoginScreen.ModuleDescription);
    await expect(LoginScreen.ModuleDescription).toHaveText(userMetadata.expectedErrorMessage!);
  });

  it('should prevent MANDATORY OTP users from logging in', async () => {
    const userMetadata = getUserMetadata(TestUsers.MANDATORY_OTP_USER);
    await LoginScreen.login(TestUsers.MANDATORY_OTP_USER);
    await waits.waitForDisplayed(LoginScreen.ModuleDescription);
    await expect(LoginScreen.ModuleDescription).toHaveText(userMetadata.expectedErrorMessage!);
  });

  it('should show reverification module for OPTIONAL OTP users', async () => {
    const userMetadata = getUserMetadata(TestUsers.OPTIONAL_OTP_USER);
    await LoginScreen.login(TestUsers.OPTIONAL_OTP_USER);
    await waits.waitForClickable(LoginScreen.xButton);
    await LoginScreen.xButton.click();
    await waits.waitForClickable(HomeScreen.notNow);
    await HomeScreen.notNow.click();
    await waits.waitForDisplayed(LoginScreen.ModuleDescription);
    await expect(LoginScreen.ModuleDescription).toHaveText(userMetadata.expectedErrorMessage!);
  });

  it('should prevent EXPIRED MANDATORY users from logging in', async () => {
    const userMetadata = getUserMetadata(TestUsers.EXPIRED_MANDATORY_USER);
    await LoginScreen.login(TestUsers.EXPIRED_MANDATORY_USER);
    await waits.waitForDisplayed(LoginScreen.ModuleDescription);
    await expect(LoginScreen.ModuleDescription).toHaveText(userMetadata.expectedErrorMessage!);
  });

  it('should show reverification module for EXPIRED OPTIONAL users', async () => {
    const userMetadata = getUserMetadata(TestUsers.EXPIRED_OPTIONAL_USER);
    await LoginScreen.login(TestUsers.EXPIRED_OPTIONAL_USER);
    await waits.waitForClickable(LoginScreen.xButton);
    await LoginScreen.xButton.click();
    await waits.waitForClickable(HomeScreen.notNow);
    await HomeScreen.notNow.click();
    await waits.waitForDisplayed(LoginScreen.ModuleDescription);
    await expect(LoginScreen.ModuleDescription).toHaveText(userMetadata.expectedErrorMessage!);
  });
});
