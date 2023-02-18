/**
 * @module calander
 */

/**@type{{year:number,month:number,day:number}} */
export const activeDate = { year: null, month: null, day: null };
/**@type{string[]} string of month names */
export const monthnames = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];
/**@type{Array.<string>} */
export const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
/**
 *
 * @param {Date} date is date object
 * @param {HTMLHeadingElement} calenderHeader h1 element
 * @param {HTMLUListElement} calendarDayList ul element
 * @param {typeof import("./events.js").EventFactory} EventFactory event constructor
 * @param {HTMLHeadingElement} eventsTitle events section title
 * @param {HTMLUListElement} eventList events section event list
 * @param {Array.string}
 */
export default function renderCalender(
	date,
	calenderHeader,
	calendarDayList,
	EventFactory,
	eventsTitle,
	eventList
) {
	const month = createMonth(date);

	// update calender header text
	calenderHeader.innerText = `${month.currentMonth.monthName} ${month.fullYear}`;
	// renderCalender
	calendarDayList.innerHTML = '';

	calendarDayList.append(
		createLastMonthDays(month),
		createActiveMonthDays(month, EventFactory, eventsTitle, eventList),
		createNextMonthDays(month)
	);
	EventFactory.renderEventSection(
		eventsTitle,
		eventList,
		activeDate,
		monthnames
	);
}
/**
 *
 * @param {{currentDay:{dayName:string,dayValue:number},currentMonth:{monthName:string,monthValue:number},fullYear:number,firstDayName:string,lastDay:{name:string,value:number}}} currentMonth
 * @returns{DocumentFragment}
 */
function createLastMonthDays(currentMonth) {
	//  how many days befor the first day of month
	const daysBeforeFirstDay = dayNames.indexOf(currentMonth.firstDayName);
	const PrevMonth = createMonth(
		new Date(currentMonth.fullYear, currentMonth.currentMonth.monthValue - 1)
	);
	// create Fragment
	const fragment = document.createDocumentFragment();
	for (let i = 1; i <= daysBeforeFirstDay; i++) {
		const day = document.createElement('li');
		day.className = 'day day_prev-month';
		day.innerText = `${PrevMonth.lastDay.value - daysBeforeFirstDay + i}`;
		fragment.appendChild(day);
	}
	return fragment;
}
/**
 *
 * @param {{currentDay:{dayName:string,dayValue:number},currentMonth:{monthName:string,monthValue:number},fullYear:number,firstDayName:string,lastDay:{name:string,value:number}}} currentMonth
 * @param {typeof import("./events.js").EventFactory} EventFactory event constructor
 * @param {HTMLHeadingElement} eventsTitle events section title
 * @param {HTMLUListElement} eventList events section event list
 * @returns{DocumentFragment}
 */
function createActiveMonthDays(
	currentMonth,
	EventFactory,
	eventsTitle,
	eventList
) {
	const fragment = document.createDocumentFragment();
	const todayDate = new Date();
	const isToday = checkCurrentDayIsToday(currentMonth, todayDate);
	const today = todayDate.getDate();
	for (let i = 1; i <= currentMonth.lastDay.value; i++) {
		const day = document.createElement('li');
		const dayString = EventFactory.createDayString({
			year: currentMonth.fullYear,
			month: currentMonth.currentMonth.monthValue,
			day: i,
		});
		day.className = 'day';
		day.innerText = `${i}`;
		if (isToday && i === today) {
			day.classList.add('day_today');
			//change the active day to today
			activeDate.day = i;
		}
		// check if that day have events in the event object or not
		if (EventFactory.checkIfDayStringExistInEvents(dayString)) {
			day.dataset.event = true;
		}
		//add data with the value of day
		day.dataset.day = i;
		//attach event listener to change activeDay and chang event section
		day.addEventListener('click', (e) => {
			const activeDay = e.target;
			// change activeDate.day to clicked element value
			changeCalndarCurrentActiveDate(
				activeDate,
				document.querySelector('ul.day-list'),
				activeDay
			);
			// change events section to reflect the active date
			EventFactory.renderEventSection(
				eventsTitle,
				eventList,
				activeDate,
				monthnames
			);
		});
		fragment.appendChild(day);
	}
	activeDate.year = currentMonth.fullYear;
	activeDate.month = currentMonth.currentMonth.monthValue;
	return fragment;
}

