import renderCalender from './calander.js';
/**@type{HTMLHeadingElement||null} */
const calendarHeader = document.querySelector('.month h1');
/**@type{HTMLUListElement||null} */
const calendarDayList = document.querySelector('.day-list');

// render calendar for current month
renderCalender(new Date(), calendarHeader, calendarDayList);
