/**
 * Test Data Registry for User Roles
 * Central location for all test user identifiers
 * These keys correspond to users stored in AWS Secrets Manager
 */

export const TestUsers = {
  // Standard test users
  STANDARD_USER: 'testUser1',
  TEST_USER_1: 'testUser1',
  TEST_USER_2: 'testUser2',

  // Blocked/Restricted users
  FULL_BLOCK_USER: 'fullBlockUser',

  // Verification status users
  UNVERIFIED_USER: 'unverifiedUser',
  VERIFIED_USER: 'verifiedUser',

  // Document/Age verification users
  RESIDENT_USER: 'residentUser',
  UNDER_AGE_USER: 'underAgeUser',
  EXPIRED_MANDATORY_USER: 'expiredMandatoryUser',
  EXPIRED_OPTIONAL_USER: 'expiredOptionalUser',

  // Phone verification users
  NO_PHONE_USER: 'noPhoneUser',
  UNVERIFIED_PHONE_USER: 'unverifiedPhoneUser',

  // OTP users
  MANDATORY_OTP_USER: 'mandatoryOtpUser',
  OPTIONAL_OTP_USER: 'optionalOtpUser',

  // SDA (Self-Disclosure Agreement) users
  MANDATORY_SDA_USER: 'mandatorySdaUser',
  OPTIONAL_SDA_USER: 'optionalSdaUser',
} as const;

/**
 * User Role Types
 * Describes the restriction or verification status of each user type
 */
export enum UserRoleType {
  STANDARD = 'STANDARD',
  BLOCKED = 'BLOCKED',
  UNVERIFIED = 'UNVERIFIED',
  RESIDENT = 'RESIDENT',
  UNDER_AGE = 'UNDER_AGE',
  NO_PHONE = 'NO_PHONE',
  UNVERIFIED_PHONE = 'UNVERIFIED_PHONE',
  MANDATORY_OTP = 'MANDATORY_OTP',
  OPTIONAL_OTP = 'OPTIONAL_OTP',
  MANDATORY_SDA = 'MANDATORY_SDA',
  OPTIONAL_SDA = 'OPTIONAL_SDA',
  EXPIRED_MANDATORY = 'EXPIRED_MANDATORY',
  EXPIRED_OPTIONAL = 'EXPIRED_OPTIONAL',
}

/**
 * User metadata including expected behavior
 */
export interface UserMetadata {
  userKey: string;
  roleType: UserRoleType;
  canLogin: boolean;
  expectedErrorMessage?: string;
  description: string;
}

/**
 * User metadata registry
 * Maps user keys to their expected behavior and restrictions
 */
