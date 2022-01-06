import { DateTime, WEEK_FIRST_DAY_INDEX, WEEK_LAST_DAY_INDEX } from "./datetime";

const setCalendarPageFirstDay = (monthFirstDay) => {
    let days2subtraction = 0;

    if (monthFirstDay.weekDayIndex < WEEK_FIRST_DAY_INDEX) days2subtraction = 6 - monthFirstDay.weekDayIndex;
    else if (monthFirstDay.weekDayIndex > WEEK_FIRST_DAY_INDEX) days2subtraction = monthFirstDay.weekDayIndex - 1;

    const firstDayOfPage = new DateTime(
        monthFirstDay.year, 
        monthFirstDay.monthIndex, 
        monthFirstDay.day.numeric - days2subtraction, 
        12
    );

    return firstDayOfPage;
}

export const CalendarPage = (visibleMonth) => {
    const monthFirstDayDateTime = new DateTime(visibleMonth.year, visibleMonth.monthIndex, 1, 12)
    const calendarPageFirstDayDateTime = setCalendarPageFirstDay(monthFirstDayDateTime);

    let calendarPage = [];
    let day = calendarPageFirstDayDateTime;
    let weekDayIndex = WEEK_FIRST_DAY_INDEX;
    let itLastDayOnPage = false;
    let pageHasFullMonth = false;

    calendarPage.push(day);

    do {
        day = new DateTime(day.year, day.monthIndex, Number(day.day.numeric) + 1, 12);
        calendarPage.push(day);
        weekDayIndex++;

        if (weekDayIndex > 6) weekDayIndex = 0; 
        if (day.monthIndex === visibleMonth.monthIndex && Number(day.day.numeric) === Number(visibleMonth.month.days)) pageHasFullMonth = true;
        if (pageHasFullMonth && weekDayIndex === WEEK_LAST_DAY_INDEX) itLastDayOnPage = true;
        
    } while (!itLastDayOnPage)

    return [...calendarPage];
}

export default CalendarPage;