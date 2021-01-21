import React from 'react';
import Layout from '../components/Layout';

function About() {
	return (
		<Layout>
			<div className="row mb-5">
				<div className="col-12 col-sm-10 mx-auto mt-2">
					<div className="about-section">
						<div className="about-section-content ">
							<h1>Who am I?</h1>
							<div>
								<p>
									I'm Hawra Saif from Udaipur, India. I'm a student
									of bachelor's degree from Warsaw University of Technology.
								</p>
							</div>
						</div>
					</div>
					<div>
						<div className="about-section">
							<div className="about-section-content">
								<h1>What is this?</h1>
								<div>
									<p>
										The goal of the project is to create a simple school planner
										application capable of storing, displaying and managing classes
										scheduled for a given day and time slot.
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="mb-5">
						<div className="about-section mb-5">
							<div className="about-section-content mb-5">
								<h1>How this works?</h1>
								<div>
									<ol>
										<li>
											{' '}
											<p>
												At start the application's
												homepage is opened and all the data
												is loaded from our server by
												default and populated to the table.
											</p>
										</li>
										<li>
											<p>
												Once loaded, a select input
												appears with all the available
												rooms in our school/databse.
												From there, we can select
												any room to view classes/groups
												scheduled in that room at given days and
												time slots.
											</p>
										</li>
										<li>
											<p>
												As we click on any of the cells,
												we'll be reouted to{' '}
												<code>/update</code> page where
												we can either create a new class
												or edit the existing one.{' '}
											</p>
										</li>
										<li>
											<p>
												{' '}
												On the <code>/update</code>{' '}
												page, room, slot and day of the
												selected group will be shown.{' '}
											</p>
											<p>
												Below that, we'll see three
												select inputs for selecting
												class, group, teacher for the
												selected cell.
											</p>
											<p>
												After selecting inputs, If
												previously we clicked on blank
												cell we'll see two buttons{' '}
												<code>Go back</code> and{' '}
												<code>Create</code>.{' '}
												<p>
													If we click on a cell
													with content, we'll
													see three buttons{' '}
													<code>Go back</code>,{' '}
													<code>Delete</code> and{' '}
													<code>Save</code>
												</p>
											</p>
										</li>
										<li>
											<p>
												Clicking <code>Go back</code>{' '}
												will move us to <code>/</code>{' '}
												homepage without doing anything
												at all.
											</p>
											<p>
												We'll see <code>Delete</code>{' '}
												button only if we click on a
												cell with content in that.
												Clicking this button will delete
												the selected group and move us
												back to <code>/</code> homepage.
											</p>
											<p>
												Clicking <code>Save</code> or{' '}
												<code>Create</code> will save
												the changes in the system and
												move us back to <code>/</code>{' '}
												homepage
											</p>
										</li>
										<li>
											<p>
												In the navigation bar at the
												top, we have two dropdown
												menus. In the <code>File</code>{' '}
												menu we have four options
											</p>

											<ul>
												<li>
													<h4>File menu items</h4>
													<ul>
														<li>
															<h4>Load</h4>
															<p>
																Loads data from
																the system and
																displays in the
																app.
															</p>
														</li>
														<li>
															<h4>Download</h4>
															<p>
																This will
																download all the
																data from server
																to the
																system.
															</p>
														</li>
														<li>
															<h4>Clear</h4>
															<p>
																Will erase all
																the data in the from our side, and not
																the server. As
																we refresh the
																page we'll be
																able to see the
																data again.
															</p>
														</li>
														<li>
															<h4>Exit</h4>
															<p>
																Exits the File
																menu
															</p>
														</li>
													</ul>
												</li>
												<li>
													<ul>
														<h4>
															Dictionary menu
															items
														</h4>
														<li>
															<h4>Rooms</h4>
															<p>
																We'll be able
																to
																view/edit/delete/add
																rooms to our
																system.
															</p>
														</li>
														<li>
															<h4>Teachers</h4>
															<p>
																We'll be able
																to
																view/edit/delete/add
																teacher to our
																system.
															</p>
														</li>
														<li>
															<h4>Classes</h4>
															<p>
																We'll be able
																to
																view/edit/delete/add
																classes to our
																system.
															</p>
														</li>
														<li>
															<h4>Groups</h4>
															<p>
																We'll be able
																to
																view/edit/delete/add
																groups to our
																system.
															</p>
														</li>
													</ul>
												</li>
											</ul>
											<p className="text-muted">
												We can modify dictionary item
												only if that item is not being
												used by any of the available
												activities. This is true for all
												of the dictionaries.
											</p>
											<p>&nbsp;</p>
										</li>
									</ol>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}

export default About;
