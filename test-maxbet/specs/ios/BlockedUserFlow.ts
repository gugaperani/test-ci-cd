import HomeScreen from "../../screenObjects/ios/Home.screen";
import LoginScreen from "../../screenObjects/ios/Login.screen";
import Alertscreen from "../../screenObjects/ios/Alert&Modul.screen";
import ProfileScreen from "../../screenObjects/ios/Profile.screen";

const blockedTitle: string = "ანგარიში დაბლოკილია";

describe('Full Block Tests', () => {

  const username: string = 'gpfullblock';
  const password: string = '@Qwerty0';

  beforeEach(async () => {
    await driver.execute('mobile: terminateApp', { bundleId: 'com.adjarabet.Mobile' });
    await driver.execute('mobile: launchApp', { bundleId: 'com.adjarabet.Mobile' });
    await LoginScreen.login(username, password);
  });

  it.only('Full Block User should not be able to open GAME (From home) ', async () => {
    await driver.execute('mobile: scroll', { direction: "down" });
    await HomeScreen.game.click();
    await expect(Alertscreen.blockalertTitle).toHaveText(blockedTitle);
  });

  it('Full Block User should not be able to open GAME (From Search) ', async () => {
    await HomeScreen.searchTextField.click();
    await HomeScreen.gameInSearch.click();
    await expect(Alertscreen.blockalertTitle).toHaveText(blockedTitle);
  });

  it('Full Block User should not be able to open GAME (From Last Played) ', async () => {
    await HomeScreen.gameInLastPlayed.click();
    await expect(Alertscreen.blockalertTitle).toHaveText(blockedTitle);
  });

  it('Full Block User should not be able to open P2P GAME', async () => {
    await HomeScreen.tableGames.click();
    await HomeScreen.backgammon.click();
    await expect(Alertscreen.blockalertTitle).toHaveText(blockedTitle);
  });

  it('Full Block User should not be able to open Deposit page (From home) ', async () => {
    await HomeScreen.deposit.click();
    await expect(Alertscreen.blockalertTitle).toHaveText(blockedTitle);
  });

  it('Full Block User should not be able to open Deposit page (From profile)', async () => {
    await HomeScreen.profile.click();
    await ProfileScreen.deposit.click();
    await expect(Alertscreen.blockalertTitle).toHaveText(blockedTitle);
  });

  it('Full Block User should not be able to open Withdrawal page (From profile)', async () => {
    await HomeScreen.profile.click();
    await ProfileScreen.withdraw.click();
    await expect(Alertscreen.blockalertTitle).toHaveText(blockedTitle);
  });

  it('Full Block User should not be able to delete card', async () => {
    await HomeScreen.profile.click();
    await ProfileScreen.cards.click();
    await LoginScreen.swipeLeft(ProfileScreen.cardone);
    await ProfileScreen.deletecard.click();
    await expect(Alertscreen.blockalertTitle).toHaveText(blockedTitle);
  });

  it('Full Block User should not be able to Password Recovery (From Login page )', async () => {
    await LoginScreen.forgotDataButton.click();
    await LoginScreen.passwordRecoveryButton.click();
    await LoginScreen.usernametextfield.setValue("gpfullblock");
    await LoginScreen.continueBtn.click();
    await expect(Alertscreen.blockalertTitle).toHaveText(blockedTitle);
  });

  it('Full Block User should not be able to Password Change (From - My Account)', async () => {
    await HomeScreen.profile.click();
    await ProfileScreen.account.click();
    await ProfileScreen.passwordAccount.click();
    await ProfileScreen.currentPassword.setValue('@Qwerty0');
    await ProfileScreen.newPassword.setValue('@Qwerty1');
    await ProfileScreen.confirmNewPassword.setValue('@Qwerty1');
    await ProfileScreen.passwordChange.click();
    await expect(Alertscreen.blockalertTitle).toHaveText(blockedTitle);
  });

  it('Full Block User should not be able to Password Recovery (From Account Setting)', async () => {
    await HomeScreen.profile.click();
    await ProfileScreen.accountParameters.click();
    await ProfileScreen.passwordAccountParameters.click();
    await ProfileScreen.currentPassword.setValue('@Qwerty0');
    await ProfileScreen.newPassword.setValue('@Qwerty1');
    await ProfileScreen.confirmNewPassword.setValue('@Qwerty1');
    await ProfileScreen.passwordChange.click();
    await expect(Alertscreen.blockalertTitle).toHaveText(blockedTitle);
  });

  it('Full Block User should not be able to Activate High Security Mode', async () => {
    await HomeScreen.profile.click();
    await ProfileScreen.accountParameters.click();
    await ProfileScreen.highSecurityMode.click();
    await ProfileScreen.switcher.click();
    await ProfileScreen.otpField.setValue("1111");
    await ProfileScreen.confirmOtp.click();
    await expect(Alertscreen.blockalertTitle).toHaveText(blockedTitle);
  });

  it('Full Block User should not be able to Change Preferred Language', async () => {
    await HomeScreen.profile.click();
    await ProfileScreen.account.click();
    await ProfileScreen.communicationLang.click();
    await driver.execute('mobile: scroll', { direction: "down" });
    await ProfileScreen.finishScroll.click();
    await expect(Alertscreen.blockalertTitle).toHaveText(blockedTitle);
  });

  it('Full Block User should not be able to Change Email', async () => {
    await HomeScreen.profile.click();
    await ProfileScreen.account.click();
    await ProfileScreen.emailChange.click();
    await ProfileScreen.newEmail.setValue("y3gsag1ghssgha1smhhbasasg@yahoo.com");
    await ProfileScreen.emailPass.setValue("@Qwerty0");
    await ProfileScreen.emailConfirm.click();
    await expect(Alertscreen.blockalertTitle).toHaveText(blockedTitle);
  });

  it('Full Block User should not be able Change adress', async () => {
    await HomeScreen.profile.click();
    await ProfileScreen.account.click();
    await ProfileScreen.adressChange.click();
    await ProfileScreen.newAdress.setValue("Test misamarti");
    await ProfileScreen.adressConfirm.click();
    await expect(Alertscreen.blockalertTitle).toHaveText(blockedTitle);
  });

  it('Full Block User should not be able to Blocked Account', async () => {
    await HomeScreen.profile.click();
    await ProfileScreen.accountParameters.click();
    await ProfileScreen.accountBlocking.click();
    await expect(Alertscreen.blockalertTitle).toHaveText(blockedTitle);
  });

});

