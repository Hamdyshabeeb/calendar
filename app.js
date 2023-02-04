import renderCalender, { activeDate, changeActiveMonth } from './calander.js';
import { modalWindow } from './ui.js';
import { calendarFormSubmit } from './form.js';
/**@type{HTMLHeadingElement||null} */
const calendarHeader = document.querySelector('.month h1');
/**@type{HTMLUListElement||null} */
const calendarDayList = document.querySelector('.day-list');
/**@type {HTMLLIElement||null} */
const calendarGotoToday = document.querySelector('.goto-today');
/**@type {HTMLFormElement||null} */
const calendarGotoMonth = document.querySelector('.goto-month form');
/**@type {HTMLButtonElement||null} */
const calenderFormErrorButton = document.querySelector(
	'.calender-form-error button'
);
/**@type{HTMLSpanElement||null} next month button */
const calendarNextMonthButton = document.querySelector('.icon-next');
/**@type{HTMLSpanElement||null} prev month button */
const calendarPrevMonthButton = document.querySelector('.icon-prev');

// render calendar for current month
renderCalender(new Date(), calendarHeader, calendarDayList);
// make today is the active day
document.querySelector('.day_today').classList.add('day_active');
// attach onclick event to .goto-today
calendarGotoToday.addEventListener('click', () => {
	renderCalender(new Date(), calendarHeader, calendarDayList);
	document.querySelector('.day_today').classList.add('day_active');
});
// attach onsubmit event to calendar form (go to month)
calendarGotoMonth.addEventListener('submit', (e) => {
	calendarFormSubmit(
		e,
		renderCalender,
		calendarHeader,
		calendarDayList,
		activeDate
	);
});
// attach onclick event to modal ok button
calenderFormErrorButton.addEventListener('click', (e) => {
	modalWindow(document.querySelector('.calender-form-error'), false);
});
// attach onclick event to next calendar button
calendarNextMonthButton.addEventListener('click', () => {
	changeActiveMonth(renderCalender, calendarHeader, calendarDayList, +1);
});
//attach onclick event to prev calendar button
calendarPrevMonthButton.addEventListener('click', () => {
	changeActiveMonth(renderCalender, calendarHeader, calendarDayList, -1);
});
