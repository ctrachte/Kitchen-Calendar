class KitchenCalendar {
  constructor(options) {
    this.containerElement =
      options.containerElement || document.createElement("div");
    this.containerElement.classList.add("KitchenCalendarContainer");
    this.date = dayjs(new Date());
    this.data = options.data;
    this.reset();
  }
  async initialize() {
    // testing dayjs
    this.data = await this.data;
    this.parseEvents();
    this.container = document.createElement("div");
    this.container.classList.add("daysContainer");
    this.header = `
      <div class="CalendarHeader">
        <h1 class="monthDecrease">
          <svg height="21" id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 155.69 252.51">
            <defs>
              <style>
                .cls-1 {
                  stroke-width: 0px;
                  fill: white;
                }
              </style>
            </defs>
            <path class="cls-1" d="m29.44,158.53l91.98,91.98c2.67,2.67,7.01,2.67,9.68,0l22.59-22.59c2.67-2.67,2.67-7.01,0-9.68l-87.14-87.14c-2.67-2.67-2.67-7.01,0-9.68l87.14-87.14c2.67-2.67,2.67-7.01,0-9.68l-22.59-22.59c-2.67-2.67-7.01-2.67-9.68,0L29.44,93.98,2.01,121.41c-2.67,2.67-2.67,7.01,0,9.68l27.43,27.43ZM131.1,24.6h0c2.67,2.67,2.67,7.01,0,9.68L43.96,121.41c-2.67,2.67-2.67,7.01,0,9.68l87.14,87.14c2.67,2.67,2.67,7.01,0,9.68h0c-2.67,2.67-7.01,2.67-9.68,0L29.44,135.94l-4.84-4.84c-2.67-2.67-2.67-7.01,0-9.68l4.84-4.84L121.41,24.6c2.67-2.67,7.01-2.67,9.68,0Z"/>
          </svg>        
        </h1>
        <h1 class="month-year-span">
          ${this.month}
          - 
          ${this.year}
        </h1>
        <h1 class="monthIncrease">
          <svg height="21" id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 155.69 252.51">
            <defs>
              <style>
                .cls-1 {
                  stroke-width: 0px;
                  fill: white;
                }
              </style>
            </defs>
            <path class="cls-1" d="m126.26,93.98L34.28,2.01c-2.67-2.67-7.01-2.67-9.68,0L2.01,24.6c-2.67,2.67-2.67,7.01,0,9.68l87.14,87.14c2.67,2.67,2.67,7.01,0,9.68L2.01,218.23c-2.67,2.67-2.67,7.01,0,9.68l22.59,22.59c2.67,2.67,7.01,2.67,9.68,0l91.98-91.98,27.43-27.43c2.67-2.67,2.67-7.01,0-9.68l-27.43-27.43ZM24.6,227.91h0c-2.67-2.67-2.67-7.01,0-9.68l87.14-87.14c2.67-2.67,2.67-7.01,0-9.68L24.6,34.28c-2.67-2.67-2.67-7.01,0-9.68h0c2.67-2.67,7.01-2.67,9.68,0l91.98,91.98,4.84,4.84c2.67,2.67,2.67,7.01,0,9.68l-4.84,4.84-91.98,91.98c-2.67,2.67-7.01,2.67-9.68,0Z"/>
          </svg>        
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
    this.days = [];
    for (let i = 1; i < this.daysInMonth + 1; i++) {
      let day = document.createElement("div");
      let date =  dayjs(this.month + "-" + i + "-" + this.year).format('MM-DD-YYYY')
      day.classList.add("calendar-border-wrap");
      day.innerHTML = `<div class='dayNumber'>${i}</div>`;
      day.classList.add('day', date);
      this.container.appendChild(day);
      day.value = date;
      this.days.push(day)
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
      this.trailingDays = [];
      for (let i = firstDayPos - 1; i > 0; i--) {
        let dayCell = document.createElement("div");
        dayCell.classList.add(
          "prev-month-day-" + (parseInt(this.trailing[i]) + 1)
        );
        dayCell.classList.add("leading-trailing-day");
        dayCell.classList.add("calendar-border-wrap");
        dayCell.innerHTML = parseInt(this.trailing[i]) + 1;
        dayCell.setAttribute("aria-label", parseInt(this.trailing[i]) + 1);
        if (i === 0) {
          dayCell.classList.add("grid-column-start:0;");
        }
        this.trailingDays.push(dayCell);
      }
      this.trailingDays.reverse();
      this.trailingDays.forEach((dayCell) => {
        this.container.prepend(dayCell);
      });
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
  async parseEvents() {
    this.data = await this.data;
    this.data.map((event) => {
      event.startDate = dayjs(event.startDate);
      event.endDate = dayjs(event.endDate);
      event.singleDate = event.startDate.isSame(event.endDate, 'day');
      if (this.month === event.endDate.format("MMMM") || this.month === event.startDate.format("MMMM")) {
        this.loadEvent(event);
      }
    });
  }
  loadEvent(eventJson) {
    let calendarDayElement = this.days.filter(day => day.value === eventJson.startDate.format('MM-DD-YYYY'))[0];
    let event = document.createElement('div');
    event.classList.add('event', 'calendar-border-wrap');
    event.title = eventJson.description + " - " + 
      eventJson.startDate.format('MM/DD/YYYY hh:mm A') + " - " + 
      eventJson.endDate.format('MM/DD/YYYY hh:mm A');
    event.value = JSON.stringify(eventJson);
    event.innerHTML = eventJson.summary;
    calendarDayElement.appendChild(event);
  }
}
