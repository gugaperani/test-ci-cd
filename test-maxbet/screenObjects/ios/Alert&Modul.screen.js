class AlertAndModulscreen {


  get alertTitle(){
    return $('~titleLabel');
  }
  get alertText(){
    return $('~descriptionLabel');
  }
  get alertOnlineChat(){
    return $('~firstButton');
  }
  get alertGotIt(){
    return $('~secondButton');
  }
  get blockalertTitle(){
    return $('~secondButton');
  }
}


module.exports = new AlertAndModulscreen();
// export default new Homescreen();