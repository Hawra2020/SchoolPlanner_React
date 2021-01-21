import axios from 'axios';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import Layout from '../components/Layout';
import { SET_DATA } from '../store/actionTypes';
import { GlobalContext } from '../store/contexts/globalContext';
import { useSlots } from '../utils';
import UpdateSelector from '../components/UpdateSelector';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

function Update() {
	const { day, slot, room, group } = useParams();
	const history = useHistory();
	const slots = useSlots();

	const [creatingNew, setCreatingNew] = useState(false);
	const [activity, setActivity] = useState();
	const [loading, setLoading] = useState(false);

	const setNewActivity = useCallback((data) => {
		setActivity(data);
	}, []);

	const {
		state: {
			data: { activities, classes, groups, teachers },
		},
		dispatch,
	} = useContext(GlobalContext);

	const reloadData = useCallback(async () => {
		try {
			const { data } = await axios.get('http://localhost:8000');
			dispatch({ type: SET_DATA, payload: { data, selectedRooms: [] } });
		} catch (error) {
			toast.error('Something went wrong');
		}
	}, [dispatch]);

	useEffect(() => {
		const foundActivity = activities.find(
			(act) =>
				+act.day === +day && +act.slot === +slot && act.room === room
		);

		if (!Boolean(foundActivity)) {
			setCreatingNew(true);
			setNewActivity({
				class: '',
				group: '',
				teacher: '',
				day,
				room,
				slot,
			});
		} else {
			setNewActivity(foundActivity);
		}
		return reloadData();
		//eslint-disable-next-line
	}, []);

	const onChange = (e) => {
		const { name, value } = e.target;
		setActivity({ ...activity, [name]: value });
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		const { class: className, group, teacher, room, slot } = activity;

		if (!className || !group || !teacher || !room || !slot) {
			return toast.error('Please select all the fields first');
		}

		try {
			setLoading(true);

			if (creatingNew) {
				await axios.post('http://localhost:8000/activities', activity);
				toast.success('Activity created successfully');
			} else {
				await axios.put(
					`http://localhost:8000/activities/${room}/${slot}/${day}`,
					activity
				);
				toast.success('Activity updated successfully');
			}

			await reloadData();
			setLoading(false);
			setCreatingNew(false);
			history.push(`/home/${room}`);
		} catch (error) {
			setLoading(false);
			setCreatingNew(false);
			toast.error('Something went wrong');
		}
	};

	const onDelete = async (e) => {
		e.preventDefault();

		try {
			await axios.delete(
				`http://localhost:8000/activities/${room}/${slot}/${day}`
			);
			await reloadData();
			toast.success('Deleted successfuly');
			history.push(`/home/${room}`);
		} catch (e) {
			toast.error('Something went wrong');
		}
	};

	const generalClassNames =
		'd-flex justify-content-between align-items-center py-2 border-bottom';

	return (
		<Layout>
			<div className="col-12 align-items-center justify-content-center text-center border-bottom border-dark mb-3">
				<h1>Update Activity</h1>
			</div>
			<div className="col-12 col-lg-6 mx-auto mb-3">
				<div className={generalClassNames}>
					<span>Room</span>
					<span>{activity?.room}</span>
				</div>
				<div className={generalClassNames}>
					<span>Slot</span>
					<span>{slots[activity?.slot - 1]}</span>
				</div>
				<div className={generalClassNames}>
					<span>Day</span>
					<span>{days[activity?.day]}</span>
				</div>
			</div>
			<form className="col-12 col-lg-6 mx-auto">
				<div className="mb-3" />{' '}
				<UpdateSelector
					label="Class"
					value={activity?.class || ''}
					onChange={onChange}
					list={classes}
				/>
				<div className="mb-3" />
				<UpdateSelector
					label="Group"
					value={activity?.group || ''}
					onChange={onChange}
					list={groups}
				/>
				<div className="mb-3" />
				<UpdateSelector
					label="Teacher"
					value={activity?.teacher || ''}
					onChange={onChange}
					list={teachers}
				/>
				<div className="mb-3" />
				<div className="form-group d-flex justify-content-end">
					<button
						className={
							group === 'new'
								? 'btn btn-info mr-2'
								: 'btn btn-info'
						}
						// onClick={history.goBack}
						type="button"
					>
						<Link
							to={{
								pathname: `/home/${room}`,
							}}
						>
							Go back
						</Link>
					</button>
					{group !== 'new' && (
						<button
							className="btn btn-danger mx-2"
							onClick={onDelete}
						>
							Delete
						</button>
					)}
					<button
						className="btn btn-success"
						onClick={onSubmit}
						disabled={loading}
					>
						{creatingNew ? 'Create' : 'Save'}
					</button>
				</div>
			</form>
		</Layout>
	);
}

export default Update;
