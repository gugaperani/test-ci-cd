class AlertAndModulscreen {

// Popup Elements
  get popupTitle(){
    return $('~PopupView_titleLabel');
  }
  get popupDescription(){
    return $('~PopupView_descriptionLabel');
  }
  get popupOnlineChat(){
    return $('~firstButton');
  }
  get popupGotIt(){
    return $('~secondButton');
  }

//  Module Elements
  get mouduleTitle() {
    return $('titleLabel');
  }
    get moduleDescription() {
    return $('descriptionLabel');
  }
    get AddNumberButton() {
    return $('addPhoneButton');
  }
    get moduleLogoutButton() {
    return $('logoutButton');
  }

}


export default new AlertAndModulscreen();
