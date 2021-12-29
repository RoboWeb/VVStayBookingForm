export class DateTime {
    constructor(dateStr) {
        this._date = new Date(dateStr);
        this._locale = 'en-US';

        this._monthName = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
          ]
        this._monthNameShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this._weekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        this._weekDayShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    }
    
    get month(long = false) {
        return long ? this._monthName[this.monthIndex] : this._monthNameShort[this.monthIndex];
    }

    get monthIndex() {
        return this._date.getMonth();
    }

    get weekDay(long = false) {
        return long ? this._weekDay[this.weekDayIndex] : this._weekDayShort[this.weekDayIndex];
    }

    get weekDayIndex() {
        return this._date.getDay();
    }
}