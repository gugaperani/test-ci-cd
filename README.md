# Native Apps Automation Framework

Mobile test automation framework for iOS and Android applications using WebdriverIO and Appium. Currently supports testing for Adjarabet and Maxbet betting platforms.

## Features

- **Multi-Platform Support**: iOS and Android test execution
- **Page Object Model**: Clean separation of test logic and UI interactions
- **AWS Integration**: Secure credential management via AWS Secrets Manager
- **Deep Link Authentication**: Fast test execution via mobile deep links
- **Type-Safe**: Full TypeScript support with strict type checking
- **CI/CD Ready**: GitHub Actions workflows included
- **Code Quality**: ESLint, Prettier, and Husky pre-commit hooks
- **Comprehensive Reporting**: Allure reports with test history
- **Reusable Helpers**: Wait strategies, navigation, and API utilities

## Tech Stack

| Component          | Technology          | Version                         |
| ------------------ | ------------------- | ------------------------------- |
| Test Framework     | WebdriverIO         | 9.1.1                           |
| Mobile Automation  | Appium              | 2.11.5                          |
| Test Runner        | Mocha               | (via @wdio/mocha-framework)     |
| Language           | TypeScript          | 5.9.2                           |
| iOS Driver         | XCUITest            | 7.35.1                          |
| Android Driver     | UIAutomator2        | 3.8.0                           |
| Secrets Management | AWS Secrets Manager | @aws-sdk/client-secrets-manager |
| CI/CD              | GitHub Actions      | -                               |

## Project Structure

```
native-apps-automation/
├── .github/
│   └── workflows/          # CI/CD pipelines
├── app/                    # Mobile app binaries (.app, .apk)
├── config/                 # Alternative platform configs
├── helpers/                # Reusable utilities
│   ├── adjarabet/
│   │   ├── auth.api.ts    # API authentication
│   │   ├── auth.helper.ts # Deep link authentication
│   │   ├── awsS3Helper.ts # AWS Secrets Manager client
│   │   └── navigation.helper.ts
│   └── waits.helper.ts    # Explicit wait strategies
├── testData/
│   └── users.ts           # Centralized test user registry
├── test-adjarabet/
│   ├── screenObjects/     # Page Object Model
│   │   ├── ios/
│   │   └── android/
│   └── specs/             # Test specifications
│       ├── ios/
│       └── android/
├── test-maxbet/           # Maxbet test suite
├── .env.example           # Environment variables template
├── .eslintrc.json         # ESLint configuration
├── .prettierrc.json       # Prettier configuration
├── wdio.conf.ts           # Main WebdriverIO config
├── tsconfig.json          # TypeScript configuration
├── package.json           # Dependencies and scripts
├── CONTRIBUTING.md        # Contribution guidelines
└── README.md              # This file
```

## Prerequisites

### System Requirements

- **Node.js**: 16.x or higher
- **npm**: 8.x or higher
- **Java JDK**: 11 or higher
- **Xcode**: (for iOS) Latest stable version
- **Android Studio**: (for Android) Latest stable version
- **Appium**: 2.x

### Environment Setup

#### macOS (for iOS Testing)

1. Install Xcode from App Store
2. Install Xcode Command Line Tools:
   ```bash
   xcode-select --install
   ```
3. Install Carthage:
   ```bash
   brew install carthage
   ```

#### Android Setup (All Platforms)

1. Install Android Studio
2. Set up ANDROID_HOME environment variable:
   ```bash
   export ANDROID_HOME=/Users/[USER]/Library/Android/sdk
   export PATH=$ANDROID_HOME/platform-tools:$PATH
   export PATH=$ANDROID_HOME/tools:$PATH
   ```

#### Java Setup

```bash
# Install OpenJDK (macOS)
brew install openjdk@11

# Set JAVA_HOME
export JAVA_HOME=$(/usr/libexec/java_home)
```

## Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd native-apps-automation
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Install Appium globally**:

   ```bash
   npm install -g appium@next
   ```

4. **Install Appium drivers**:

   ```bash
   appium driver install xcuitest
   appium driver install uiautomator2
   ```

5. **Verify Appium installation**:

   ```bash
   appium driver list
   appium-doctor  # Optional: Check system requirements
   ```

