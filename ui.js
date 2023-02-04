/**
 *
 * @param {HTMLDivElement} modal
 * @param {boolean} on have value of true if modal active or  false if modal inactive
 */
export function modalWindow(modal, on) {
	if (on) {
		modal.classList.add('active');
		setTimeout(() => {
			modal.querySelector('.modal-container').style =
				'opacity:1;transform: translateX(0%) ';
		}, 300);
	} else {
		modal.querySelector('.modal-container').style =
			'opacity:0;transform: translateX(-100%)';
		setTimeout(() => {
			modal.classList.remove('active');
		}, 300);
	}
}
