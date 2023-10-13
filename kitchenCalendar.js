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
        <h1 class="header-month">${this.month}</h1>
        <h1> - </h1>
        <h1 class="header-year">${this.year}</h1>
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
      let date = dayjs(this.month + "-" + i + "-" + this.year).format(
        "MM-DD-YYYY"
      );
      let KCDay = new KitchenCalendarDay({
        element: day,
        date: date,
        dayNumber: i,
      });
      //day.classList.add("calendar-border-wrap");
      //day.innerHTML = `<div class='dayNumber'>${i}</div>`;
      //day.classList.add('day', date);
      this.container.appendChild(day);
      day.value = date;
      this.days.push(day);
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
        dayCell.innerHTML = `<div class="slot0 dayNumber">${
          parseInt(this.trailing[i]) + 1
        }</div>`;
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
        dayCell.innerHTML = `<div class="slot0 dayNumber">${i}</div>`;
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
  rankSameDayEvents(arrayOfEvents) {
    // 1. initial ranking is directly related to length of the event, by day
    // Longest is first, shortest is last.
    // less than one day events should be ranked by when they start.
  }
  async parseEvents() {
    this.data = await this.data;
    this.data.map((event) => {
      event.startDate = dayjs(event.startDate);
      event.endDate = dayjs(event.endDate);
      event.startDateText = dayjs(event.startDate).format("MM-DD-YYYY hh:mm A");
      event.endDateText = dayjs(event.endDate).format("MM-DD-YYYY hh:mm A");
      event.singleDate = event.startDate.isSame(event.endDate, "date");
      if (!event.id) event.id = uniqueId();
      if (
        (this.month === event.endDate.format("MMMM") ||
          this.month === event.startDate.format("MMMM")) &&
        (this.year === event.endDate.format("YYYY") ||
          this.year === event.startDate.format("YYYY"))
      ) {
        this.loadEvent(event);
      }
    });
  }
  loadEvent(eventJson) {
    let diff = Math.abs(eventJson.startDate.diff(eventJson.endDate, "day"));
    eventJson.color = eventJson.color || random_rgba();
    if (!eventJson.dates) {
      eventJson.dates = [];
      eventJson.dates.push(eventJson.startDate);
      for (let i = 1; i <= diff; i++) {
        eventJson.dates.push(eventJson.startDate.add(i, "day"));
      }
      if (eventJson.startDate.isSame(eventJson.endDate, "day"))
        eventJson.dates = [eventJson.startDate];
        eventJson.dates.forEach((day, index) => {
          let newEvent = structuredClone(eventJson);
          newEvent.day = dayjs(day).format("MM-DD-YYYY");
          newEvent.start = eventJson.startDate.format("MM-DD-YYYY");
          newEvent.end = eventJson.endDate.format("MM-DD-YYYY");
          eventJson.day = dayjs(day).format("MM-DD-YYYY");
          eventJson.start = eventJson.startDate.format("MM-DD-YYYY");
          eventJson.end = eventJson.endDate.format("MM-DD-YYYY");
          this.addToCalendar(newEvent, index);
        });
        eventJson.dates.push(eventJson.endDate);
    }
  }
  addToCalendar(eventJson, index) {
    let calendarDayElement = this.days.filter(
      (day) => day.value === eventJson.day
    )[0];
    let event = document.createElement("div");
    event.classList.add("event", "calendar-border-wrap", "slot1");
    event.style.backgroundColor = eventJson.color;
    if (eventJson.start === eventJson.day) event.classList.add("event-start");
    if (eventJson.end === eventJson.day) event.classList.add("event-end");
    event.title =
      eventJson.description +
      " - " +
      eventJson.startDateText +
      " - " +
      eventJson.endDateText;
    event.value = JSON.stringify(eventJson);
    event.innerHTML = eventJson.summary;
    event.onclick = (e) => {
      this.viewEvent(eventJson);
    };
    calendarDayElement.appendChild(event);
  }
  viewEvent(event) {
    if (this.eventForm) this.eventForm.remove();
    this.eventForm = document.createElement("div");
    this.eventForm.classList.add("viewEvent");
    this.eventForm.style.backgroundColor = event.color;
    let edit = document.createElement("span");
    edit.classList.add("edit-event");
    edit.innerHTML = `
      <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" transform="translate(3 3)"><path d="m14 1c.8284271.82842712.8284271 2.17157288 0 3l-9.5 9.5-4 1 1-3.9436508 9.5038371-9.55252193c.7829896-.78700064 2.0312313-.82943964 2.864366-.12506788z"/><path d="m12.5 3.5 1 1"/></g></svg>
    `;
    edit.onclick = (e) => {
      //this.editView(event);
      console.log(event);
    };
    let dateRange = document.createElement("div");
    dateRange.classList.add("meta-daterange","event-metadata");
    Object.keys(event).map((key, i) => {
      let meta = document.createElement("div");
      if (typeof Object.values(event)[i] === "string") {
        switch (true) {
          case key === "summary":
            meta = document.createElement("h1");
            meta.innerHTML = Object.values(event)[i];
            meta.setAttribute("value", Object.values(event)[i]);
            meta.setAttribute("name", key);
            meta.setAttribute("type", "text");
            meta.id = event.id;
            this.eventForm.prepend(meta);
            break;
          case key === "color":
            meta = document.createElement("div");
            meta.style.border = '1px solid';
            meta.style.width = "max-content";
            meta.style.padding = "5px";
            meta.innerHTML = "Background Color";
            meta.setAttribute("value", Object.values(event)[i].startsWith("rgb") ? RGBAToHexA(Object.values(event)[i], true) : Object.values(event)[i]);
            meta.setAttribute("name", key);
            meta.setAttribute("type", "color");
            meta.id = event.id;
            this.eventForm.appendChild(meta);
            break;
          case key === "description":
            meta = document.createElement("h2");
            meta.innerHTML = Object.values(event)[i];
            meta.setAttribute("value", Object.values(event)[i]);
            meta.setAttribute("name", key);
            meta.setAttribute("type", "text");
            this.eventForm.appendChild(meta);
            break;
          case key === "endDateText":
            meta = document.createElement("span");
            meta.innerHTML = Object.values(event)[i];
            meta.setAttribute("name", key);
            meta.setAttribute("value", Object.values(event)[i]);
            dateRange.appendChild(meta);
            meta.setAttribute("type", "date");
            break;
          case key === "startDateText":
            meta = document.createElement("span");
            meta.setAttribute("type", "date");
            meta.setAttribute("name", key);
            meta.setAttribute("value", Object.values(event)[i]);
            meta.innerHTML = Object.values(event)[i];
            dateRange.prepend(meta);
            break;
          default:
            meta.innerHTML = "<b>" + key + ":</b> " + Object.values(event)[i];
            meta.setAttribute("value", Object.values(event)[i]);
            meta.setAttribute("name", key);
            this.eventForm.appendChild(meta);
        }
        this.eventForm.prepend(dateRange);
        this.eventForm.prepend(edit);
        meta.classList.add(key + "-metadata", "event-metadata");
        meta.addEventListener("click", (e) => {
          this.editEvent(e, event.id);
        });
      }
    });
    this.containerElement.appendChild(this.eventForm);
  }
  editEvent(e, id) {
    let el = e.target;
    let input = document.createElement("input");
    input.setAttribute("value", el.getAttribute("value"));
    input.setAttribute("id", el.id);
    input.setAttribute("name", el.getAttribute("name"));
    input.setAttribute("type", el.getAttribute("type"));
    input.onblur = (e) => {
      this.saveEvent(id, input.name, input.value);
    };
    el.replaceWith(input);
    input.focus();
  }
  async saveEvent(id, prop, val) {
    let event = this.data.filter((event) => event.id === id)[0];
    Object.keys(event).map((key, i) => {
      if (key === prop) event[key] = val;
    });
    this.data.map((e) => {
      if (e.id === id) e = event;
    });
    this.viewEvent(event);
    // need this in config to save to API:
    // await SaveEvents(this.data)
  }
}

