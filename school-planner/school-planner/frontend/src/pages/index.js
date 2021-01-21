import axios from 'axios';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Layout from '../components/Layout';
import Row from '../components/Row';
import { SET_DATA, SET_SELECTED_ROOM } from '../store/actionTypes';
import { GlobalContext } from '../store/contexts/globalContext';
import { useSlots } from '../utils';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

function Home() {
	const params = useParams();
	const history = useHistory();

	const {
		state: {
			fileName,
			data: { activities, rooms },
			selectedRooms,
		},
		dispatch,
	} = useContext(GlobalContext);

	const reloadData = useCallback(async () => {
		try {
			const { data } = await axios.get('http://localhost:8000');
			dispatch({ type: SET_DATA, payload: { data } });
		} catch (e) {
			// toast.error('Something went wrong');
		}
	}, [dispatch]);

	const [selectedRoom, setSelectedRoom] = useState(
		params?.prevSelectedRoom || ''
	);

	useEffect(() => {
		reloadData();
	}, [reloadData]);

	useEffect(() => {
		(async () => {
			if (selectedRoom && activities?.length) {
				let rooms = activities.filter(
					(activity) => activity.room === selectedRoom
				);
				if (!rooms.length) {
					rooms = new Array(5).fill({
						class: '',
						group: '',
						room: selectedRoom,
						slot: '1',
						teacher: '',
					});
				}
				dispatch({ type: SET_SELECTED_ROOM, payload: { rooms } });
			}
		})();
	}, [activities, dispatch, selectedRoom, reloadData]);

	const slots = useSlots();

	const slotWiseActivities = {};

	for (let i = 0; i < slots.length; i++) {
		slotWiseActivities[i + 1] = new Array(5).fill(<td></td>);
	}

	selectedRooms.forEach((room) => {
		if (room.slot in slotWiseActivities) {
			slotWiseActivities[room.slot].push(room);
		} else {
			slotWiseActivities[room.slot] = [room];
		}
	});

	const createdRows = Object.keys(slotWiseActivities).map((slot) => (
		<Row
			slot={slot}
			key={Math.random() * Date.now()}
			slotWiseActivities={slotWiseActivities}
			room={selectedRooms[0]?.room}
		/>
	));

	return (
		<Layout>
			<div className="row">
				{fileName ? (
					<div className="col-12 col-lg-10 mx-auto">
						<div>
							<h2 className="p-0 mt-3">Activities in room:</h2>
							<form className="row">
								<div className="p-0 form-group col-12 col-sm-6">
									<label htmlFor="room">Room</label>
									<select
										placeholder="Please select a room"
										name="room"
										id="room"
										className="form-control"
										onChange={(e) => {
											setSelectedRoom(e.target.value);
											history.push(
												`/home/${e.target.value}`
											);
										}}
										value={selectedRoom}
									>
										<option value="" disabled>
											Select a room
										</option>
										{rooms.map((room) => (
											<option value={room} key={room}>
												{room}
											</option>
										))}
									</select>
								</div>
							</form>
						</div>
						{selectedRooms.length > 0 && (
							<div className="table-responsive">
								<table
									className="table table-bordered table-sm"
									style={{ marginBottom: '6rem' }}
									id="planner-table"
								>
									<thead className="thead-dark">
										<tr>
											<th className="text-center">
												Time
											</th>
											{days.map((day) => (
												<th
													key={day}
													className="text-center"
												>
													{day}
												</th>
											))}
										</tr>
									</thead>
									<tbody>{createdRows}</tbody>
								</table>
							</div>
						)}
					</div>
				) : (
					<div className="col-12 col-lg-10 mx-auto">
						<h1 className="text-center">
							Please select a file to view
						</h1>
					</div>
				)}
			</div>
		</Layout>
	);
}

export default Home;
