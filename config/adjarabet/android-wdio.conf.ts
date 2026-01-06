// @ts-nocheck
import projectPath from "path";
import { config } from "../wdio.conf";


// Ports
config.port = 4723;



// Specify Test Files
config.specs = [
    '/Users/g.peranidze/Desktop/adjaraTest/test/specs/android/Authorization.js',
]



// Capabilities
config.capabilities = [{
        "platformName": "Android",
        "appium:platformVersion": "15",
        "appium:automationName": "UIAutomator2",
        "appium:device-name": "Pixel 9 Pro XL API 35",
        "appium:app": projectPath.join (process.cwd(), "app/adjarabet.apk"),
        "appium:appActivity": "LoginActivity",
        "appium:autoGrantPermissions": true,  // Set to true to automatically grant app permissions
        "appium:language": "ka",   // Set language to Georgian (language code "ka")
        "appium:locale": "GE"        
      }],


    //   config.capabilities = [{
    //     "platformName": "Android",
    //     "appium:platformVersion": "14",
    //     "appium:automationName": "UIAutomator2",
    //     "appium:device-name": "Galaxy A33 5G",
    //     "appium:app": projectPath.join (process.cwd(), "app/adjarabet.apk"),
    //     "appium:appActivity": "LoginActivity",
    //     "appium:autoGrantPermissions": true,  // Set to true to automatically grant app permissions
    //     "appium:language": "ka",   // Set language to Georgian (language code "ka")
    //     "appium:locale": "GE" 
    //   }],

  exports.config = config;