import secrets from '../../../helpers/adjarabet/awsS3Helper';
import { waits } from '../../../helpers/waits.helper';

class LoginScreen {
  // Main login fields
  get inputUsername() {
    return $('~usernameTextField_placeholderLabel');
  }

  get inputPassword() {
    return $('~passwordTextField_placeholderLabel');
  }

  get loginErrorMessage() {
    return $('~passwordTextField_validationResultLabel');
  }

  get smsLoginButton() {
    return $('~usernameTextField_smsLoginButton');
  }

  get saveUsernameButton() {
    return $('~LoginViewController_saveUsernameButton');
  }

  get forgotDataButton() {
    return $('~LoginViewController_forgotDataButton');
  }

  get loginButton() {
    return $('~LoginViewController_loginButton');
  }

  get registrationButton() {
    return $('~LoginViewController_registrationButton');
  }

  get freeToPlay() {
    return $('~FreeToPlay/banner');
  }

  get contactButton() {
    return $('~LoginViewController_footerComponentView_contactButton');
  }

  get languageButton() {
    return $('~LoginViewController_footerComponentView_languageButton');
  }

  // Language options
  get english() {
    return $('~language_en');
  }

  get russian() {
    return $('~language_ru');
  }

  get georgian() {
    return $('~language_ka');
  }

  // Username Recovery

  get usernameRecoveryButton() {
    return $('~RecoveryModeSelectionViewController_usernameRecoveryButton');
  }
  get viaIdNumber() {
    return $('~selectDocumentTypeViewIndex0');
  }
  get viaDocumentNumber() {
    return $('~selectDocumentTypeViewIndex1');
  }
  get idNumberField() {
    return $('~ResetUsernameViewController_idNumberInputView');
  }
  get phoneNumberTextField() {
    return $('~ResetUsernameViewController_phoneNumberInputView');
  }
  get continueButton() {
    return $('~ResetUsernameViewController_continueButton');
  }
  // Password Recovery

  get passwordRecoveryButton() {
    return $('~332');
  }
  get continueBtn() {
    return $('~3232');
  }
  get recoverViaSmsButton() {
    return $('~3232');
  }
  get recoverViaEmailButton() {
    return $('~3232');
  }
  get mobileNumberField() {
    return $('~3232');
  }
  get newPasswordField() {
    return $('~3223');
  }
  get repeatNewPasswordField() {
    return $('~3232');
  }
  get recoverPasswordButton() {
    return $('~2332');
  }
  get otpField() {
    return $('~3232');
  }
  get resendButton() {
    return $('~2332');
  }
  get confirmButton() {
    return $('~3232');
  }

  // -------------------------------------------------------

  get biometrySuggestionClose() {
    return $('~BiometrySuggestionViewController_closeButton');
  }

  get biometrySuggestionTitle() {
    return $('~BiometrySuggestionViewController_titleLabel');
  }
  get biometrySuggestionDescription() {
    return $('~BiometrySuggestionViewController_descriptionLabel');
  }
  get BiometrySuggestionactivateButton() {
    return $('~BiometrySuggestionViewController_activateButton');
  }
  get dontShowAgainButton() {
    return $('~BiometrySuggestionViewController_dontShowAgainButton');
  }
  // -------------------------------------------------------

  get xButton() {
    return $('~Close');
  }

  get back() {
    return $('~back');
  }

  get ModuleTitle() {
    return $('~titleLabel');
  }
  get ModuleDescription() {
    return $('~descriptionLabel');
  }
  get verificationBtn() {
    return $('~goToButton');
  }
  get loginAsAnotherUser() {
    return $('~dismissButton');
  }

  get rulesAndConditionsTitle() {
    return $('~განახლდა წესები');
  }

  get gotItButton() {
    return $('32323232');
  }
  get dontAsk() {
    return $('32323232');
  }

