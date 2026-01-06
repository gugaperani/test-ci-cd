// @ts-nocheck
import LoginScreen from "../../screenObjects/android/Login.screen";


describe('Authorization1', () => {

  beforeEach(async () => {
    await driver.reset();
  });

  it('"SMS login" button appears after entering username', async () => {
    const randomUsername = await LoginScreen.generateRandomString(5, 20);
    await LoginScreen.inputUsername.setValue(randomUsername);
    await expect(await LoginScreen.smsLoginButton.isDisplayed()).toBe(true);
    await browser.pause(1000);
  });

});
