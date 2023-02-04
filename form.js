import { modalWindow } from './ui.js';
/**
 *
 * @param {SubmitEvent} e form submit event
 * @param {Function} renderCalender callback function to call
 * @param {HTMLHeadingElement}calendarHeader h1 header of the calendar
 * @param {HTMLUListElement } calendarDayList ul element contain  all calendar days
 */
export function calendarFormSubmit(
	e,
	renderCalender,
	calendarHeader,
	calendarDayList,
	activeDate
) {
	e.preventDefault();
	/**@type{string} dateString data of form */
	const dateString = e.target.querySelector('input').value;
	// split form data to year and month
	const [year, month] = dateString.split('-');
	const modal = document.querySelector('.calender-form-error');

	if (
		!(
			year.length === 4 &&
			Number.isInteger(parseInt(year)) &&
			year > 0 &&
			Number.isInteger(Number.parseInt(month)) &&
			month > 0 &&
			month <= 12
		)
	) {
		modalWindow(modal, true);
		return;
	}

	renderCalender(
		new Date(year, Number.parseInt(month) - 1),
		calendarHeader,
		calendarDayList
	);
	activeDate.day = 1;
	document
		.querySelector('.day:not(.day_prev-month)')
		.classList.add('day_active');
}
