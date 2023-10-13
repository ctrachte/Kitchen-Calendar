class KitchenCalendarDay {
    constructor(options) {
        this.date = options.date;
        this.dayNumber = options.dayNumber;
        this.target = options.element;
        this.slot0 = document.createElement('div');
        this.slot1 = document.createElement('div');
        this.slot2 = document.createElement('div');
        this.init();
    } 

    async init() {
        this.target.classList.add('calendar-border-wrap');
        this.target.classList.add('day', this.date);
        this.slot0.innerHTML = `<div class='dayNumber'>${this.dayNumber}</div>`;
        this.slot0.classList.add('slot0');
        this.slot1.classList.add('slot1');
        this.slot2.classList.add('slot2');
        this.target.appendChild(this.slot0);
        this.target.appendChild(this.slot1);
        this.target.appendChild(this.slot2);
    }
}