/**
 *
 * @param {{currentDay:{dayName:string,dayValue:number},monthName:string,monthValue:number,fullYear:number,firstDayName:string,lastDay:{name:string,value:number}}} currentMonth
 * @returns{DocumentFragment}
 */
function createNextMonthDays(currentMonth) {
	// how many days after last day of current month
	const daysAfterlastDay =
		dayNames.length - 1 - dayNames.indexOf(currentMonth.lastDay.name);
	const fragment = document.createDocumentFragment();
	for (let i = 1; i <= daysAfterlastDay; i++) {
		const day = document.createElement('li');
		day.className = 'day day_next-month';
		day.innerText = `${i}`;
		fragment.appendChild(day);
	}

	return fragment;
}

/**
 * @param {Date} date is date object
 * @returns {{currentDay:{dayName:string,dayValue:number},currentMonth:{monthName:string,monthValue:number},fullYear:number,firstDayName:string,lastDay:{name:string,value:number}}}
 */
function createMonth(date) {
	const firstDayName = getFirstNameDayOfMonth(date);
	const lastDay = getLastDayOfMonth(date);
	const DayName = date.toString().split(' ')[0];
	const DayValue = date.getDate();
	const monthName = monthnames[date.getMonth()];
	const monthValue = date.getMonth();
	const fullYear = date.getFullYear();
	return {
		currentDay: { DayName, DayValue },
		currentMonth: { monthName, monthValue },
		fullYear,
		firstDayName,
		lastDay,
	};
}

/**
 *
 * @param {Date} date
 */
function getFirstNameDayOfMonth(date) {
	const newDate = new Date(date.getFullYear(), date.getMonth(), 1);
	return newDate.toString().split(' ')[0];
}

/**
 *
 * @param {Date} date
 * @returns{{name:string,value:number}}
 */
function getLastDayOfMonth(date) {
	const newDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
	return {
		name: newDate.toString().split(' ')[0],
		value: newDate.getDate(),
	};
}

// check active month day is  today
/**
 *@param {{{currentDay:{dayName:string,dayValue:number},currentMonth:{monthName:string,monthValue:number},fullYear:number,firstDayName:string,lastDay:{name:string,value:number}}}} month
 *@param {Date} today
 */
function checkCurrentDayIsToday(month, today) {
	return (
		today.getFullYear() === month.fullYear &&
		today.getMonth() === month.currentMonth.monthValue &&
		today.getDate() === month.currentDay.DayValue
	);
}

/**
 *
 * @param {Function} renderCalender  used to render the calender days
 * @param {HTMLHeadingElement} calendarHeader h1 of calender section
 * @param {HTMLUListElement} calendarDayList container of month all days
 * @param {number} inc number which increment or decrement month value by 1
 */
export function changeActiveMonth(
	renderCalender,
	calendarHeader,
	calendarDayList,
	inc,
	EventFactory,
	eventsTitle,
	eventList
) {
	const date = new Date(activeDate.year, activeDate.month + inc);
	renderCalender(
		date,
		calendarHeader,
		calendarDayList,
		EventFactory,
		eventsTitle,
		eventList
	);
	document
		.querySelector('.day:not(.day_prev-month)')
		.classList.add('day_active');
	activeDate.day = 1;
}
/**
 *
 * @param {{year:number,month:number,day:number}} activeDate activeObject
 * @param {HTMLUListElement} dayList days of month list
 * @param {HTMLLIElement} activeDay current active day
 */
function changeCalndarCurrentActiveDate(activeDate, dayList, activeDay) {
	// change activeDate object day
	activeDate.day = Number.parseInt(activeDay.dataset.day);
	/**@type{Array.<HTMLLIElement>} all days*/
	const allDays = [...dayList.children];
	// remove day_active from allDays
	allDays.forEach((day) => {
		day.classList.remove('day_active');
	});
	//add day_active class to the currnet active day
	activeDay.classList.add('day_active');
}
