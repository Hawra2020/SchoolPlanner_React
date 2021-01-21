const express = require('express');

const { readData, writeData } = require('../utils');

const app = express();

app.post('/dictionary/:dictName', (req, res) => {
	const data = readData();
	const { dictName } = req.params;
	const dictionary = data[dictName];

	if (!req?.body?.value) {
		return res.status(400).send('Bad request');
	}

	if (!dictionary) {
		return res
			.status(404)
			.send(
				"Dictionary not found. Make sure you're passing the correct dictionary key name"
			);
	}

	const updatedData = writeData({
		...data,
		[dictName]: [...dictionary, req.body.value],
	});

	res.send(updatedData[dictName]);
});

app.put('/dictionary/:dictName/:key', (req, res) => {
	const data = readData();
	const { dictName } = req.params;
	let dictionary = data[dictName];

	if (!dictionary) {
		return res
			.status(404)
			.send(
				"Dictionary not found. Make sure you're passing the correct dictionary key name"
			);
	}

	dictionary = dictionary.map((key) =>
		key === req.params.key ? req.body.value : key
	);

	const updatedData = writeData({ ...data, [dictName]: dictionary });

	res.send(updatedData[dictName]);
});

app.delete('/dictionary/:dictName/:key', (req, res) => {
	const data = readData();
	const { dictName } = req.params;
	let dictionary = data[dictName];
	if (!dictionary) {
		return res
			.status(404)
			.send(
				"Dictionary not found. Make sure you're passing the correct dictionary key name"
			);
	}

	dictionary = dictionary.filter((key) => key !== req.params.key);
	const updateData = writeData({ ...data, [dictName]: dictionary });

	res.status(200).send(updateData[dictName]);
});

module.exports = app;
