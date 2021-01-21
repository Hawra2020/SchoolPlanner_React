import React, { useState } from 'react';
import Modal from 'react-modal';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { toast } from 'react-toastify';

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

Modal.setAppElement('#root');

function DictModal({ title, onSuccessCallback, dictionary }) {
	const [modalIsOpen, setIsOpen] = useState(false);
	const [value, setValue] = useState('');
	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	const onAdd = async () => {
		if (!value.trim()) {
			toast.error('Please enter a new value');
			return;
		}

		const alreadyExists = dictionary.find(
			(k) => k.toLowerCase() === value.toLowerCase()
		);

		if (alreadyExists) {
			toast.warn('Key already exists');
			return;
		}

		try {
			const { data } = await axios.post(
				`http://localhost:8000/dictionary/${title}`,
				{
					value,
				}
			);
			onSuccessCallback(data);
			toast.success(`${title} dictionary updated successfully`);
			closeModal();
		} catch (e) {
			toast.error('Something went wrong');
		}
	};

	return (
		<div>
			<button className="btn btn-success text-nowrap" onClick={openModal}>
				Add new
				<FontAwesomeIcon
					icon={faFile}
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
					<h2 className="m-0 p-0">Adding into {title} </h2>
					<button
						onClick={closeModal}
						className="btn m-0 p-0"
						type="button"
					>
						Cancel
					</button>
				</div>
				<form className="d-flex flex-column border rounded p-3">
					<label htmlFor="newValue">New value</label>
					<input
						className="form-control mb-1"
						name="newValue"
						id="newValue"
						placeholder="Enter new value"
						value={value}
						onChange={(e) => setValue(e.target.value)}
					/>
					<button
						className="btn btn-dark mt-1"
						type="button"
						onClick={(e) => {
							e.preventDefault();
							onAdd();
						}}
					>
						Add
					</button>
				</form>
			</Modal>
		</div>
	);
}

export default DictModal;
