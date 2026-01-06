import HomeScreen from "../../screenObjects/ios/Home.screen";
import LoginScreen from "../../screenObjects/ios/Login.screen";
import AlertAndModulscreen from "../../screenObjects/ios/Alert&Modul.screen";

const blockedTitle: string = "ანგარიში დაბლოკილია";
const blockedDescription: string = "ანგარიში დროებით დაბლოკილია. დამატებითი ინფორმაციისთვის დაგვიკავშირდი ჩათის ან ცხელი ხაზის მეშვეობით: +995 32 2 71 10 10 +995 32 2 97 10 10";

describe('Full Block Tests', () => {

  beforeEach(async () => {
    await driver.execute('mobile: terminateApp', { bundleId: 'com.adjarabet.Mobile' });
    await driver.execute('mobile: launchApp', { bundleId: 'com.adjarabet.Mobile' });
    // await LoginScreen.guestLogin(username, password);
  });

  it.only('C177636 Verify that, FullBlock User should not be able to open Deposit page home page', async () => {
    await LoginScreen.login('', '');
    await LoginScreen.xButton.click();
    await HomeScreen.notNow.click();
    await HomeScreen.deposit.click();
    await expect(AlertAndModulscreen.alertText).toHaveText(blockedDescription);
  });
});