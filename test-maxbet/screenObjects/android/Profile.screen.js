class Profilescreen {
    get deposit() {
        return $('~deposit');
      }
    
      get withdraw() {
        return $('~withdraw');
      }
    
      get chat() {
        return $('~chat');
      }
    
      get transactionHistory() {
        return $('~transactionHistory');
      }
    
      get bonuses() {
        return $('~bonuses');
      }
    
      get cards() {
        return $('~cards');
      }
    
      get account() {
        return $('~account');
      }
    
      get accountParameters() {
        return $('~accountParameters');
      }
      get faq() {
        return $('~contactButton');
      }
    
      get termsAndPrivacy() {
        return $('~termsAndPrivacy');
      }
    
      get balanceAmountLabel() {
        return $('~balanceAmountLabel');
      }
  }
  
  module.exports = new Profilescreen();
  // export default new Profilescreen();