const uniqueId = () => {
  return Date.now().toString() + "" + Math.random().toString(36);
};

function random_rgba() {
  var o = Math.round,
    r = Math.random,
    s = 255;
  return (
    "rgba(" +
    o(r() * s) +
    "," +
    o(r() * s) +
    "," +
    o(r() * s) +
    "," +
    r().toFixed(1) +
    ")"
  );
}


function RGBAToHexA(rgba, forceRemoveAlpha = false) {
  return "#" + rgba.replace(/^rgba?\(|\s+|\)$/g, '') // Get's rgba / rgb string values
    .split(',') // splits them at ","
    .filter((string, index) => !forceRemoveAlpha || index !== 3)
    .map(string => parseFloat(string)) // Converts them to numbers
    .map((number, index) => index === 3 ? Math.round(number * 255) : number) // Converts alpha to 255 number
    .map(number => number.toString(16)) // Converts numbers to hex
    .map(string => string.length === 1 ? "0" + string : string) // Adds 0 when length of one number is 1
    .join("") // Puts the array to togehter to a string
}

function rgbtocolorinput(rgb) {
  let numbers =  rgb.substring(5, rgb.length-1)
  .replace(/ /g, '')
  .split(',');
  console.log(numbers)
  numbers.map(num => num.length === 1 ? num = "0"+num : num);
  if (numbers.length === 4) {
    numbers.pop();
  }
  numbers = numbers.join('')
  numbers = "#" + numbers;
  return numbers;
}