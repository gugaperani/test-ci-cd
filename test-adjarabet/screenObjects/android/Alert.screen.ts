class AlertScreen {
  get blockalertTitle() {
    return $('~reusableAlertTitle');
  }
  get blockalertText(){
    return $('~reusableAlertDescription');
  }
  get blockalertActionButton(){
    return $('~reusableAlertFirstActionButton');
  }
}

export default new AlertScreen();