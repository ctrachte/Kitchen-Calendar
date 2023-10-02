class KitchenCalendar {
  constructor(options) {
    this.containerElement =
      options.containerElement || document.createElement("div");
    this.containerElement.classList.add("KitchenCalendarContainer");
    this.date = dayjs(new Date());
    this.reset()
    this.initialize();
  }
  async initialize() {
    // testing dayjs
    this.container = document.createElement("div");
    this.container.classList.add("daysContainer");
    this.header = `
      <div class="CalendarHeader">
        <h1>
        <span class="monthDecrease">
        <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><path d="m4.5 8.5-4-4 4-4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" transform="translate(7 6)"/></svg>
        </span>
        ${this.month}
        - 
        ${this.year}
        <span class="monthIncrease">
        <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><path d="m.5 8.5 4-4-4-4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" transform="translate(9 6)"/></svg>
        </span>
      </h1>
      </div>
    `;
    this.containerElement.innerHTML = this.header;
    this.containerElement.appendChild(this.container);
    //buttons
    this.addMonthButton = this.containerElement.querySelector('.monthIncrease');
    this.addMonthButton.addEventListener('click',()=> {this.increaseMonth()})
    this.subtractMonthButton = this.containerElement.querySelector('.monthDecrease');
    this.subtractMonthButton.addEventListener('click', ()=> {this.decreaseMonth()});

    for (let i = 1; i < this.daysInMonth + 1; i++) {
      let day = document.createElement("div");
      day.classList.add("calendar-border-wrap");
      day.innerHTML = `<div class='day day-${1}'>${i}</div>`;
      this.container.appendChild(day);
    }
  }
  getDayText(number) {
    if (typeof number === "string") number = parseInt(number);
    return this.daysInMonth[number + 1];
  }
  increaseMonth(){
    this.date = dayjs(this.date).add(1, "M");
    this.reset();
  }
  decreaseMonth() {
    this.date = dayjs(this.date).subtract(1, "M");
    this.day = this.date.format("dddd");
    this.month = this.date.format("MMMM");
    this.year = this.date.format("YYYY");
    this.daysInMonth = parseInt(this.date.daysInMonth());
    this.reset();
  }
  drawCalendar() {}
  reset() {
    this.day = this.date.format("dddd");
    this.month = this.date.format("MMMM");
    this.year = this.date.format("YYYY");
    this.daysInMonth = parseInt(this.date.daysInMonth());
    this.initialize();
  }
  refresh() {}
  async getData() {}
  openEvent() {}
  validate(App) {}
}
