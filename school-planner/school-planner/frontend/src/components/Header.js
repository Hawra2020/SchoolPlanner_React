import React, { useState, useContext, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import { CLEAR_DATA, SET_DATA } from '../store/actionTypes';
import { GlobalContext } from '../store/contexts/globalContext';
import { useOnClickOutside } from '../utils';

function Header() {
	const [showFileDropDown, setShowFileDropDown] = useState(false);
	const [showDictDropDown, setShowDictDropDown] = useState(false);
	const history = useHistory();

	const {
		state: { data },
		dispatch,
	} = useContext(GlobalContext);

	const { rooms, teachers, classes, groups } = data;

	const fileRef = useRef();
	const dictRef = useRef();

	useOnClickOutside(fileRef, () => setShowFileDropDown(false));
	useOnClickOutside(dictRef, () => setShowDictDropDown(false));

	const onChangeHandler = async (event) => {
		// const newFileReader = new FileReader();

		// if (event.target.files.length) {
		// 	newFileReader.readAsText(event.target.files[0], 'UTF-8');
		// 	newFileReader.onload = (e) => {
		// 		dispatch({
		// 			type: SET_DATA,
		// 			payload: {
		// 				data: JSON.parse(e.target.result, null, 2),
		// 				fileName: event.target.value.split('\\')[
		// 					event.target.value.split('\\').length - 1
		// 				],
		// 			},
		// 		});
		// 	};
		// 	newFileReader.onloadend = () => {
		// 		setShowFileDropDown(false);
		// 	};
		// }

		/**
		 * above code was used for local file reading. If local file reading is required, comment out the code below and uncomment the above one.
		 */

		try {
			const { data } = await axios.get('http://localhost:8000');
			dispatch({
				type: SET_DATA,
				payload: {
					data,
					fileName: 'data.json',
				},
			});
			setShowFileDropDown(false);
		} catch (error) {
			toast.error('Something went wrong');
		}
	};

	const onDownload = async (e) => {
		e.preventDefault();
		const fileData = JSON.stringify(data, null, 2);

		const blob = new Blob([fileData], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);

		const link = document.createElement('a');
		link.download = 'data.json';
		link.href = url;
		link.click();

		setShowDictDropDown(false);
		toast.success('Data downloaded successfully.');
	};

	return (
		<header className="sticky-top">
			<nav className="navbar bg-dark px-1 px-sm-5">
				<div className="d-flex w-100 justify-content-between align-items-center">
					<h3 className="m-0 cursor-pointer text-light">
						<Link
							to="/home"
							className="text-decoration-none text-light"
						>
							School planner
						</Link>
					</h3>
					<ul className="menu d-flex list-unstyled align-items-center m-0 ">
						<li className="mr-2">
							<Link
								to="/home"
								className="text-light text-decoration-none"
							>
								Home
							</Link>
						</li>
						<li className="position-relative mx-1 ">
							<button
								className="btn text-light"
								onClick={() =>
									setShowFileDropDown(!showFileDropDown)
								}
							>
								File
								<FontAwesomeIcon
									icon={faChevronDown}
									className="ml-1 mb-0"
									style={{ fontSize: 14 }}
								/>
							</button>
							{showFileDropDown && (
								<div
									className="drop-down position-absolute shadow"
									ref={fileRef}
								>
									<ul className="list-unstyled bg-dark">
										<li>
											<div className="file text-light btn cursor-pointer mb-1">
												Load
												<input
													type="file"
													name="file"
													accept=".json"
													onChange={onChangeHandler}
													className="cursor-pointer"
												/>
											</div>
										</li>
										<li>
											<button
												className="btn text-light mb-1"
												onClick={onDownload}
											>
												Download
											</button>
										</li>
										<li>
											<button
												className="btn text-light mb-1"
												onClick={(e) => {
													e.preventDefault();
													setShowFileDropDown(false);
													history.push('/home');
													dispatch({
														type: CLEAR_DATA,
													});
												}}
											>
												Clear
											</button>
										</li>
										<li>
											<button
												className="btn text-light"
												onClick={() =>
													setShowFileDropDown(false)
												}
											>
												Exit
											</button>
										</li>
									</ul>
								</div>
							)}
						</li>
						<li className="position-relative">
							<button
								className="btn text-light"
								onClick={() =>
									setShowDictDropDown(!showDictDropDown)
								}
							>
								Dictionaries
								<FontAwesomeIcon
									icon={faChevronDown}
									className="ml-1 mb-0"
									style={{ fontSize: 14 }}
								/>
							</button>
							{showDictDropDown && (
								<div
									className="drop-down shadow position-absolute"
									ref={dictRef}
								>
									<ul className="list-unstyled bg-dark">
										<li>
											<button className="btn text-light">
												<Link
													to={{
														pathname:
															'/dictionary/rooms',
														query: {
															rooms,
															callback: () =>
																setShowDictDropDown(
																	false
																),
														},
													}}
													className="text-light text-decoration-none"
												>
													Rooms
												</Link>
											</button>
										</li>
										<li>
											<button className="btn text-light">
												<Link
													to={{
														pathname:
															'/dictionary/teachers',
														query: {
															teachers,
															callback: () =>
																setShowDictDropDown(
																	false
																),
														},
													}}
													className="text-light text-decoration-none"
												>
													Teachers
												</Link>
											</button>
										</li>
										<li>
											<button className="btn text-light">
												<Link
													to={{
														pathname:
															'/dictionary/classes',
														query: {
															classes,
															callback: () =>
																setShowDictDropDown(
																	false
																),
														},
													}}
													className="text-light text-decoration-none"
												>
													Classes
												</Link>
											</button>
										</li>
										<li>
											<button className="btn text-light">
												<Link
													to={{
														pathname:
															'/dictionary/groups',
														query: {
															groups,
															callback: () =>
																setShowDictDropDown(
																	false
																),
														},
													}}
													className="text-light text-decoration-none"
												>
													Groups
												</Link>
											</button>
										</li>
									</ul>
								</div>
							)}
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
}

export default Header;
