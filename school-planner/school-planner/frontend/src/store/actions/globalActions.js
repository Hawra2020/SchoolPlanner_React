const setData = (state, action) => {
	const { data, fileName = 'data.json' } = action.payload;

	return {
		...state,
		data,
		fileName,
		selectedRooms: action.payload?.selectedRooms || [],
	};
};

const setSelectedRooms = (state, action) => {
	const { rooms } = action.payload;

	return {
		...state,
		selectedRooms: rooms,
	};
};

const updateActivities = (state, action) => {
	const { slot, room, group, day } = action.payload;

	const {
		data: { activities },
		selectedRooms,
	} = state;
	const activity = activities.find(
		(act) => act.slot === +slot && act.room === room
	);

	const updatedActivities = [
		...activities.filter((a) => a.slot !== +slot && a.room !== room),
		{ ...activity, group, day },
	];

	const updatedRooms = [
		...selectedRooms.filter(
			(a) =>
				a.slot === +slot &&
				a.room === room &&
				a.group === group &&
				+a.day === +day
		),
		{ ...activity, group, day },
	];

	return {
		...state,
		data: {
			...state.data,
			activities: updatedActivities,
		},
		selectedRooms: updatedRooms,
	};
};

const clearData = (state) => {
	return { ...state, selectedRooms: [], data: {}, fileName: '' };
};

export { setData, setSelectedRooms, updateActivities, clearData };
