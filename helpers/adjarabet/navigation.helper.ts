class NavigationHelper {
  async goHome() {
    await browser.url("/home");
  }

  async goToDeposit() {
    await this.goHome();
    await $('#depositBtn').click();
  }
}

export const Navigation = new NavigationHelper();