describe('Self Suspend Tests', () => {

  const username: string = 'gpselfsuspension';
  const password: string = '@Qwerty0';

  beforeEach(async () => {
    await driver.execute('mobile: terminateApp', { bundleId: 'com.adjarabet.Mobile' });
    await driver.execute('mobile: launchApp', { bundleId: 'com.adjarabet.Mobile' });
    await LoginScreen.login(username, password);
  });

  it('Self Suspension User should not be able to open GAME (From home) ', async () => {
    await driver.execute('mobile: scroll', { direction: "down" });
    await HomeScreen.game.click();
    await expect(Alertscreen.blockalertTitle).toHaveText(blockedTitle);
  });

  it('Self Suspension User should not be able to open GAME (From Search) ', async () => {
    await HomeScreen.searchTextField.click();
    await HomeScreen.gameInSearch.click();
    await expect(Alertscreen.blockalertTitle).toHaveText(blockedTitle);
  });

  it('Self Suspension User should not be able to open GAME (From Last Played) ', async () => {
    await HomeScreen.gameInLastPlayed.click();
    await expect(Alertscreen.blockalertTitle).toHaveText(blockedTitle);
  });

  it('Self Suspension User should not be able to open P2P GAME', async () => {
    await HomeScreen.tableGames.click();
    await HomeScreen.backgammon.click();
    await expect(Alertscreen.blockalertTitle).toHaveText(blockedTitle);
  });

  it('Self Suspension User should not be able to open Deposit page (From home) ', async () => {
    await HomeScreen.deposit.click();
    await expect(Alertscreen.blockalertTitle).toHaveText(blockedTitle);
  });

  it('Self Suspension User should not be able to open Deposit page (From profile)', async () => {
    await HomeScreen.profile.click();
    await ProfileScreen.deposit.click();
    await expect(Alertscreen.blockalertTitle).toHaveText(blockedTitle);
  });

  it('Self Suspension User should not be able to open Withdrawal page (From profile)', async () => {
    await HomeScreen.profile.click();
    await ProfileScreen.withdraw.click();
    await expect(Alertscreen.blockalertTitle).toHaveText(blockedTitle);
  });

  it('Self Suspension User should not be able to delete card', async () => {
    await HomeScreen.profile.click();
    await ProfileScreen.cards.click();
    await LoginScreen.swipeLeft(ProfileScreen.cardone);
    await ProfileScreen.deletecard.click();
    await expect(Alertscreen.blockalertTitle).toHaveText(blockedTitle);
  });

  it('Self Suspension User should not be able to Password Recovery (From Login page )', async () => {
    await LoginScreen.forgotDataButton.click();
    await LoginScreen.passwordRecoveryButton.click();
    await LoginScreen.usernametextfield.setValue("gpselfsuspension");
    await LoginScreen.continueBtn.click();
    await expect(Alertscreen.blockalertTitle).toHaveText(blockedTitle);
  });

  it('Self Suspension User should not be able to Password Change (From - My Account)', async () => {
    await HomeScreen.profile.click();
    await ProfileScreen.account.click();
    await ProfileScreen.passwordAccount.click();
    await ProfileScreen.currentPassword.setValue('@Qwerty0');
    await ProfileScreen.newPassword.setValue('@Qwerty1');
    await ProfileScreen.confirmNewPassword.setValue('@Qwerty1');
    await ProfileScreen.passwordChange.click();
    await expect(Alertscreen.blockalertTitle).toHaveText(blockedTitle);
  });

  it('Self Suspension User should not be able to Password Recovery (From Account Setting)', async () => {
    await HomeScreen.profile.click();
    await ProfileScreen.accountParameters.click();
    await ProfileScreen.passwordAccountParameters.click();
    await ProfileScreen.currentPassword.setValue('@Qwerty0');
    await ProfileScreen.newPassword.setValue('@Qwerty1');
    await ProfileScreen.confirmNewPassword.setValue('@Qwerty1');
    await ProfileScreen.passwordChange.click();
    await expect(Alertscreen.blockalertTitle).toHaveText(blockedTitle);
  });

  it('Self Suspension User should not be able to Activate High Security Mode', async () => {
    await HomeScreen.profile.click();
    await ProfileScreen.accountParameters.click();
    await ProfileScreen.highSecurityMode.click();
    await ProfileScreen.switcher.click();
    await ProfileScreen.otpField.setValue("1111");
    await ProfileScreen.confirmOtp.click();
    await expect(Alertscreen.blockalertTitle).toHaveText(blockedTitle);
  });

  it('Self Suspension User should not be able to Change Preferred Language', async () => {
    await HomeScreen.profile.click();
    await ProfileScreen.account.click();
    await ProfileScreen.communicationLang.click();
    await driver.execute('mobile: scroll', { direction: "down" });
    await ProfileScreen.finishScroll.click();
    await expect(Alertscreen.blockalertTitle).toHaveText(blockedTitle);
  });

  it('Self Suspension User should not be able to Change Email', async () => {
    await HomeScreen.profile.click();
    await ProfileScreen.account.click();
    await ProfileScreen.emailChange.click();
    await ProfileScreen.newEmail.setValue("y3gsag1ghssgha1smhhbasasg@yahoo.com");
    await ProfileScreen.emailPass.setValue("@Qwerty0");
    await ProfileScreen.emailConfirm.click();
    await expect(Alertscreen.blockalertTitle).toHaveText(blockedTitle);
  });

  it('Self Suspension User should not be able Change adress', async () => {
    await HomeScreen.profile.click();
    await ProfileScreen.account.click();
    await ProfileScreen.adressChange.click();
    await ProfileScreen.newAdress.setValue("Test misamarti");
    await ProfileScreen.adressConfirm.click();
    await expect(Alertscreen.blockalertTitle).toHaveText(blockedTitle);
  });

  it('Self Suspension User should not be able to Blocked Account', async () => {
    await HomeScreen.profile.click();
    await ProfileScreen.accountParameters.click();
    await ProfileScreen.accountBlocking.click();
    await expect(Alertscreen.blockalertTitle).toHaveText(blockedTitle);
  });

});

