const express = require('express');

const { readData, writeData } = require('../utils');

const app = express();

app.get('/activities', (req, res) => {
	const data = readData();
	res.status(200).send(data.activities);
});

app.post('/activities', (req, res) => {
	const data = readData();
	const { class: className, day, group, room, slot, teacher } = req.body;

	if (!className || !day || !group || !room || !slot || !teacher) {
		return res
			.status(400)
			.send('Please provide all the details to create an activity');
	}

	data.activities.push({
		class: className,
		day: +day,
		group,
		room,
		slot: +slot,
		teacher,
	});

	writeData(data);

	res.send({ class: className, day, group, room, slot, teacher });
});

app.put('/activities/:room/:slot/:day', (req, res) => {
	const data = readData();
	const { room, slot, day } = req.params;

	const foundIndex = data.activities.findIndex(
		(activity) =>
			+activity.slot === +slot &&
			activity.room === room &&
			+activity.day === +day
	);

	if (foundIndex < 0) {
		return res.status(404).send('Activity not found');
	}
	const foundActivity = data.activities[foundIndex];

	const updatedActivity = {
		...foundActivity,
		...req.body,
		slot: +req?.body?.slot,
		day: +req?.body?.day,
	};

	const updatedActivities = [
		...data.activities.slice(0, foundIndex),
		updatedActivity,
		...data.activities.slice(foundIndex + 1),
	];

	writeData({
		...data,
		activities: updatedActivities,
	});

	res.send(updatedActivity);
});

app.delete('/activities/:room/:slot/:day', (req, res) => {
	const data = readData();
	const { room, slot, day } = req.params;

	const foundIndex = data.activities.findIndex(
		(activity) =>
			+activity.slot === +slot &&
			activity.room === room &&
			+activity.day === +day
	);

	if (foundIndex < 0) {
		return res.status(404).send('Activity not found');
	}

	const updatedActivities = [
		...data.activities.slice(0, foundIndex),
		...data.activities.slice(foundIndex + 1),
	];

	writeData({
		...data,
		activities: updatedActivities,
	});

	res.status(200).send(updatedActivities);
});

module.exports = app;
