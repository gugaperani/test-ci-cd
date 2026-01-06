class LoginScreen {

  get inputUsername() {
    return $('~usernameTextField');
  }
  get inputPassword() {
    return $('~passwordTextField');
  }

  get forgotDataButton() {
    return $('~forgotDataButton');
  }

  // Username Recovery

  get usernameRecoveryButton() {
    return $('~usernameRecoveryButton');
  }
  get viaIdNumber() {
    return $('~selectDocumentTypeViewIndex0');
  }
  get viaDocumentNumber() {
    return $('~selectDocumentTypeViewIndex1');
  }
  get idNumberField() {
    return $('~idCardNumberTextField');
  }
  get phoneNumberTextField() {
    return $('~phoneNumberTextField');
  }

  // Password Recovery

  get passwordRecoveryButton() {
    return $('~passwordRecoveryButton');
  }
  get continueBtn() {
    return $('~continueButton');
  }
  get recoverViaSmsButton() {
    return $('~ResetOptionTableViewCell0');
  }
  get recoverViaEmailButton() {
    return $('~ResetOptionTableViewCell1');
  }
  get mobileNumberField() {
    return $('~contactTextField');
  }
  get newPasswordField() {
    return $('~newPasswordTextField');
  }
  get repeatNewPasswordField() {
    return $('~repeatPasswordTextField');
  }
  get recoverPasswordButton() {
    return $('~updatePasswordButton');
  }
  get otpField() {
    return $('~smsCodeView');
  }
  get resendButton() {
    return $('~resendButton');
  }
  get confirmButton() {
    return $('~submitButton');
  }

  // -------------------------------------------------------

  get loginButton() {
    return $('~loginButton');
  }

  get registrationButton() {
    return $('~registrationButton');
  }
  get contactButton() {
    return $('~contactButton');
  }

  get languageButton() {
    return $('~languageButton');
  }

  get englesh() {
    return $('~English');
  }
  get russian() {
    return $('~Русский');
  }
  get georgian() {
    return $('~ქართული');
  }

  // -------------------------------------------------------

  get xButton() {
    return $('~dismiss');
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
    return $('//XCUIElementTypeButton[@name="ᲒᲐᲡᲐᲒᲔᲑᲘᲐ"]');
  }
  get dontAsk() {
    return $('//XCUIElementTypeStaticText[@name="ᲐᲦᲐᲠ ᲛᲙᲘᲗᲮᲝ"]');
  }

  async login(username: string, password: string): Promise<void> {
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
    await this.loginButton.click();
    if (await this.rulesAndConditionsTitle.isDisplayed()) {
      await this.gotItButton.click();
    }
  }

  async smsLogin(username: string): Promise<void> {
    await this.inputUsername.setValue(username);
    await this.loginButton.click();
  }

  async loginRestricted(username: string, password: string): Promise<void> {
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
    await this.loginButton.click();
    if (await this.rulesAndConditionsTitle.isDisplayed()) {
      await this.gotItButton.click();
    }
  }

  async swipeLeft(element: WebdriverIO.Element): Promise<void> {
    const elementId = await element.elementId;
    await driver.execute('mobile: swipe', {
      direction: 'left',
      element: elementId
    });
  }

  async generateRandomString(minLength: number, maxLength: number): Promise<string> {
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

}

export default new LoginScreen();