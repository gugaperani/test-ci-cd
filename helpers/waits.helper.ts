/**
 * Reusable wait strategies for WebdriverIO tests
 * Provides explicit waits with meaningful error messages
 */

type ElementType = WebdriverIO.Element | ChainablePromiseElement<WebdriverIO.Element>;

class WaitsHelper {
  /**
   * Default timeout for wait operations (in milliseconds)
   */
  private readonly defaultTimeout: number = parseInt(process.env.DEFAULT_TIMEOUT || '10000');

  /**
   * Wait for element to be displayed
   * @param element - WebdriverIO element
   * @param timeout - Custom timeout in milliseconds
   * @param errorMessage - Custom error message
   */
  async waitForDisplayed(
    element: ElementType,
    timeout: number = this.defaultTimeout,
    errorMessage?: string
  ): Promise<void> {
    await element.waitForDisplayed({
      timeout,
      timeoutMsg: errorMessage || `Element not displayed after ${timeout}ms`,
    });
  }

  /**
   * Wait for element to be clickable (displayed + enabled)
   * @param element - WebdriverIO element
   * @param timeout - Custom timeout in milliseconds
   * @param errorMessage - Custom error message
   */
  async waitForClickable(
    element: ElementType,
    timeout: number = this.defaultTimeout,
    errorMessage?: string
  ): Promise<void> {
    await element.waitForDisplayed({
      timeout,
      timeoutMsg: errorMessage || `Element not displayed after ${timeout}ms`,
    });
    await element.waitForEnabled({
      timeout,
      timeoutMsg: errorMessage || `Element not enabled after ${timeout}ms`,
    });
  }

  /**
   * Wait for element to disappear
   * @param element - WebdriverIO element
   * @param timeout - Custom timeout in milliseconds
   * @param errorMessage - Custom error message
   */
  async waitForNotDisplayed(
    element: ElementType,
    timeout: number = this.defaultTimeout,
    errorMessage?: string
  ): Promise<void> {
    await element.waitForDisplayed({
      timeout,
      reverse: true,
      timeoutMsg: errorMessage || `Element still displayed after ${timeout}ms`,
    });
  }

  /**
   * Wait for element to exist in DOM
   * @param element - WebdriverIO element
   * @param timeout - Custom timeout in milliseconds
   * @param errorMessage - Custom error message
   */
  async waitForExist(
    element: ElementType,
    timeout: number = this.defaultTimeout,
    errorMessage?: string
  ): Promise<void> {
    await element.waitForExist({
      timeout,
      timeoutMsg: errorMessage || `Element does not exist after ${timeout}ms`,
    });
  }

  /**
   * Wait for element text to match expected value
   * @param element - WebdriverIO element
   * @param expectedText - Expected text value
   * @param timeout - Custom timeout in milliseconds
   * @param errorMessage - Custom error message
   */
  async waitForTextToMatch(
    element: ElementType,
    expectedText: string,
    timeout: number = this.defaultTimeout,
    errorMessage?: string
  ): Promise<void> {
    await browser.waitUntil(
      async () => {
        const actualText = await element.getText();
        return actualText === expectedText;
      },
      {
        timeout,
        timeoutMsg: errorMessage || `Element text does not match "${expectedText}" after ${timeout}ms`,
      }
    );
  }

  /**
   * Wait for element text to contain expected substring
   * @param element - WebdriverIO element
   * @param expectedSubstring - Expected substring
   * @param timeout - Custom timeout in milliseconds
   * @param errorMessage - Custom error message
   */
  async waitForTextToContain(
    element: ElementType,
    expectedSubstring: string,
    timeout: number = this.defaultTimeout,
    errorMessage?: string
  ): Promise<void> {
    await browser.waitUntil(
      async () => {
        const actualText = await element.getText();
        return actualText.includes(expectedSubstring);
      },
      {
        timeout,
        timeoutMsg: errorMessage || `Element text does not contain "${expectedSubstring}" after ${timeout}ms`,
      }
    );
  }

  /**
   * Wait for element attribute to have specific value
   * @param element - WebdriverIO element
   * @param attribute - Attribute name
   * @param expectedValue - Expected attribute value
   * @param timeout - Custom timeout in milliseconds
   * @param errorMessage - Custom error message
   */
  async waitForAttributeValue(
    element: ElementType,
    attribute: string,
    expectedValue: string,
    timeout: number = this.defaultTimeout,
    errorMessage?: string
  ): Promise<void> {
    await browser.waitUntil(
      async () => {
        const actualValue = await element.getAttribute(attribute);
        return actualValue === expectedValue;
      },
      {
        timeout,
        timeoutMsg:
          errorMessage || `Element attribute "${attribute}" does not equal "${expectedValue}" after ${timeout}ms`,
      }
    );
  }

