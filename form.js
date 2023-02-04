import { modalWindow } from './ui.js';
/**
 *
 * @param {SubmitEvent} e form submit event
 */
export function calendarFormSubmit(e) {
	e.preventDefault();
	/**@type{string} data of form */
	const dateString = e.target.querySelector('input').value;
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
	document
		.querySelector('.day:not(.day_prev-month)')
		.classList.add('day_active');
}
