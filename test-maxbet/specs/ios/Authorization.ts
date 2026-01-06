import HomeScreen from "../../screenObjects/ios/Home.screen";
import LoginScreen from "../../screenObjects/ios/Login.screen";
// import ProfileScreen from "../../screenObjects/both/Profile.screen";

describe('Authorization', () => {

  beforeEach(async () => {
    // Terminate the app before each test
    await driver.execute('mobile: terminateApp', { bundleId: 'com.adjarabet.Mobile' });
    // Launch the app after termination
    await driver.execute('mobile: launchApp', { bundleId: 'com.adjarabet.Mobile' });
  });

  it.only('C717948 Verify login with with a valid parameters', async () => {
    await LoginScreen.login('gpiostest1', '@Qwerty0');
    await LoginScreen.xButton.click();
    await HomeScreen.notNow.click();
    await expect(await HomeScreen.profile.isDisplayed()).toBe(true);
  });

  it('UNVERIFIED users should not be able to authorise in the app', async () => {
    await LoginScreen.loginRestricted('gpiostest15', '@Qwerty0');
    await expect(LoginScreen.ModuleDescription).toHaveText("შესასვლელად, გაიარე ვერიფიკაცია ვებ-გვერდის მეშვეობით.");
  });

  it('RESIDENT users should not be able to authorise in the app', async () => {
    await LoginScreen.loginRestricted('qat-usd3', 'Qwer123!');
    await expect(LoginScreen.ModuleDescription).toHaveText("სამწუხაროდ, უცხო ქვეყნის მოქალაქისთვის აპლიკაცია ამჟამად მიუწვდომელია, მაგრამ მალე შეძლებ სარგებლობას");
  });

  it('UNDER AGE users should not be able to authorise in the app', async () => {
    await LoginScreen.loginRestricted('perani', '@Guga_1997');
    await expect(LoginScreen.ModuleDescription).toHaveText("ახალი კანონმდებლობის მიხედვით, 1 მარტიდან  აპლიკაციითა და საიტით სარგებლობისთვის, მომხარებლის ასაკი უნდა იყოს 25 წელს ზევით.");
  });

  it('NO-PHONE users should not be able to authorise in the app', async () => {
    await LoginScreen.loginRestricted('gpiostest14', '@Qwerty0');
    await expect(LoginScreen.ModuleDescription).toHaveText("აპლიკაციით სარგებლობისთვის, საჭიროა ანგარიშზე დამატებული გქონდეს მობილურის ნომერი.");
  });

  it('UNVERIFIED PHONE NUMBER users should not be able to authorise in the app', async () => {
    await LoginScreen.loginRestricted('gpiostest15', '@Qwerty0');
    await expect(LoginScreen.ModuleDescription).toHaveText("შესასვლელად, გაიარე ვერიფიკაცია ვებ-გვერდის მეშვეობით.");
  });

  it('MANDATORY SDA users should not be able to authorise in the app', async () => {
    await LoginScreen.loginRestricted('gpmandatorysda', '@Qwerty0');
    await expect(LoginScreen.ModuleDescription).toHaveText("ამჟამად შენი ანგარიში დაპაუზებულია. შესასვლელად, ხელახლა გაიარე ვერიფიკაცია და ბალანსზე დარჩენილი თანხა გაიტანე ვებ-გვერდიდან.");
  });

  it('OPTIONAL SDA Reverification module come up When such a user log into the app', async () => {
    await LoginScreen.login('gpoptionalsda', '@Qwerty0');
    await LoginScreen.xButton.click();
    await HomeScreen.notNow.click();
    await expect(LoginScreen.ModuleDescription).toHaveText("საკანონმდებლო რეგულაციებიდან გამომდინარე, ანგარიშზე წვდომა რომ არ შეგეზღუდოს მომავალში, ხელახლა გაიარე ვებ-გვერდიდან ვერიფიკაცია.");
  });

  it('MANDATORY OTP users should not be able to authorise in the app', async () => {
    await LoginScreen.loginRestricted('gpmandatoryotp', '@Qwerty0');
    await expect(LoginScreen.ModuleDescription).toHaveText("ამჟამად შენი ანგარიში დაპაუზებულია. შესასვლელად, ხელახლა გაიარე მობილური ნომრის ვერიფიკაცია. ბალანსზე დარჩენილი თანხის გატანა შეგიძლია ვებ-გვერდიდან.");
  });

  it('OPTIONAL OTP Reverification module come up When such a user log into the app', async () => {
    await LoginScreen.login('gpoptionalotp', '@Qwerty0');
    await LoginScreen.xButton.click();
    await HomeScreen.notNow.click();
    await expect(LoginScreen.ModuleDescription).toHaveText("საკანონმდებლო რეგულაციებიდან გამომდინარე, ანგარიშზე წვდომა რომ არ შეგეზღუდოს მომავალში, ხელახლა გაიარე მობილური ნომრის ვერიფიკაცია.");
  });

  it('EXPIRED MANDATORY users should not be able to authorise in the app', async () => {
    await LoginScreen.loginRestricted('gpexpiredmandatory', '@Qwerty0');
    await expect(LoginScreen.ModuleDescription).toHaveText("ამჟამად შენი ანგარიში დაპაუზებულია. შესასვლელად, ხელახლა გაიარე დოკუმენტის ვერიფიკაცია. ბალანსზე დარჩენილი თანხის გატანა შეგიძლია ვებ-გვერდიდან.");
  });

  it('EXPIRED OPTIONAL Reverification module come up When such a user log into the app', async () => {
    await LoginScreen.login('gpexpiredoptional', '@Qwerty0');
    await LoginScreen.xButton.click();
    await HomeScreen.notNow.click();
    await expect(LoginScreen.ModuleDescription).toHaveText("დოკუმენტის მოქმედების ვადა იწურება. იმისათვის, რომ არ შეგეზღუდოს ანგარიშზე წვდომა მომავალში, გაიარე ვებ-გვერდით ვერიფიკაცია განახლებული დოკუმენტით.");
  });

});