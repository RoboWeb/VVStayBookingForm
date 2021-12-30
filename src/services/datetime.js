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
        this._weekFirstDay = 0;
    }

    /**
     * @param {number} index
     */
    set weekFirstDay(index) {
        this._weekFirstDay = index < 0 || index > 6 ? 0 : index;
    }
    
    /**
     * @return {Object} number of the day of the month: { numeric: 1-31, digit: 01-31 } according to _date
     * more on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
     */
    get day() {
        return { 
            numeric: new Intl.DateTimeFormat(this._locale, {day: 'numeric' }).format(this._date),
            digit: new Intl.DateTimeFormat(this._locale, { day: '2-digit' }).format(this._date)
        };
    }

    /**
     * @return {Object} name of the month: { long: January..December, short: Jan..Dec }
     */
    get month() {
        return { long: this._monthName[this.monthIndex], short: this._monthNameShort[this.monthIndex] };
    }

    /**
     * @return {number} index of the month: 0..11 
     * more on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth
     */
    get monthIndex() {
        return this._date.getMonth();
    }

    /**
     * @return {Object} name of the day of the week: { long: Sunday..Saturday, short: Sun..Sat }
     */
    get weekDay() {
        return { long: this._weekDay[this.weekDayIndex], short: this._weekDayShort[this.weekDayIndex] };
    }

    /**
     * @return {number} index of the day of the week: 0-6 - 0 is Sunday
     */
    get weekDayIndex() {
        return this._date.getDay();
    }

    /**
     * @return {Object} arrays of the names of the days of the week: { long: [Sunday,..,Saturday], short: [Sun,..,Sat] }
     */
    get weekDays() {
        return { long: this._weekDay, short: this._weekDayShort };
    }

    /**
     * @return {String} 4-digits
     * more on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getFullYear
     */
    get year() {
        return this._date.getFullYear();
    }

    /**
     * @return {String} date formatted for language (locale), eg.: January 12, 2022
     * more on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
     */
    get formattedDate() {
        const options = { dateStyle: 'long' };
        return new Intl.DateTimeFormat(this._locale, options).format(this._date);
    }

    /**
     * @return {String} date converted to a string following the ISO 8601 Extended Format
     * more on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
     */
    get ISODate() {
        return this._date.toISOString();
    }

    /**
     * @return {numeric} numeric value of the specified date as the number of milliseconds since January 1, 1970, 00:00:00 UTC.
     * more on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime
     */
    get timestamp() {
        return this._date.getTime();
    }
}