describe('Self Exclusion Tests', () => {

  const username: string = 'gpselfexclusion';
  const password: string = '@Qwerty0';

  beforeEach(async () => {
    await driver.execute('mobile: terminateApp', { bundleId: 'com.adjarabet.Mobile' });
    await driver.execute('mobile: launchApp', { bundleId: 'com.adjarabet.Mobile' });
    await LoginScreen.guestLogin(username, password);
  });

  it('Self Exclusion User should not be able to open GAME (From home) ', async () => {
    await driver.execute('mobile: scroll', { direction: "down" });
    await HomeScreen.game.click();
    await expect(Alertscreen.blockalertTitle).toHaveText(blockedTitle);
  });

  it('Self Exclusion User should not be able to open GAME (From Search) ', async () => {
    await HomeScreen.searchTextField.click();
    await HomeScreen.gameInSearch.click();
    await expect(Alertscreen.blockalertTitle).toHaveText(blockedTitle);
  });

  it('Self Exclusion User should not be able to open GAME (From Last Played) ', async () => {
    await HomeScreen.gameInLastPlayed.click();
    await expect(Alertscreen.blockalertTitle).toHaveText(blockedTitle);
  });

  it('Self Exclusion User should not be able to open P2P GAME', async () => {
    await HomeScreen.tableGames.click();
    await HomeScreen.backgammon.click();
    await expect(Alertscreen.blockalertTitle).toHaveText(blockedTitle);
  });

  it('Self Exclusion User should not be able to open Deposit page (From home) ', async () => {
    await HomeScreen.deposit.click();
    await expect(Alertscreen.blockalertTitle).toHaveText(blockedTitle);
  });

  it('Self Exclusion User should not be able to open Deposit page (From profile)', async () => {
    await HomeScreen.profile.click();
    await ProfileScreen.deposit.click();
    await expect(Alertscreen.blockalertTitle).toHaveText(blockedTitle);
  });

  it('Self Exclusion User should not be able to open Withdrawal page (From profile)', async () => {
    await HomeScreen.profile.click();
    await ProfileScreen.withdraw.click();
    await expect(Alertscreen.blockalertTitle).toHaveText(blockedTitle);
  });

  it('Self Exclusion User should not be able to Blocked Account', async () => {
    await HomeScreen.profile.click();
    await ProfileScreen.accountParameters.click();
    await ProfileScreen.accountBlocking.click();
    await expect(Alertscreen.blockalertTitle).toHaveText(blockedTitle);
  });

});