  /**
   * Wait for custom condition
   * @param condition - Async function that returns boolean
   * @param timeout - Custom timeout in milliseconds
   * @param errorMessage - Custom error message
   */
  async waitForCondition(
    condition: () => Promise<boolean>,
    timeout: number = this.defaultTimeout,
    errorMessage?: string
  ): Promise<void> {
    await browser.waitUntil(condition, {
      timeout,
      timeoutMsg: errorMessage || `Condition not met after ${timeout}ms`,
    });
  }

  /**
   * Wait for URL to contain expected substring
   * @param expectedSubstring - Expected URL substring
   * @param timeout - Custom timeout in milliseconds
   * @param errorMessage - Custom error message
   */
  async waitForUrlToContain(
    expectedSubstring: string,
    timeout: number = this.defaultTimeout,
    errorMessage?: string
  ): Promise<void> {
    await browser.waitUntil(
      async () => {
        const currentUrl = await browser.getUrl();
        return currentUrl.includes(expectedSubstring);
      },
      {
        timeout,
        timeoutMsg: errorMessage || `URL does not contain "${expectedSubstring}" after ${timeout}ms`,
      }
    );
  }

  /**
   * Wait for element to be enabled
   * @param element - WebdriverIO element
   * @param timeout - Custom timeout in milliseconds
   * @param errorMessage - Custom error message
   */
  async waitForEnabled(
    element: ElementType,
    timeout: number = this.defaultTimeout,
    errorMessage?: string
  ): Promise<void> {
    await element.waitForEnabled({
      timeout,
      timeoutMsg: errorMessage || `Element not enabled after ${timeout}ms`,
    });
  }

  /**
   * Wait for element to be disabled
   * @param element - WebdriverIO element
   * @param timeout - Custom timeout in milliseconds
   * @param errorMessage - Custom error message
   */
  async waitForDisabled(
    element: ElementType,
    timeout: number = this.defaultTimeout,
    errorMessage?: string
  ): Promise<void> {
    await element.waitForEnabled({
      timeout,
      reverse: true,
      timeoutMsg: errorMessage || `Element still enabled after ${timeout}ms`,
    });
  }

  /**
   * Hard wait (sleep) - Use sparingly, prefer explicit waits
   * @param ms - Milliseconds to wait
   */
  async sleep(ms: number): Promise<void> {
    await browser.pause(ms);
  }

  /**
   * Wait for element count to match expected
   * @param selector - Element selector
   * @param expectedCount - Expected number of elements
   * @param timeout - Custom timeout in milliseconds
   * @param errorMessage - Custom error message
   */
  async waitForElementCount(
    selector: string,
    expectedCount: number,
    timeout: number = this.defaultTimeout,
    errorMessage?: string
  ): Promise<void> {
    await browser.waitUntil(
      async () => {
        const elements = await $$(selector);
        return elements.length === expectedCount;
      },
      {
        timeout,
        timeoutMsg: errorMessage || `Element count does not match ${expectedCount} after ${timeout}ms`,
      }
    );
  }

  /**
   * Wait for alert to be present
   * @param timeout - Custom timeout in milliseconds
   * @param errorMessage - Custom error message
   */
  async waitForAlert(timeout: number = this.defaultTimeout, errorMessage?: string): Promise<void> {
    await browser.waitUntil(
      async () => {
        try {
          await driver.getAlertText();
          return true;
        } catch {
          return false;
        }
      },
      {
        timeout,
        timeoutMsg: errorMessage || `Alert not present after ${timeout}ms`,
      }
    );
  }

  /**
   * Wait for element to be selected (checkbox/radio)
   * @param element - WebdriverIO element
   * @param timeout - Custom timeout in milliseconds
   * @param errorMessage - Custom error message
   */
  async waitForSelected(
    element: ElementType,
    timeout: number = this.defaultTimeout,
    errorMessage?: string
  ): Promise<void> {
    await browser.waitUntil(async () => await element.isSelected(), {
      timeout,
      timeoutMsg: errorMessage || `Element not selected after ${timeout}ms`,
    });
  }
}

export const waits = new WaitsHelper();
