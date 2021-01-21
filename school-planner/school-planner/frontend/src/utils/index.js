import { useEffect } from 'react';

// Hook
function useOnClickOutside(ref, handler) {
	useEffect(
		() => {
			const listener = (event) => {
				// Do nothing if clicking ref's element or descendent elements
				if (!ref.current || ref.current.contains(event.target)) {
					return;
				}

				handler(event);
			};

			document.addEventListener('mousedown', listener);
			document.addEventListener('touchstart', listener);

			return () => {
				document.removeEventListener('mousedown', listener);
				document.removeEventListener('touchstart', listener);
			};
		},
		// Add ref and handler to effect dependencies
		// It's worth noting that because passed in handler is a new ...
		// ... function on every render that will cause this effect ...
		// ... callback/cleanup to run every render. It's not a big deal ...
		// ... but to optimize you can wrap handler in useCallback before ...
		// ... passing it into this hook.
		[ref, handler]
	);
}

const useSlots = () => {
	const slotDuration = 45;
	const breaktTime = 15;
	const startDate = new Date(1970, 0, 1, 8, 15);
	const endDate = new Date(1970, 0, 1, 9, 0);

	const slots = [];

	while (startDate.getDate() === 1 && startDate.getHours() < 20) {
		const startHours = startDate.getHours();
		const startMinutes = startDate.getMinutes();

		const startDateString = `${
			startHours < 10 ? '0' + startHours : startHours
		}:${startMinutes < 10 ? '0' + startMinutes : startMinutes} ${
			startHours >= 12 ? 'PM' : 'AM'
		}`;

		const endHours = endDate.getHours();
		const endMinutes = endDate.getMinutes();

		const endDateString = `${endHours < 10 ? '0' + endHours : endHours}:${
			endMinutes < 10 ? '0' + endMinutes : endMinutes
		} ${endHours >= 12 ? 'PM' : 'AM'}`;

		slots.push(`${startDateString} - ${endDateString}`);
		startDate.setMinutes(
			startDate.getMinutes() + slotDuration + breaktTime
		);
		endDate.setMinutes(startDate.getMinutes() + slotDuration);
	}
	return slots;
};

export { useOnClickOutside, useSlots };