describe('Game Block Tests', () => {

  const username: string = 'gpgameblock';
  const password: string = '@Qwerty0';

  beforeEach(async () => {
    await driver.execute('mobile: terminateApp', { bundleId: 'com.adjarabet.Mobile' });
    await driver.execute('mobile: launchApp', { bundleId: 'com.adjarabet.Mobile' });
    await LoginScreen.guestLogin(username, password);
  });

  it('Game Block User should not be able to open GAME (From home) ', async () => {
    await driver.execute('mobile: scroll', { direction: "down" });
    await HomeScreen.game.click();
    await expect(Alertscreen.blockalertTitle).toHaveText(blockedTitle);
  });

  it('Game Block User should not be able to open GAME (From Search) ', async () => {
    await HomeScreen.searchTextField.click();
    await HomeScreen.gameInSearch.click();
    await expect(Alertscreen.blockalertTitle).toHaveText(blockedTitle);
  });

  it('Game Block User should not be able to open GAME (From Last Played) ', async () => {
    await HomeScreen.gameInLastPlayed.click();
    await expect(Alertscreen.blockalertTitle).toHaveText(blockedTitle);
  });

  it('Game Block User should not be able to open P2P GAME', async () => {
    await HomeScreen.tableGames.click();
    await HomeScreen.backgammon.click();
    await expect(Alertscreen.blockalertTitle).toHaveText(blockedTitle);
  });

});

describe('Withdaw Block Tests', () => {

  const username: string = 'gpwithdrawblock';
  const password: string = '@Qwerty0';

  beforeEach(async () => {
    await driver.execute('mobile: terminateApp', { bundleId: 'com.adjarabet.Mobile' });
    await driver.execute('mobile: launchApp', { bundleId: 'com.adjarabet.Mobile' });
    await LoginScreen.guestLogin(username, password);
  });

  it('Withdaw Block User should not be able to open Withdrawal page (From profile)', async () => {
    await HomeScreen.profile.click();
    await ProfileScreen.withdraw.click();
    await expect(Alertscreen.blockalertTitle).toHaveText(blockedTitle);
  });

});