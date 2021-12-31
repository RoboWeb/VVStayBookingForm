import { DateTime, WEEK_FIRST_DAY_INDEX, WEEK_LAST_DAY_INDEX } from "./datetime";

const setCalendarPageFirstDay = (monthFirstDay) => {
    let days2subtraction = 0;

    if (monthFirstDay.weekDayIndex < WEEK_FIRST_DAY_INDEX) days2subtraction = 6 - monthFirstDay.weekDayIndex;
    else if (monthFirstDay.weekDayIndex > WEEK_FIRST_DAY_INDEX) days2subtraction = monthFirstDay.weekDayIndex - 1;

    const firstDayOfPage = new DateTime(
        monthFirstDay.year, 
        monthFirstDay.month.index, 
        monthFirstDay.day.numeric - days2subtraction, 
        12
    );

    return firstDayOfPage;
}

export const CalendarPage = (visibleMonth) => {
    console.log("getCalendarPage", { visibleMonth, type: typeof visibleMonth });
    const monthFirstDayDateTime = new DateTime(visibleMonth.year, visibleMonth.month.index, 1, 12)
    const calendarPageFirstDayDateTime = setCalendarPageFirstDay(monthFirstDayDateTime);

    let calendarPage = [];
    let day = calendarPageFirstDayDateTime;
    let weekDayIndex = WEEK_FIRST_DAY_INDEX;
    let weeks = 0;
    let pageHasFullMonth = false;

    calendarPage.push(day);

    do {
        day = new DateTime(day.year, day.month.index, Number(day.day.numeric) + 1, 12);
        calendarPage.push(day);
        weekDayIndex++;
        if (weekDayIndex > 6) weekDayIndex = 0; 
        if (weekDayIndex === WEEK_LAST_DAY_INDEX) weeks++;
        if (day.day.numeric === visibleMonth.month.days) pageHasFullMonth = true;
    } while (weeks < 6 && !pageHasFullMonth)

    return [...calendarPage];
}

export default CalendarPage;