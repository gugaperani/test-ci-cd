class Profilescreen {

  get balanceAmountLabel() {
    return $('~balanceAmountLabel');
  }

// Deposit

    get deposit() {
        return $('//XCUIElementTypeOther[@name="deposit"]');
      }


// Withdrawal

      get withdraw() {
        return $('~withdraw');
      }


// Online Chat
  
      get chat() {
        return $('~chat');
      }


// Trasaction History

      get transactionHistory() {
        return $('~transactionHistory');
      }

// My Bonuses
   
      get bonuses() {
        return $('~bonuses');
      }


// cards

      get cards() {
        return $('~cards');
      }
      get cardone() {
        return $('//XCUIElementTypeTable/XCUIElementTypeCell[1]/XCUIElementTypeOther/XCUIElementTypeOther');
      }
      get deletecard() {
        return $('//XCUIElementTypeButton[@name="წაშლა"]');
      }

      
// Account information
      
      get account() {
        return $('~account');
      }

      get passwordAccount() {
        return $('//XCUIElementTypeScrollView/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[2]/XCUIElementTypeOther[4]/XCUIElementTypeOther/XCUIElementTypeOther');
      }
      get currentPassword() {
        return $('~მიმდინარე პაროლი');
      }
      get newPassword() {
        return $('~ახალი პაროლი');
      }
      get confirmNewPassword() {
        return $('~დაადასტურე ახალი პაროლი');
      }
      get passwordChange() {
        return $('//XCUIElementTypeButton[@name="ᲞᲐᲠᲝᲚᲘᲡ ᲨᲔᲪᲕᲚᲐ"]');
      }
      get finishScroll() {
        return $('//XCUIElementTypeButton[@name="დასრულება"]');
      }

      get communicationLang() {
        return $('//XCUIElementTypeTextField');
      }




      get emailChange() {
        return $('//XCUIElementTypeScrollView/XCUIElementTypeOther[1]/XCUIElementTypeOther[3]/XCUIElementTypeOther[2]/XCUIElementTypeOther[1]/XCUIElementTypeOther');
      }
      get newEmail() {
        return $('//XCUIElementTypeApplication[@name="adjarabet"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[2]/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeScrollView/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther');
      }
      get emailPass() {
        return $('//XCUIElementTypeApplication[@name="adjarabet"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[2]/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeScrollView/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther');
      }
      get emailConfirm() {
        return $('//XCUIElementTypeButton[@name="ᲔᲚ. ᲤᲝᲡᲢᲘᲡ ᲨᲔᲪᲕᲚᲐ"]');
      }



      get adressChange() {
        return $('//XCUIElementTypeScrollView/XCUIElementTypeOther[1]/XCUIElementTypeOther[3]/XCUIElementTypeOther[4]/XCUIElementTypeOther[7]/XCUIElementTypeOther');
      }
      get newAdress() {
        return $('//XCUIElementTypeStaticText[@name="ახალი მისამართი"]');
      }
      get adressConfirm() {
        return $('//XCUIElementTypeButton[@name="ᲓᲐᲓᲐᲡᲢᲣᲠᲔᲑᲐ"]');
      }


// Account Settings

      get accountParameters() {
        return $('~accountParameters');
      }
      get passwordAccountParameters() {
        return $('~პაროლის შეცვლა');
      }
      get accountBlocking() {
        return $('//XCUIElementTypeTable/XCUIElementTypeCell[5]');
      }





      get highSecurityMode() {
        return $('//XCUIElementTypeTable/XCUIElementTypeCell[2]');
      }
      get switcher() {
        return $('//XCUIElementTypeSwitch[@value="0"]');
      }
      get otpField() {
        return $('//XCUIElementTypeScrollView/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeOther[1]');
      }
      get confirmOtp() {
        return $('//XCUIElementTypeButton[@name="ᲓᲐᲓᲐᲡᲢᲣᲠᲔᲑᲐ"]');
      }

      
// F.A.Q

      get faq() {
        return $('~contactButton');
      }


// Terms and conditions
   
      get termsAndPrivacy() {
        return $('~termsAndPrivacy');
      }

  }
  
  export default new Profilescreen();
