// @ts-nocheck
import projectPath from "path";
import { config } from "../wdio.conf";

// Ports
config.port = 4723;

// Specify Test Files
config.specs = [
    "/Users/g.peranidze/Desktop/adjaraTest/test/specs/ios/Authorization.ts",
];

// Capabilities
config.capabilities = [{
    platformName: "iOS",
    "appium:platformVersion": "18.2",
    "appium:deviceName": "iPhone 16 Pro",
    "appium:app": "/Users/g.peranidze/Desktop/adjaraTest/app/adjarabet.app",
    "appium:automationName": "XCUITest",
    "appium:udid": "834B60BC-2370-453A-AD0A-4DA1267B41CD",
    "appium:fullReset": false,
    "appium:noReset": true,
}];

// Reporters
config.reporters = [
    "spec",
    ["testrail", {
        projectId: 20,
        suiteId: 483,
        domain: "aviator.testrail.io",
        username: "g.peranidze@adjarabet.com",
        apiToken: "VXv4XmKbqigbNL183ukc-5HlazFvaxvOpKXLC0UzY",
        runName: "Automation iOS Regresion",
        oneReport: true,
        includeAll: true
    }],
    ["allure", {
        outputDir: "allure-results",
        disableWebdriverStepsReporting: false,
        disableWebdriverScreenshotsReporting: false
    }]
];

export { config };