6. **Set up environment variables**:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your credentials (see [Configuration](#configuration))

7. **Set up Git hooks**:
   ```bash
   npm run prepare
   ```

## Configuration

### Environment Variables

Create a `.env` file based on `.env.example`:

```bash
# AWS Configuration (required)
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=eu-central-1
AWS_SECRET_NAME=users-ABMobile

# API Configuration (required)
API_BASE_URL=https://api.adjarabet.com
APP_DEEP_LINK_SCHEME=adjarabet

# iOS Configuration
IOS_BUNDLE_ID=com.adjarabet.Mobile
IOS_PLATFORM_VERSION=18.2
IOS_DEVICE_NAME=iPhone 16 Pro

# Android Configuration
ANDROID_PACKAGE=com.adjarabet
ANDROID_PLATFORM_VERSION=14
ANDROID_DEVICE_NAME=Pixel 5 API 34

# Test Configuration
DEFAULT_TIMEOUT=10000
LOG_LEVEL=trace

# Optional: TestRail Integration
TESTRAIL_DOMAIN=your-instance.testrail.io
TESTRAIL_USERNAME=your-email@example.com
TESTRAIL_API_TOKEN=your-api-token
```

### AWS Secrets Manager

User credentials are stored in AWS Secrets Manager as JSON:

```json
{
  "testUser0": {
    "username": "user@example.com",
    "password": "password123"
  },
  "fullBlockUser": {
    "username": "blocked@example.com",
    "password": "password123"
  }
}
```

## Usage

### Running Tests

```bash
# Run all iOS tests
npm run test:ios

# Run all Android tests
npm run test:android

# Run all tests (default iOS)
npm test

# Run specific test file
npx wdio wdio.conf.ts --spec ./test-adjarabet/specs/ios/Authorization.ts

# Run with specific configuration
npm run test:ios:adjarabet
```

### Starting Appium Server

```bash
# Start Appium in foreground
npm run appium

# Or manually
appium --allow-insecure chromedriver_autodownload
```

### Code Quality

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Check formatting
npm run format:check

# Format code
npm run format
```

## Test Data Management

Test users are centrally managed in `testData/users.ts`:

```typescript
import { TestUsers } from '../testData/users';

// Use in tests
await LoginScreen.login(TestUsers.STANDARD_USER);
await LoginScreen.login(TestUsers.FULL_BLOCK_USER);
```

User metadata includes expected behavior:

- `canLogin`: Whether user should successfully log in
- `expectedErrorMessage`: Expected error message for blocked users
- `description`: User role description

## Writing Tests

### Example Test

```typescript
import 'dotenv/config';
import LoginScreen from '../../screenObjects/ios/Login.screen';
import { TestUsers } from '../../../testData/users';
import { waits } from '../../../helpers/waits.helper';

describe('Login Flow', () => {
  beforeEach(async () => {
    const bundleId = process.env.IOS_BUNDLE_ID || 'com.adjarabet.Mobile';
    await driver.execute('mobile: terminateApp', { bundleId });
    await driver.execute('mobile: launchApp', { bundleId });
    await LoginScreen.waitForLoaded();
  });

  it('should login successfully with valid credentials', async () => {
    await LoginScreen.login(TestUsers.STANDARD_USER);
    await waits.waitForDisplayed(HomeScreen.welcomeMessage);
    await expect(HomeScreen.welcomeMessage).toBeDisplayed();
  });
});
```

### Best Practices

1. **Use explicit waits**: Always use `waits.helper.ts` functions
2. **Use test data constants**: Reference `TestUsers` instead of hardcoding
3. **One assertion per test**: Keep tests focused
4. **Clean up after tests**: Use `afterEach()` for logout/cleanup
5. **Meaningful test names**: Describe expected behavior clearly

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

## CI/CD

### GitHub Actions

The project includes automated CI/CD pipelines:

- **Lint Job**: Code quality checks (ESLint, Prettier)
- **iOS Tests**: Run on macOS runners
- **Android Tests**: Run on macOS runners
- **Allure Reports**: Automatically generated and published to GitHub Pages

### Triggering CI

```bash
# Trigger iOS tests
git commit -m "feat: add login test [test-ios]"

# Trigger Android tests
git commit -m "fix: update selectors [test-android]"

# Manual trigger via GitHub UI
# Navigate to Actions tab -> Select workflow -> Run workflow
```

### Required GitHub Secrets

Configure these in repository settings:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `AWS_SECRET_NAME`
- `API_BASE_URL`
- `APP_DEEP_LINK_SCHEME`
- `IOS_BUNDLE_ID`
- `ANDROID_PACKAGE`

## Troubleshooting

### Common Issues

**Appium server not starting**:

```bash
# Kill existing Appium processes
killall node
# Start fresh
appium --allow-insecure chromedriver_autodownload
```

**iOS simulator not found**:

```bash
# List available simulators
xcrun simctl list devices available

# Boot simulator manually
xcrun simctl boot "iPhone 16 Pro"
```

**Android emulator issues**:

```bash
# List available emulators
emulator -list-avds

# Start emulator
emulator -avd Pixel_5_API_34
```

**AWS credentials error**:

- Verify `.env` file contains correct AWS credentials
- Check AWS IAM permissions for Secrets Manager access
- Ensure secret name matches `AWS_SECRET_NAME`

**Element not found**:

- Use Appium Inspector to verify selectors
- Check if element uses accessibility ID
- Verify app is in correct state before interaction

## Documentation

- [Contributing Guidelines](./CONTRIBUTING.md)
- [WebdriverIO Docs](https://webdriver.io/docs/gettingstarted)
- [Appium Documentation](https://appium.io/docs/en/2.0/)
- [Allure Reports](https://docs.qameta.io/allure/)

## Support

- Report issues: [GitHub Issues](<repository-url>/issues)
- Questions: Contact project maintainers
- Documentation: See `docs/` folder

## License

[Specify your license here]

## Contributors

[List contributors or link to contributors page]

---

**Maintained by**: [Your Team Name]
**Last Updated**: 2026-01-06
