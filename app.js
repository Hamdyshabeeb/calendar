import renderCalender from './calander.js';
/**@type{HTMLHeadingElement||null} */
const calendarHeader = document.querySelector('.month h1');
/**@type{HTMLUListElement||null} */
const calendarDayList = document.querySelector('.day-list');
/**@type {HTMLLIElement||null} */
const calendarGotoToday = document.querySelector('.goto-today');
/**@type {HTMLFormElement||null} */
const calendarGotoMonth = document.querySelector('.goto-month form');

// render calendar for current month
renderCalender(new Date(), calendarHeader, calendarDayList);
// make today is the active day
document.querySelector('.day_today').classList.add('day_active');
// attach onclick event to .goto-today
calendarGotoToday.addEventListener('click', () => {
	renderCalender(new Date(), calendarHeader, calendarDayList);
	document.querySelector('.day_today').classList.add('day_active');
});
// attack onsubmit event to calendar form (go to month)
calendarGotoMonth.addEventListener('submit', (e) => {
	e.preventDefault();
	/**@type{string} data of form */
	const dateString = e.target.querySelector('input').value;
	const [year, month] = dateString.split('-');

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
		//todo view modal window to guide user for error
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
});
