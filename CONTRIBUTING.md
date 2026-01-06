# Contributing to Native Apps Automation

Thank you for your interest in contributing! This document provides guidelines and best practices for contributing to this project.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Code Style](#code-style)
- [Project Architecture](#project-architecture)
- [Writing Tests](#writing-tests)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing Guidelines](#testing-guidelines)

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Java JDK 11+
- Xcode (for iOS testing)
- Android Studio (for Android testing)
- Appium 2.x

### Development Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd native-apps-automation
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

4. Install Appium drivers:

   ```bash
   npm run appium &
   appium driver install xcuitest
   appium driver install uiautomator2
   ```

5. Set up Git hooks:
   ```bash
   npm run prepare
   ```

## Code Style

This project uses ESLint and Prettier to maintain code quality and consistency.

### TypeScript Guidelines

- Use TypeScript for all new files
- Prefer interfaces over types
- Use explicit return types for public methods
- Avoid `any` type when possible
- Use meaningful variable and function names

### Formatting

- Single quotes for strings
- 2 spaces for indentation
- Semicolons required
- Max line length: 120 characters
- Trailing commas in multi-line objects/arrays

### Running Linters

```bash
# Check for linting errors
npm run lint

# Auto-fix linting errors
npm run lint:fix

# Check formatting
npm run format:check

# Auto-format code
npm run format
```

## Project Architecture

### Directory Structure

```
├── helpers/                    # Reusable helper utilities
│   ├── adjarabet/             # App-specific helpers
│   │   ├── auth.api.ts        # API authentication
│   │   ├── auth.helper.ts     # Deep link auth
│   │   ├── awsS3Helper.ts     # AWS Secrets Manager
│   │   └── navigation.helper.ts
│   └── waits.helper.ts        # Wait strategies
├── testData/                  # Test data management
│   └── users.ts               # User registry
├── test-adjarabet/            # Adjarabet test suite
│   ├── screenObjects/         # Page Object Model
│   │   ├── ios/
│   │   └── android/
│   └── specs/                 # Test specifications
│       ├── ios/
│       └── android/
└── wdio.conf.ts               # WebdriverIO configuration
```

### Design Patterns

1. **Page Object Model (POM)**
   - One class per screen
   - Export as singleton instance
   - Getters for UI elements
   - Methods for user actions

2. **Helper Pattern**
   - Reusable utilities in `helpers/`
   - Single responsibility
   - Well-documented functions

3. **Test Data Management**
   - Centralized in `testData/`
   - Type-safe constants
   - Metadata for expected behavior

## Writing Tests

### Test Structure

Follow the AAA pattern (Arrange, Act, Assert):

```typescript
it('should display error for invalid credentials', async () => {
  // Arrange
  const user = TestUsers.INVALID_USER;

  // Act
  await LoginScreen.login(user);

  // Assert
  await expect(LoginScreen.errorMessage).toBeDisplayed();
});
```

### Naming Conventions

- Test files: `*.ts` in `specs/` directory
- Test suites: `describe('Feature name', () => {})`
- Test cases: `it('should do something specific', async () => {})`
- Use descriptive names that explain the expected behavior

### Best Practices

1. **One Assertion Per Test**
   - Each test should verify one specific behavior
   - Makes failures easier to diagnose

2. **Use Wait Strategies**
   - Always use explicit waits from `waits.helper.ts`
   - Never use hard sleeps except when absolutely necessary
   - Provide meaningful timeout messages

   ```typescript
   await waits.waitForDisplayed(element, 10000, 'Element not displayed after login');
   ```

3. **Use Test Data Constants**
   - Reference users from `testData/users.ts`
   - Never hardcode usernames/passwords

   ```typescript
   await LoginScreen.login(TestUsers.STANDARD_USER);
   ```

4. **Clean Up After Tests**
   - Use `afterEach()` to logout or reset state
   - Ensure tests don't affect each other

5. **Error Handling**
   - Handle optional dialogs gracefully
   - Provide clear error messages
   - Don't swallow errors silently

### Screen Objects

When creating or modifying screen objects:

1. **Element Selectors**
   - Prefer accessibility IDs (`~elementId`)
   - Avoid text-based selectors (breaks with localization)
   - Use descriptive getter names

   ```typescript
   get loginButton() {
     return $('~LoginViewController_loginButton');
   }
   ```

2. **Methods**
   - Keep methods focused and reusable
   - Use async/await
   - Add JSDoc comments for public methods
   - Include explicit waits

   ```typescript
   /**
    * Login with user credentials
    * @param userKey - User key from test data
    */
   async login(userKey: string): Promise<void> {
     await waits.waitForDisplayed(this.usernameField);
     // ... implementation
   }
   ```

3. **Don't Mix Concerns**
   - Screen objects should only handle UI interactions
   - Keep AWS/API logic in helpers
   - Don't put test assertions in screen objects

## Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `chore`: Maintenance tasks

### Examples

```
feat(auth): add deep link authentication support

Implement deep link auth flow using API tokens.
This allows faster test execution by skipping UI login.

Closes #123
```

```
fix(waits): handle timeout errors gracefully

Add proper error handling in waitForDisplayed helper.
Previously, timeout errors would cause test crashes.
```

### Git Hooks

Pre-commit hooks will automatically:

- Run ESLint and fix issues
- Format code with Prettier
- Prevent commits with `.only()` in tests

## Pull Request Process

1. **Create a Feature Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Write clean, well-documented code
   - Add tests for new features
   - Update documentation if needed

3. **Test Your Changes**

   ```bash
   npm run lint
   npm run test
   ```

4. **Commit Your Changes**
   - Follow commit message guidelines
   - Make small, focused commits

5. **Push and Create PR**

   ```bash
   git push origin feature/your-feature-name
   ```

   - Use the PR template
   - Link related issues
   - Request reviews

6. **Code Review**
   - Address reviewer comments
   - Keep PR updated with main branch
   - Ensure CI passes

7. **Merge**
   - Squash and merge for clean history
   - Delete branch after merge

## Testing Guidelines

### Running Tests

```bash
# Run all tests
npm test

# Run iOS tests
npm run test:ios

# Run Android tests
npm run test:android

# Run specific test file
npx wdio wdio.conf.ts --spec ./test-adjarabet/specs/ios/Authorization.ts
```

### Test Data

- Never commit real credentials
- Use AWS Secrets Manager for sensitive data
- Document required test data in README

### Debugging

1. **Increase Log Verbosity**
   - Set `LOG_LEVEL=trace` in `.env`

2. **Use Appium Inspector**
   - Connect to running Appium session
   - Inspect element selectors

3. **Screenshots**
   - Take screenshots on failure
   - Save to `screenshots/` directory

4. **Video Recording**
   - Enable video recording for CI
   - Upload artifacts on failure

## Questions?

If you have questions or need help, please:

- Open an issue on GitHub
- Contact the maintainers
- Check existing documentation

Thank you for contributing!
