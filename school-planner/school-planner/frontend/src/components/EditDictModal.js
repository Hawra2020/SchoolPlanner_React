import React, { useState } from 'react';
import Modal from 'react-modal';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import axios from 'axios';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		width: '30rem',
	},
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

function DictModal({ title, currentKey, onSuccessCallback, dictionary }) {
	const [modalIsOpen, setIsOpen] = useState(false);

	const [value, setValue] = useState('');

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	const onEdit = async (key) => {
		if (!value.trim()) {
			return toast.error('Please enter a value to edit');
		}

		const alreadyExists = dictionary.find(
			(k) => k.toLowerCase() === value.toLowerCase()
		);

		if (alreadyExists) {
			toast.warn('New value can not be equal to old value');
			return;
		}

		try {
			const {
				data,
			} = await axios.put(
				`http://localhost:8000/dictionary/${title}/${key}`,
				{ value }
			);

			onSuccessCallback(data);
			toast.success('Updated...!');
			closeModal();
		} catch (e) {
			toast.error('Something went wrong');
		}
	};

	return (
		<div>
			<button onClick={openModal} className="btn mr-1" type="button">
				Edit{' '}
				<FontAwesomeIcon
					icon={faEdit}
					className="ml-2"
					style={{ fontSize: 14, marginBottom: 2 }}
				/>
			</button>
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel="Editing dictionary"
			>
				<div className="d-flex align-items-center justify-content-between border rounded px-3 py-2 mb-3">
					{' '}
					<h2 className="m-0 p-0">Editing {title} </h2>
					<button
						onClick={closeModal}
						className="btn m-0 p-0"
						type="button"
					>
						Cancel
					</button>
				</div>
				<form className="d-flex flex-column border rounded p-3">
					<div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3 border-dark">
						<span>Current value</span>
						<span>{currentKey}</span>
					</div>
					<label htmlFor="newValue">New value</label>
					<input
						className="form-control mb-1"
						name="newValue"
						value={value}
						onChange={(e) => setValue(e.target.value)}
						id="newValue"
						placeholder="Enter new value"
					/>
					<button
						className="btn btn-dark mt-1"
						type="button"
						onClick={(e) => {
							e.preventDefault();
							onEdit(currentKey);
						}}
					>
						Save
					</button>
				</form>
			</Modal>
		</div>
	);
}

export default DictModal;
