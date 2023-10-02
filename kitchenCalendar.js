class KitchenCalendar {
  constructor(options) {
    this.container = options.containerElement || document.createElement("div");
    this.initialize()
  }
  async initialize() {
    // testing dayjs
    document.querySelector('.calendar').innerHTML = "this month has " + 
    dayjs(new Date()).daysInMonth() + "days";
  }
  drawCalendar() {}
  reset() {}
  refresh() {}
  async getData() {}
  openEvent() {}
  validate(App) {}
}
