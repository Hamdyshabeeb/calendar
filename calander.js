const monthnames = [
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
const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
/**
 *
 * @param {Date} date is date object
 * @param {HTMLHeadingElement} calenderHeader h1 element
 * @param {HTMLUListElement} calendarDayList ul element
 */
export default function renderCalender(date, calenderHeader, calendarDayList) {
	const month = createMonth(date);

	// update calender header text
	calenderHeader.innerText = `${month.currentMonth.monthName} ${month.fullYear}`;
	// renderCalender
	calendarDayList.innerHTML = '';

	calendarDayList.append(
		createLastMonthDays(month),
		createActiveMonthDays(month),
		createNextMonthDays(month)
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
 * @returns{DocumentFragment}
 */
function createActiveMonthDays(currentMonth) {
	const fragment = document.createDocumentFragment();
	const todayDate = new Date();
	const isToday = checkCurrentDayIsToday(currentMonth, todayDate);
	const today = todayDate.getDate();
	for (let i = 1; i <= currentMonth.lastDay.value; i++) {
		const day = document.createElement('li');
		day.className = 'day';
		day.innerText = `${i}`;
		if (isToday && i === today) {
			day.classList.add('day_today');
		}
		fragment.appendChild(day);
	}
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
