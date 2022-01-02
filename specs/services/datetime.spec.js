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
                short: 'Jun'
            })
        })
    })
})