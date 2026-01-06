class LoginScreen {

  get inputUsername() {
    return $('~usernameTextField');
  }

  get smsLoginButton() {
    return $('~smsLoginButton');
  }

  get inputPassword() {
    return $('~passwordTextField');
  }

  get forgotDataButton() {
    return $('~forgotDataButton');
  }

  get usernameRecoveryButton() {
    return $('~usernameRecoveryButton');
  }

  get passwordRecoveryButton() {
    return $('~passwordRecoveryButton');
  }

  get btnLogin() {
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

  get saveUsername() {
    return $('~saveUsernameButton');
  }

  get guestUser() {
    return $('~oneTimeLoginButton');
  }

  get xButton() {
    return $('//android.widget.ImageView[@resource-id="com.adjarabet:id/regulation_layout_close_button"]');
    // return $('~dismiss');
  }
get backfromWeb(){
  return $('//android.widget.ImageView[@resource-id="com.adjarabet:id/termsBackButton"]');
}
  
  // get allowButton() {
  //   return $('//android.widget.Button[@resource-id="com.android.permissioncontroller:id/permission_allow_button"]');
  // }
  
  get back() {
    return $('~back');
  }
  get restrictedModuleText() {
    return $('//android.widget.TextView[@resource-id="com.adjarabet:id/regulation_layout_description"]');
  }
  get webComponentKa() {
    return $('(//android.widget.TextView[@text="შესვლა"])[2]');
  }
  get webComponentEn() {
    return $('//android.widget.TextView[@text="LogIn"]');
  }
  get webComponentRu() {
    return $('//android.widget.TextView[@text="Вход"]');
  }
  get verificationBtn() {
    return $('//android.widget.Button[@resource-id="com.adjarabet:id/regulation_layout_action_button"]');
  }


  async login(username, password) {
    //await this.allowButton.click();
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
    await this.btnLogin.click();
    await this.saveUsername.click();
    // await this.xButton.click();
  }

  async guestLogin(username, password) {
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
    await this.btnLogin.click();
    await this.guestUser.click();
  }

  async smsLogin(username) {
    await this.inputUsername.setValue(username);
    await this.smsLoginButton.click();
  }

  async loginRestricted(username, password) {
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
    await this.btnLogin.click();
  }
  
  
  async generateRandomString(minLength, maxLength) {
    let result = '';
    const characters = '^[abcdefghijklmnopqrstuvwxyz0123456789_.]$';
    const charactersLength = characters.length;
    const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters.charAt(randomIndex);
    }
  
    return result;
  }
  
}

module.exports = new LoginScreen();
// export default new LoginScreen();