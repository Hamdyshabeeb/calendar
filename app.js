import renderCalender, {
	activeDate,
	changeActiveMonth,
	monthnames,
	dayNames,
} from './calander.js';
import { modalWindow } from './ui.js';
import { calendarFormSubmit, addEventFormSubmit } from './form.js';
import { EventFactory } from './events.js';
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
/**@type{HTMLDivElement||null} */
const addEventButton = document.querySelector('.icon-add-event_opener');
/**@type{HTMLFormElement||null} */
const addEventForm = document.querySelector('.add-event form');
/**@type{HTMLDivElement||null} */
const addEventContainer = document.querySelector('.add-event');
/**@type {HTMLSpanElement||null} */
const addEventClose = document.querySelector('.add-event_title .icon-close');
/**@type {HTMLHeadingElement} h2 the title of events section */
const eventsTitle = document.querySelector('.events-title');
/**@type {HTMLUListElement||null} */
const eventList = document.querySelector('.event-list');

//////////////////////////////////////////////////////////////

// render calendar for current month
renderCalender(
	new Date(),
	calendarHeader,
	calendarDayList,
	EventFactory,
	eventsTitle,
	eventList
);
// make today is the active day
document.querySelector('.day_today').classList.add('day_active');

///////////////////////////////////////////////////////////////////

// attach onclick event to .goto-today
calendarGotoToday.addEventListener('click', () => {
	renderCalender(
		new Date(),
		calendarHeader,
		calendarDayList,
		EventFactory,
		eventsTitle,
		eventList
	);
	document.querySelector('.day_today').classList.add('day_active');
});

// attach onsubmit event to calendar form (go to month)
calendarGotoMonth.addEventListener('submit', (e) => {
	calendarFormSubmit(
		e,
		renderCalender,
		calendarHeader,
		calendarDayList,
		activeDate,
		EventFactory,
		eventsTitle,
		eventList,
		monthnames
	);
});

// attach onclick event to modal ok button
calenderFormErrorButton.addEventListener('click', (e) => {
	modalWindow(document.querySelector('.calender-form-error'), false);
});

// attach onclick event to next calendar button
calendarNextMonthButton.addEventListener('click', () => {
	changeActiveMonth(
		renderCalender,
		calendarHeader,
		calendarDayList,
		+1,
		EventFactory,
		eventsTitle,
		eventList
	);
});

//attach onclick event to prev calendar button
calendarPrevMonthButton.addEventListener('click', () => {
	changeActiveMonth(
		renderCalender,
		calendarHeader,
		calendarDayList,
		-1,
		EventFactory,
		eventsTitle,
		eventList
	);
});

//attach onclick event to addEvent button
addEventButton.addEventListener('click', (e) => {
	addEventContainer.classList.add('active');
});

//attach onclick event to close form button
addEventClose.addEventListener('click', (e) => {
	addEventContainer.classList.remove('active');
	addEventForm.reset();
});
// attach onsubmit event to addEvent form
addEventForm.addEventListener('submit', (e) => {
	addEventFormSubmit(e, EventFactory, activeDate, eventList);
});