  /**
   * Login with user credentials from AWS Secrets Manager
   * @param userKey - User key to lookup credentials in AWS
   */
  async login(userKey: string): Promise<void> {
    const allUsers = await secrets.getSecrets();
    const creds = allUsers[userKey];

    if (!creds) {
      throw new Error(`No credentials found for user: ${userKey}`);
    }

    await waits.waitForDisplayed(this.inputUsername);
    await this.inputUsername.setValue(creds.username);
    await this.inputPassword.setValue(creds.password);

    await waits.waitForClickable(this.loginButton);
    await this.loginButton.click();

    // Handle optional popup dialogs
    await this.handleOptionalDialogs();
  }

  /**
   * Login using plain username and password (for restricted users)
   * @param username - Username
   * @param password - Password
   */
  async loginWithCredentials(username: string, password: string): Promise<void> {
    await waits.waitForDisplayed(this.inputUsername);
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);

    await waits.waitForClickable(this.loginButton);
    await this.loginButton.click();

    // Handle optional popup dialogs
    await this.handleOptionalDialogs();
  }

  /**
   * Login by TestName lookup (alternative lookup method)
   * @param testName - TestName field from AWS credentials
   */
  async loginTestName(testName: string): Promise<void> {
    const allUsers = await secrets.getSecrets();
    const creds = Object.values(allUsers).find((u: any) => u.TestName === testName);

    if (!creds) {
      throw new Error(`No credentials found for TestName: ${testName}`);
    }

    await waits.waitForDisplayed(this.inputUsername);
    await this.inputUsername.setValue((creds as any).username);
    await this.inputPassword.setValue((creds as any).password);

    await waits.waitForClickable(this.loginButton);
    await this.loginButton.click();

    // Handle optional popup dialogs
    await this.handleOptionalDialogs();
  }

  /**
   * Handle optional dialogs that may appear after login
   */
  private async handleOptionalDialogs(): Promise<void> {
    try {
      // Handle rules and conditions dialog
      if (await this.rulesAndConditionsTitle.isDisplayed()) {
        await this.gotItButton.click();
      }
    } catch (error) {
      // Dialog not present, continue
    }

    try {
      // Handle biometry suggestion dialog
      if (await this.dontShowAgainButton.isDisplayed()) {
        await this.dontShowAgainButton.click();
      }
    } catch (error) {
      // Dialog not present, continue
    }
  }

  /**
   * Initiate SMS login flow
   * @param username - Username for SMS login
   */
  async smsLogin(username: string): Promise<void> {
    await waits.waitForDisplayed(this.inputUsername);
    await this.inputUsername.setValue(username);

    await waits.waitForClickable(this.smsLoginButton);
    await this.smsLoginButton.click();
  }

  /**
   * Select language on login screen
   * @param language - Language to select ('ka', 'en', 'ru')
   */
  async selectLanguage(language: 'ka' | 'en' | 'ru'): Promise<void> {
    await waits.waitForClickable(this.languageButton);
    await this.languageButton.click();

    const languageOption = language === 'ka' ? this.georgian : language === 'en' ? this.english : this.russian;
    await waits.waitForClickable(languageOption);
    await languageOption.click();
  }

  /**
   * Swipe element left (mobile gesture)
   * @param element - Element to swipe
   */
  async swipeLeft(element: WebdriverIO.Element): Promise<void> {
    const elementId = await element.elementId;
    await driver.execute('mobile: swipe', {
      direction: 'left',
      element: elementId,
    });
  }

  /**
   * Swipe element right (mobile gesture)
   * @param element - Element to swipe
   */
  async swipeRight(element: WebdriverIO.Element): Promise<void> {
    const elementId = await element.elementId;
    await driver.execute('mobile: swipe', {
      direction: 'right',
      element: elementId,
    });
  }

  /**
   * Generate random string for testing
   * @param minLength - Minimum length
   * @param maxLength - Maximum length
   * @returns Random string
   */
  generateRandomString(minLength: number, maxLength: number): string {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789_.';
    const charactersLength = characters.length;
    const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters.charAt(randomIndex);
    }

    return result;
  }

  /**
   * Wait for login screen to be loaded
   */
  async waitForLoaded(): Promise<void> {
    await waits.waitForDisplayed(this.loginButton, 15000, 'Login screen did not load');
  }
}

export default new LoginScreen();
