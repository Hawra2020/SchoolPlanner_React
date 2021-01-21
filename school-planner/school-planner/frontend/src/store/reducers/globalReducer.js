import {
	CLEAR_DATA,
	SET_DATA,
	SET_SELECTED_ROOM,
	UPDATE_ACTIVITY,
} from '../actionTypes';
import {
	clearData,
	setData,
	setSelectedRooms,
	updateActivities,
} from '../actions/globalActions';

export const initialState = { data: {}, fileName: '', selectedRooms: [] };

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_DATA:
			return setData(state, action);
		case SET_SELECTED_ROOM:
			return setSelectedRooms(state, action);
		case UPDATE_ACTIVITY:
			return updateActivities(state, action);
		case CLEAR_DATA:
			return clearData(state);
		default:
			return state;
	}
};
