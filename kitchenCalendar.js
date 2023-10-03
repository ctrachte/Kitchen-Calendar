class KitchenCalendar {
  constructor(options) {
    this.containerElement =
      options.containerElement || document.createElement("div");
    this.containerElement.classList.add("KitchenCalendarContainer");
    this.date = dayjs(new Date());
    this.data = options.data;
    this.reset();
    this.initialize();
  }
  async initialize() {
    // testing dayjs
    this.data = await this.data;
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
    this.addMonthButton = this.containerElement.querySelector(".monthIncrease");
    this.addMonthButton.addEventListener("click", () => {
      this.increaseMonth();
    });
    this.subtractMonthButton =
      this.containerElement.querySelector(".monthDecrease");
    this.subtractMonthButton.addEventListener("click", () => {
      this.decreaseMonth();
    });
    this.addDayElements();
    this.addLeadingTrailing();
  }
  addDayElements() {
    for (let i = 1; i < this.daysInMonth + 1; i++) {
      let day = document.createElement("div");
      day.classList.add("calendar-border-wrap");
      day.innerHTML = `<div class='day day-${1}'>${i}</div>`;
      this.container.appendChild(day);
    }
  }
  // gets leading/trailing dates for calendar UI
  addLeadingTrailing() {
    let month =
      parseInt(this.date.month()) === 1 || parseInt(this.date.month()) === 0
        ? 12
        : parseInt(this.date.month());
    let year =
      parseInt(this.date.month()) === 1 || parseInt(this.date.month()) === 0
        ? parseInt(this.date.year()) - 1
        : parseInt(this.date.year());
    let prevMonth = year + "-" + month;
    let daysInPrevMonth = parseInt(dayjs(prevMonth).daysInMonth());
    let leading = [];
    let trailing = [];
    for (let i = 1; i < 8; i++) {
      trailing.push(daysInPrevMonth);
      daysInPrevMonth--;
      leading.push(i);
    }
    this.leading = leading;
    this.trailing = trailing;
    let firstDayPos =
      this._weekdays.indexOf(this.date.date(1).format("dddd")) + 1;
    let lastDayPos =
      this._weekdays.indexOf(this.date.date(this.daysInMonth).format("dddd")) +
      1;
    //add last months trailing days to calendar
    if (this.trailing) {
      this.trailing.reverse();
      for (let i = firstDayPos - 1; i > 0; i--) {
        let dayCell = document.createElement("div");
        dayCell.classList.add(
          "prev-month-day-" + (parseInt(this.trailing[i]) + 1)
        );
        dayCell.classList.add("leading-trailing-day");
        dayCell.classList.add("calendar-border-wrap");
        dayCell.innerHTML = parseInt(this.trailing[i] + 1) + 1;
        dayCell.setAttribute("aria-label", parseInt(this.trailing[i]) + 1);
        if (i === 0) {
          dayCell.classList.add("grid-column-start:0;");
        }
        this.container.prepend(dayCell);
      }
    }
    // add next months leading days to calendar.
    if (this.leading) {
      for (let i = 1; i < 8 - lastDayPos; i++) {
        let dayCell = document.createElement("div");
        dayCell.classList.add("next-month-day-" + i);
        dayCell.classList.add("leading-trailing-day");
        dayCell.classList.add("calendar-border-wrap");
        dayCell.innerHTML = i;
        dayCell.setAttribute("aria-label", "day-" + i + "-next-month");
        if (i === 0) {
          dayCell.classList.add("grid-column-start:" + lastDayPos + ";");
        }
        this.container.appendChild(dayCell);
      }
    }
  }
  getDayText(number) {
    if (typeof number === "string") number = parseInt(number);
    return this.daysInMonth[number + 1];
  }
  increaseMonth() {
    this.date = dayjs(this.date).add(1, "M");
    this.reset();
  }
  decreaseMonth() {
    this.date = dayjs(this.date).subtract(1, "M");
    this.reset();
  }
  increaseYear() {
    this.date = dayjs(this.date).add(1, "Y");
    this.reset();
  }
  decreaseYear() {
    this.date = dayjs(this.date).subtract(1, "Y");
    this.reset();
  }
  reset() {
    this.day = this.date.format("dddd");
    this.month = this.date.format("MMMM");
    this.year = this.date.format("YYYY");
    this._weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    this.daysInMonth = parseInt(this.date.daysInMonth());
    this.initialize();
  }
  refresh() {}
  async getData() {}
  openEvent() {}
  validate(App) {}
}
