class HomeScreen {
  get slots() {
    return $('~slots');
  }

  get sportsBook() {
    return $('~sportsBook');
  }

  get promotions() {
    return $('~promotions');
  }

  get notifications() {
    return $('~notifications');
  }

  get profile() {
    return $('~პროფილი');
  }

  get searchTextField() {
    return $('~searchTextField');
  }

  get deposit() {
    return $('~deposit');
  }

  get lastPlayedSection() {
    return $('~lastPlayedSection');
  }

  get aviatorSection() {
    return $('~aviatorSection');
  }

  get slotsSection() {
    return $('~slotsSection');
  }

  get xButton() {
    return $('~dismiss');
  }

  get back() {
    return $('~back');
  }

  get game() {
    return $('(//android.widget.ImageView[@resource-id="com.adjarabet:id/uSlotImage"])[1]');
  }

  get gameInSearch() {
    return $('//androidx.recyclerview.widget.RecyclerView[@resource-id="com.adjarabet:id/searchSlotList"]/android.view.ViewGroup[1]');
  }
}

export default new HomeScreen();