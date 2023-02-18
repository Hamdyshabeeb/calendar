/**
 * @module form
 * @see module:events
 * @see module:calander
 *
 */

import { modalWindow } from './ui.js';
/**
 *
 * @param {SubmitEvent} e form submit event
 * @param {Function} renderCalender callback function to render the days of month
 * @param {HTMLHeadingElement}calendarHeader h1 header of the calendar
 * @param {HTMLUListElement } calendarDayList   calander day list
 */
export function calendarFormSubmit(
	e,
	renderCalender,
	calendarHeader,
	calendarDayList,
	activeDate,
	EventFactory,
	eventsTitle,
	eventList
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
		calendarDayList,
		EventFactory,
		eventsTitle,
		eventList
	);
	activeDate.day = 1;
	document
		.querySelector('.day:not(.day_prev-month)')
		.classList.add('day_active');
}
/**
 *
 * @param {SubmitEvent} e form submit event
 * @param {typeof import("./events.js").EventFactory} EventFactory event constructor
 * @param {typeof import("./calander.js").activeDate } date date of active day
 * @param {HTMLUListElement} ul events list
 *
 */
export function addEventFormSubmit(e, EventFactory, date, ul) {
	e.preventDefault();
	/**@type {string} event description */
	const description = document.getElementById('event-name').value;

	/**@type {string} start time of event */
	const startTime = formatTime(document.getElementById('event-start').value);

	/**@type {string} end time of event */
	const endTime = formatTime(document.getElementById('event-end').value);
	//reset event list
	e.target.reset();
	//create new event
	const event = new EventFactory(description, startTime, endTime, date);
	//rendring event in event section
	event.renderEvent(ul);
}

/**
 * format time to be 12 hour
 * @param {string} time time in 24-hour format
 * @returns {string} time in 12-hour format
 */
function formatTime(time) {
	const [hs, ms] = time.split(':');
	const hn = Number.parseInt(hs);
	let ft = '';

	if (hn === 0) {
		ft = `12:${ms} AM`;
	} else if (hn > 12) {
		ft = `0${hn - 12}:${ms} PM`;
	} else if (hn === 12) {
		ft = `12:${ms} PM`;
	} else {
		ft = time + ' AM';
	}

	return ft;
}
