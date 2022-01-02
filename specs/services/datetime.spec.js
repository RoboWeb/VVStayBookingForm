import DateTime from "@/services/datetime";

const DateMock = "2022-06-01";

describe("DateTime service class wrapper", () => {
    let dt;
    
    beforeEach(() => {
        dt = new DateTime(DateMock);
    });

    describe("getters", () => {
        test('`weekFirstDay` should return 1', () => {
            expect(dt.weekFirstDay).toBe(1);
        });

        test("`day` should return object with numeric number of day, and 2-digit representation", () => {
            expect(dt.day).toEqual({numeric: '1', digit: '01'});
        });

        test('`month` should return object with month representations as: index, numeric, 2-digit, long (string), short (string)', () => {
            expect(dt.month).toEqual({
                index: 5,
                numeric: '6',
                digit: '06',
                long: 'June',
                short: 'Jun',
                days: 30
            })
        });

        test('`monthIndex` should return index of current month', () => {
            expect(dt.monthIndex).toBe(5);
        });

        test('`weekDay` should return the current weekday representations for the current date, as: index, long (string), short', () => {
            expect(dt.weekDay).toEqual({
                index: 3,
                long: 'Wednesday',
                short: 'Wed'
            });
        });

        test('`weekDayIndex` should return index of weekday for current date', () => {
            expect(dt.weekDayIndex).toBe(3);
        });

        test('`weekDays` should return Object with arrays of weekdays, as: [indexes], [long names], [short names]', () => {
            expect(dt.weekDays).toEqual({
                index: [1, 2, 3, 4, 5, 6, 0],
                long: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                short: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            });
        });

        test('`year` should return numeric representation of year for current date', () => {
            expect(dt.year).toBe(2022);
        });

        test('`date` should return date with year, month and day as number', () => {
            expect(dt.date).toBe(20220601);
        });

        test('`formattedDate` should return date formatted based on locale value (eg.: en-US)', () => {
            expect(dt.formattedDate).toBe('June 1, 2022');
        });

        test('`ISODate` should return date formatted following the ISO 8601 Extended Format', () => {
            expect(dt.ISODate).toBe('2022-06-01T00:00:00.000Z');
        });

        test('`timestamp` should return date as number of miliseconds since January 1, 1970, 00:00:00 UTC', () => {
            expect(dt.timestamp).toBe(1654041600000);
        })
    });

    describe("setters", () => {
        
    });
})