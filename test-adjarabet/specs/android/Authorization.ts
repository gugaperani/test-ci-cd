// @ts-nocheck
import LoginScreen from "../../screenObjects/android/Login.screen";
import HomeScreen from "../../screenObjects/android/Home.screen";
// import ProfileScreen from "../../screenObjects/android/Profile.screen";


describe('Authorization', () => {

  beforeEach(async () => {
    await driver.reset();
  });

  it.only('Login with valid credentials (save user)', async () => {
    await LoginScreen.login('', '');
    // await expect(await LoginScreen.xButton.isDisplayed()).toBe(true);
    await LoginScreen.xButton.click();
  });

  it('UNVERIFIED users should not be able to authorise in the app', async () => {
    await LoginScreen.loginRestricted('', '');
    await expect(LoginScreen.restrictedModuleText).toHaveText("აპლიკაციაში შესასვლელად, გთხოვთ, გაიარო ვერიფიკაცია ვებ-გვერდის საშუალებით.");
  });

  it('RESIDENT users should not be able to authorise in the app', async () => {
    await LoginScreen.loginRestricted('', '');
    await expect(LoginScreen.restrictedModuleText).toHaveText("სამწუხაროდ, უცხო ქვეყნის მოქალაქისთვის აპლიკაცია ამჟამად მიუწვდომელია, მაგრამ მალე შეძლებ სარგებლობას");
  });

  it('UNDER AGE users should not be able to authorise in the app', async () => {
    await LoginScreen.loginRestricted('', '');
    await expect(LoginScreen.restrictedModuleText).toHaveText("ახალი კანონმდებლობის მიხედვით, 1 მარტიდან აპლიკაციითა და საიტით სარგებლობისთვის, მომხარებლის ასაკი უნდა იყოს 25 წელს ზევით.");
  });

  it('NO-PHONE users should not be able to authorise in the app', async () => {
    await LoginScreen.loginRestricted('', '');
    await expect(LoginScreen.restrictedModuleText).toHaveText("აპლიკაციით სარგებლობისთვის, საჭიროა ანგარიშზე დამატებული გქონდეს მობილურის ნომერი.");
  });

  it('UNVERIFIED PHONE NUMBER users should not be able to authorise in the app', async () => {
    await LoginScreen.loginRestricted('', '');
    await expect(LoginScreen.restrictedModuleText).toHaveText("აპლიკაციაში შესასვლელად, გთხოვთ, გაიარო ვერიფიკაცია ვებ-გვერდის საშუალებით.");
  });

  it('MANDATORY SDA users should not be able to authorise in the app', async () => {
    await LoginScreen.loginRestricted('', '');
    await expect(LoginScreen.restrictedModuleText).toHaveText("ამჟამად შენი ანგარიში დაპაუზებულია. შესასვლელად, ხელახლა გაიარე ვერიფიკაცია და ბალანსზე დარჩენილი თანხა გაიტანე ვებ-გვერდიდან.");
  });

  it('OPTIONAL SDA Reverification module come up When such a user log into the app', async () => {
    await LoginScreen.loginRestricted('', '');
    await expect(LoginScreen.restrictedModuleText).toHaveText("საკანონმდებლო რეგულაციებიდან გამომდინარე, ანგარიშზე წვდომა რომ არ შეგეზღუდოს მომავალში, ხელახლა გაიარე ვებ-გვერდიდან ვერიფიკაცია.");
  });

  it('MANDATORY OTP users should not be able to authorise in the app', async () => {
    await LoginScreen.loginRestricted('', '');
    await expect(LoginScreen.restrictedModuleText).toHaveText("ამჟამად შენი ანგარიში დაპაუზებულია. შესასვლელად, ხელახლა გაიარე მობილური ნომრის ვერიფიკაცია. ბალანსზე დარჩენილი თანხის გატანა შეგიძლია ვებ-გვერდიდან.");
  });

  it('OPTIONAL OTP Reverification module come up When such a user log into the app', async () => {
    await LoginScreen.loginRestricted('', '');
    await expect(LoginScreen.restrictedModuleText).toHaveText("საკანონმდებლო რეგულაციებიდან გამომდინარე, ანგარიშზე წვდომა რომ არ შეგეზღუდოს მომავალში, ხელახლა გაიარე მობილური ნომრის ვერიფიკაცია.");
  });

  it('EXPIRED MANDATORY users should not be able to authorise in the app', async () => {
    await LoginScreen.loginRestricted('', '');
    await expect(LoginScreen.restrictedModuleText).toHaveText("ამჟამად შენი ანგარიში დაპაუზებულია. შესასვლელად, ხელახლა გაიარე დოკუმენტის ვერიფიკაცია. ბალანსზე დარჩენილი თანხის გატანა შეგიძლია ვებ-გვერდიდან.");
  });

  it('EXPIRED OPTIONAL Reverification module come up When such a user log into the app', async () => {
    await LoginScreen.loginRestricted('', '');
    await expect(LoginScreen.restrictedModuleText).toHaveText("დოკუმენტის მოქმედების ვადა იწურება. იმისათვის, რომ არ შეგეზღუდოს ანგარიშზე წვდომა მომავალში, გაიარე ვებ-გვერდით ვერიფიკაცია განახლებული დოკუმენტით.");
  });
});

// Retained commented scenario for future reference
// it.only('\tVerify that, app language matches web-site language (from UNVERIFIED mudele)', async () => {
//   await LoginScreen.loginRestricted('', '');
//   await LoginScreen.verificationBtn.click();
//   await browser.pause(2000);
//   await expect(LoginScreen.webComponentKa).toHaveText("შესვლა");
//   await LoginScreen.backfromWeb.click();
//   await LoginScreen.xButton.click();
//   await LoginScreen.languageButton.click();
//   await LoginScreen.loginRestricted('gpiostest15', '@Qwerty0');
//   await LoginScreen.verificationBtn.click();
//   await browser.pause(1000);
//   await expect(LoginScreen.webComponentEn).toHaveText("LogIn");
//   await LoginScreen.backfromWeb.click();
//   await LoginScreen.xButton.click();
//   await LoginScreen.languageButton.click();
//   await LoginScreen.loginRestricted('gpiostest15', '@Qwerty0');
//   await LoginScreen.verificationBtn.click();
//   await browser.pause(1000);
//   await expect(LoginScreen.webComponentRu).toHaveText("Вход");
//   await browser.pause(1000);
// });
