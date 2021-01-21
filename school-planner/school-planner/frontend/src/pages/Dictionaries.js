import React, { useContext, useEffect, useState } from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { toast } from 'react-toastify';

import EditDictModal from '../components/EditDictModal';
import AddDictModal from '../components/AddDictModal';
import Layout from '../components/Layout';
import { GlobalContext } from '../store/contexts/globalContext';

function Dictionaries({ location: { pathname, query } }) {
	const dictKey = pathname.split('/')[pathname.split('/').length - 1];

	const {
		state: {
			data: { activities },
		},
	} = useContext(GlobalContext);

	const [dictionary, setDictionary] = useState(query[dictKey]);

	useEffect(() => {
		query.callback();
		setDictionary(query[dictKey]);
	}, [query, dictKey]);

	const onActionSuccessCB = (dict) => {
		setDictionary(dict);
	};

	const onDelete = async (key) => {
		try {
			const { data } = await axios.delete(
				`http://localhost:8000/dictionary/${dictKey}/${key}`
			);
			toast.success('Deleted...!');
			onActionSuccessCB(data);
		} catch (e) {
			toast.error('Something went wrong');
		}
	};

	const keyRenderrer = (key) => {
		const activityExists = activities.find((activity) => {
			const keyExists = Object.values(activity).find((k) => k === key);
			return keyExists;
		});

		return (
			<div
				key={key}
				className="border-bottom border-dark py-3 d-flex justify-content-between align-items-center"
			>
				<h4 className="mb-0 text-uppercase">{key}</h4>
				{activityExists ? (
					<span style={{ fontSize: 14 }} className="text-muted">
						Delete all activities using {key}
						&nbsp;
						{dictKey} to view actions{' '}
					</span>
				) : (
					<div className="d-flex">
						<EditDictModal
							title={dictKey}
							currentKey={key}
							onSuccessCallback={onActionSuccessCB}
							dictionary={dictionary}
						/>
						<button
							className="btn btn-danger"
							type="button"
							onClick={(e) => {
								e.preventDefault();
								onDelete(key);
							}}
						>
							Delete
							<FontAwesomeIcon icon={faTrash} className="ml-1" />
						</button>
					</div>
				)}
			</div>
		);
	};

	return (
		<Layout>
			<h1 className="my-3 pb-2 text-capitalize border-bottom border-dark text-center">
				Available {dictKey}{' '}
			</h1>

			<div className="mx-auto">
				<div className="col-12 col-lg-6 mx-auto">
					<div className="col-12 mx-auto">
						<div className="d-flex justify-content-between align-items-center pb-1 mb-2">
							<h5 className="m-0">
								Total {dictionary.reduce((acc) => acc + 1, 0)}{' '}
								{dictKey} are available
							</h5>
							<AddDictModal
								title={dictKey}
								onSuccessCallback={onActionSuccessCB}
								dictionary={dictionary}
							/>
						</div>
						{dictionary.map(keyRenderrer)}
					</div>
				</div>
			</div>
		</Layout>
	);
}

export default Dictionaries;