export const UserMetadataRegistry: Record<string, UserMetadata> = {
  [TestUsers.STANDARD_USER]: {
    userKey: TestUsers.STANDARD_USER,
    roleType: UserRoleType.STANDARD,
    canLogin: true,
    description: 'Standard user with full access',
  },
  [TestUsers.FULL_BLOCK_USER]: {
    userKey: TestUsers.FULL_BLOCK_USER,
    roleType: UserRoleType.BLOCKED,
    canLogin: false,
    description: 'Fully blocked user, cannot access app',
  },
  [TestUsers.UNVERIFIED_USER]: {
    userKey: TestUsers.UNVERIFIED_USER,
    roleType: UserRoleType.UNVERIFIED,
    canLogin: false,
    expectedErrorMessage: 'შესასვლელად, გაიარე ვერიფიკაცია ვებ-გვერდის მეშვეობით.',
    description: 'User who has not completed verification',
  },
  [TestUsers.RESIDENT_USER]: {
    userKey: TestUsers.RESIDENT_USER,
    roleType: UserRoleType.RESIDENT,
    canLogin: false,
    expectedErrorMessage: 'სამწუხაროდ, უცხო ქვეყნის მოქალაქისთვის აპლიკაცია ამჟამად მიუწვდომელია',
    description: 'Foreign resident, app not available',
  },
  [TestUsers.UNDER_AGE_USER]: {
    userKey: TestUsers.UNDER_AGE_USER,
    roleType: UserRoleType.UNDER_AGE,
    canLogin: false,
    expectedErrorMessage:
      'ახალი კანონმდებლობის მიხედვით, 1 მარტიდან  აპლიკაციითა და საიტით სარგებლობისთვის, მომხარებლის ასაკი უნდა იყოს 25 წელს ზევით.',
    description: 'User under minimum age requirement (25)',
  },
  [TestUsers.NO_PHONE_USER]: {
    userKey: TestUsers.NO_PHONE_USER,
    roleType: UserRoleType.NO_PHONE,
    canLogin: false,
    expectedErrorMessage: 'აპლიკაციით სარგებლობისთვის, საჭიროა ანგარიშზე დამატებული გქონდეს მობილურის ნომერი.',
    description: 'User without phone number on account',
  },
  [TestUsers.UNVERIFIED_PHONE_USER]: {
    userKey: TestUsers.UNVERIFIED_PHONE_USER,
    roleType: UserRoleType.UNVERIFIED_PHONE,
    canLogin: false,
    expectedErrorMessage: 'შესასვლელად, გაიარე ვერიფიკაცია ვებ-გვერდის მეშვეობით.',
    description: 'User with unverified phone number',
  },
  [TestUsers.MANDATORY_OTP_USER]: {
    userKey: TestUsers.MANDATORY_OTP_USER,
    roleType: UserRoleType.MANDATORY_OTP,
    canLogin: false,
    expectedErrorMessage:
      'ამჟამად შენი ანგარიში დაპაუზებულია. შესასვლელად, ხელახლა გაიარე მობილური ნომრის ვერიფიკაცია.',
    description: 'User required to reverify phone via OTP',
  },
  [TestUsers.OPTIONAL_OTP_USER]: {
    userKey: TestUsers.OPTIONAL_OTP_USER,
    roleType: UserRoleType.OPTIONAL_OTP,
    canLogin: true,
    expectedErrorMessage:
      'საკანონმდებლო რეგულაციებიდან გამომდინარე, ანგარიშზე წვდომა რომ არ შეგეზღუდოს მომავალში, ხელახლა გაიარე მობილური ნომრის ვერიფიკაცია.',
    description: 'User with optional OTP reverification prompt',
  },
  [TestUsers.MANDATORY_SDA_USER]: {
    userKey: TestUsers.MANDATORY_SDA_USER,
    roleType: UserRoleType.MANDATORY_SDA,
    canLogin: false,
    expectedErrorMessage:
      'ამჟამად შენი ანგარიში დაპაუზებულია. შესასვლელად, ხელახლა გაიარე ვერიფიკაცია და ბალანსზე დარჩენილი თანხა გაიტანე ვებ-გვერდიდან.',
    description: 'User must complete Self-Disclosure Agreement',
  },
  [TestUsers.OPTIONAL_SDA_USER]: {
    userKey: TestUsers.OPTIONAL_SDA_USER,
    roleType: UserRoleType.OPTIONAL_SDA,
    canLogin: true,
    expectedErrorMessage:
      'საკანონმდებლო რეგულაციებიდან გამომდინარე, ანგარიშზე წვდომა რომ არ შეგეზღუდოს მომავალში, ხელახლა გაიარე ვებ-გვერდიდან ვერიფიკაცია.',
    description: 'User with optional SDA reverification prompt',
  },
  [TestUsers.EXPIRED_MANDATORY_USER]: {
    userKey: TestUsers.EXPIRED_MANDATORY_USER,
    roleType: UserRoleType.EXPIRED_MANDATORY,
    canLogin: false,
    expectedErrorMessage: 'ამჟამად შენი ანგარიში დაპაუზებულია. შესასვლელად, ხელახლა გაიარე დოკუმენტის ვერიფიკაცია.',
    description: 'User with expired documents, mandatory reverification',
  },
  [TestUsers.EXPIRED_OPTIONAL_USER]: {
    userKey: TestUsers.EXPIRED_OPTIONAL_USER,
    roleType: UserRoleType.EXPIRED_OPTIONAL,
    canLogin: true,
    expectedErrorMessage:
      'დოკუმენტის მოქმედების ვადა იწურება. იმისათვის, რომ არ შეგეზღუდოს ანგარიშზე წვდომა მომავალში, გაიარე ვებ-გვერდით ვერიფიკაცია განახლებული დოკუმენტით.',
    description: 'User with expiring documents, optional reverification',
  },
};

/**
 * Helper function to get user metadata
 * @param userKey - User key from TestUsers
 * @returns User metadata object
 */
export function getUserMetadata(userKey: string): UserMetadata {
  const metadata = UserMetadataRegistry[userKey];
  if (!metadata) {
    throw new Error(`No metadata found for user: ${userKey}`);
  }
  return metadata;
}

/**
 * Get all users of a specific role type
 * @param roleType - The role type to filter by
 * @returns Array of user keys
 */
export function getUsersByRoleType(roleType: UserRoleType): string[] {
  return Object.values(UserMetadataRegistry)
    .filter((metadata) => metadata.roleType === roleType)
    .map((metadata) => metadata.userKey);
}

/**
 * Get all users who can successfully login
 * @returns Array of user keys
 */
export function getLoginableUsers(): string[] {
  return Object.values(UserMetadataRegistry)
    .filter((metadata) => metadata.canLogin)
    .map((metadata) => metadata.userKey);
}

/**
 * Get all users who cannot login
 * @returns Array of user keys
 */
export function getBlockedUsers(): string[] {
  return Object.values(UserMetadataRegistry)
    .filter((metadata) => !metadata.canLogin)
    .map((metadata) => metadata.userKey);
}
