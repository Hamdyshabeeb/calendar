/**
 * events module
 * @module events
 */

export const events = {};
/**
 *@class
 *
 */
export class EventFactory {
	/**
	 * @type {string}
	 *
	 */
	#id;
	/**
	 *
	 * @param {string} name event description
	 * @param {string} start time string
	 * @param {string} end time string
	 * @param {{year:number,month:number,day:number}} activeDate
	 * @param {string} [id]
	 */
	constructor(name, start, end, activeDate, id) {
		/**@property{string} name */
		this.name = name;

		/** @property {string} start time string*/
		this.start = start;

		/**@property{string} end time string*/
		this.end = end;

		/**@property {{year:number,month:number,day:number}} date */
		this.date = Object.assign({}, activeDate);
		/**
		 * @property {string} id
		 * @readonly
		 */

		this.#id = id || EventFactory.createId();
	}

	get id() {
		return this.#id;
	}
	/**
	 * @param {HTMLUListElement} eventList
	 *
	 */
	renderEvent(eventList) {
		/**@type {HTMLLIElement} li element */
		const li = document.createElement('li');
		const eventDay = document.querySelector(
			`.day[data-day='${this.date.day}']`
		);

		li.className = 'event';
		li.dataset.id = this.id;
		li.dataset.string = EventFactory.createDayString(this.date);
		li.innerHTML = `
		<p class="event-description">
			${this.name}
		</p>
		<div class="event-time">
			<time class="event-time_start" datetime="${this.start}">${this.start}</time>
			<span class="icon-separator">
				<ion-icon name="remove-outline"></ion-icon>
			</span>
			<time class="event-time_end" datetime="${this.end}">${this.end}</time>
		</div>
		`;
		// attach event to li event
		li.addEventListener('click', () => {
			EventFactory.removeEvent(li, eventDay);
		});
		// change event list data-events to true and remve no events p elemnt
		if (eventList.dataset.events === 'false') {
			eventList.dataset.events = true;
			eventList.firstChild && eventList.firstChild.remove();
		}
		// add data-event='true' to calander day
		if (!eventDay.dataset.event) {
			eventDay.dataset.event = 'true';
		}
		//append event to
		eventList.appendChild(li);
		this.#pushEventToEvents();
	}

	#pushEventToEvents() {
		const dayString = EventFactory.createDayString(this.date);
		if (events[dayString]) {
			events[dayString][this.id] = this;
		} else {
			events[dayString] = { [this.id]: this };
		}
	}

	/**
	 * @memberof EventFactory
	 * @returns {string}
	 */
	static createId() {
		const dateString = Date.now().toString(32);
		const randomness = Math.floor(
			Math.floor(Math.random() * 10) +
				Math.random() * Math.round(100 + Math.random() * 100)
		).toString(32);

		return dateString + randomness;
	}
	/**@param{object} date */
	static createDayString(date) {
		return `${date.year}_${date.month}_${date.day}`;
	}
	/**
	 * remove event from dom and from event obj
	 *@param {HTMLLIElement} li
	 *  */
	static removeEvent(li, eventDay) {
		/**@type{string} */
		const id = li.dataset.id || '';
		const dayString = li.dataset.string || '';
		const eventList = li.parentElement;
		if (events[dayString][id]) delete events[dayString][id];
		//remove from dom
		li.remove();
		// remove data-event from calander day if that event is last event in the day
		if (eventList.children.length === 0) {
			delete eventDay.dataset.event;
			eventList.dataset.events = 'false';
			eventList.innerHTML = '<p class="no-events">NO Events<p/>';
		}
	}
	/**
	 * @param {HTMLHeadingElement} eventsTitle events section header
	 * @param {HTMLUListElement} eventList event list
	 * @param {{year:number,month:number,day:number}} activeDate current calander active date
	 * @param {Array.<string>} monthNames all year month names
	 *
	 */
	static renderEventSection(eventsTitle, eventList, activeDate, monthNames) {
		const date = new Date(activeDate.year, activeDate.month, activeDate.day);
		const activeDayName = date.toString().split(' ')[0];
		const activeMonthName = monthNames[activeDate.month];
		const activeYear = activeDate.year;
		const dayString = EventFactory.createDayString(activeDate);
		/**@type{HTMLLIElement|null} */
		const activeDateElement = document.querySelector(
			`.day[data-day='${activeDate.day}']`
		);

		eventsTitle.innerHTML = `
								<span class="day-active_name">${activeDayName}</span>
								<time datetime="" class="day-active_date">${activeDate.day} ${activeMonthName} ${activeYear}</time>
								`;

		eventList.innerHTML = '';
		// check if that day exist in the events object
		if (events[dayString] && Object.entries(events[dayString]).length > 0) {
			const allDayEvents = Object.values(events[dayString]);
			allDayEvents.forEach((event) => {
				event.renderEvent(eventList);
			});

			if (!('event' in activeDateElement.dataset)) {
				activeDateElement.dataset.event = true;
			}
			eventList.dataset.events = true;
		} else {
			eventList.innerHTML = '<p class="no-events"> No Events</p>';
			delete activeDateElement.dataset.event;
			eventList.dataset.events = 'false';
		}
	}

	static checkIfDayStringExistInEvents(string) {
		return (
			(events[string] && Object.entries(events[string]).length > 0) || false
		);
	}
}
