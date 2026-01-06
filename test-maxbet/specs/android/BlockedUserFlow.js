const Alertscreen = require("../../screenObjects/android/Alert.screen");
const LoginScreen = require("../../screenObjects/android/Login.screen");
const HomeScreen = require("../../screenObjects/android/Home.screen");


const fullBlockText = "ანგარიში დროებით დაბლოკილია. დამატებითი ინფორმაციისთვის დაგვიკავშირდი ვებ-გვერდზე არსებული ჩატის ან ცხელი ხაზის მეშვეობით:   +995 32 2 71 10 10, +995 32 2 97 10 10";

describe('Authorization1', () => {

  beforeEach(async() => {
    await driver.reset();
  });

  it.only('FullBlock User should not be able to open GAME (From home) ', async () => {
    await LoginScreen.login('gpfullblock', '@Qwerty0');
    await HomeScreen.xButton.click();
    await HomeScreen.game.click();
    await expect(Alertscreen.blockalertText).toHaveText(fullBlockText);
  });

  it('FullBlock User should not be able to open GAME (From Search) ', async () => {
    await LoginScreen.login('gpfullblock', '@Qwerty0');
    await HomeScreen.xButton.click();
    await HomeScreen.searchTextField.click();
    await HomeScreen.gameInSearch.click();
    await expect(Alertscreen.blockalertText).toHaveText(fullBlockText);
  });
});
