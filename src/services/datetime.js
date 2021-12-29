export default class DateTime {
    constructor(dateStr = null) {
        this._date = dateStr ? new Date(dateStr) : new Date();
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
    
    get month() {
        return { long: this._monthName[this.monthIndex], short: this._monthNameShort[this.monthIndex] };
    }

    get monthIndex() {
        return this._date.getMonth();
    }

    get weekDay() {
        return { long: this._weekDay[this.weekDayIndex], short: this._weekDayShort[this.weekDayIndex] };
    }

    get weekDayIndex() {
        return this._date.getDay();
    }

    get weekDays() {
        return { long: this._weekDay, short: this._weekDayShort };
    }

    get formatedDate() {
        const options = { dateStyle: 'long' };
        return new Intl.DateTimeFormat(this._locale, options).format(this._date);
    }

    get year() {
        return this._date.getFullYear();
    }

    get timestamp() {
        return this._date.getTime();
    }
}