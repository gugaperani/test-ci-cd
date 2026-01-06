class Alertscreen {


  get blockalertTitle(){
    return $('~reusableAlertTitle');
  }
  get blockalertText(){
    return $('~reusableAlertDescription');
  }
  get blockalertActionButton(){
    return $('~reusableAlertFirstActionButton');
  }

}


module.exports = new Alertscreen();
// export default new Homescreen();