export const WEEK_FIRST_DAY_INDEX = 1;
export const WEEK_LAST_DAY_INDEX = WEEK_FIRST_DAY_INDEX === 0 ? 6 : WEEK_FIRST_DAY_INDEX - 1;

export class DateTime {
    constructor(...args) {
        this._date = new Date(...args);
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
        this._weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        this._weekDaysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        // set by setter
        this.weekFirstDay = WEEK_FIRST_DAY_INDEX;

        this._setLastDayOfMonth();
    }

    /**
     * @param {number} index
     */
    set weekFirstDay(index) {
        this._weekFirstDay= index < 0 || index > 6 ? 0 : index;
        this._setShiftedWeekDays()
    }

    /**
     * @return {number} index of the first day of the week
     */
    get weekFirstDay() {
        return this._weekFirstDay;
    }

    _setShiftedWeekDays() {
        let weekDayIndexes = [0, 1, 2, 3, 4, 5, 6];
        let weekDays = [...this._weekDays];
        let weekDaysShort = [...this._weekDaysShort];

        if (this._weekFirstDay!== 0) {
            for(let i=0;i<this.weekFirstDay;i++) {
                weekDayIndexes.push(weekDayIndexes.shift());
                weekDays.push(weekDays.shift());
                weekDaysShort.push(weekDaysShort.shift());
            }
        }

        this._shiftedWeekDays = {
            index: weekDayIndexes,
            long: weekDays,
            short: weekDaysShort
        }        
    }

    _setLastDayOfMonth() {
        let lastDay = new Date(this.year, this.month.index + 1, 0, 12);

        this._lastDay = lastDay.getDate()
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
     * @return {Object} name and index of the month: 
     * { 
     *  index: 0-11, 
     *  numeric: 1-12, 
     *  digit: 01-12, 
     *  long: January-December, 
     *  short: Jan-Dec,
     *  days: (number of days in current month)
     * }
     */
    get month() {
        const digit = new Intl.DateTimeFormat(this._locale, { month: '2-digit' }).format(this._date);
        const numeric = new Intl.DateTimeFormat(this._locale, { month: 'numeric' }).format(this._date);
        return { 
            index: this.monthIndex, 
            numeric: numeric, 
            digit: digit, 
            long: this._monthName[this.monthIndex], 
            short: this._monthNameShort[this.monthIndex], 
            days: this._lastDay 
        };
    }

    /**
     * @return {number} index of the month: 0..11 
     * more on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth
     */
    get monthIndex() {
        return this._date.getMonth();
    }

    /**
     * @return {Object} name and index of the day of the week: { index: 0-6 long: Sunday-Saturday, short: Sun-Sat }
     */
    get weekDay() {
        return { index: this.weekDayIndex, long: this._weekDays[this.weekDayIndex], short: this._weekDaysShort[this.weekDayIndex] };
    }

    /**
     * @return {number} index of the day of the week: 0-6 - 0 is Sunday
     */
    get weekDayIndex() {
        return this._date.getDay();
    }

    /**
     * @return {Object} arrays of the names of the days of the week: { index: [0,..,6], long: [Sunday,..,Saturday], short: [Sun,..,Sat] }
     * accordingly to the first day of the week (Sunday||Monday|| ...)
     */
    get weekDays() {
        return this._shiftedWeekDays;
    }

    /**
     * @return {String} 4-digits
     * more on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getFullYear
     */
    get year() {
        return this._date.getFullYear();
    }

    /**
     * @return {Number} representation of date (year month day), eg: 20220112
     */
    get date() {
        return Number(`${this.year}${this.month.digit}${this.day.digit}`);
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

export default DateTime;