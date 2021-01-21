const express = require('express');
const { json } = require('body-parser');
var cors = require('cors');

const { readData } = require('./utils');
const activitiesRoute = require('./routes/activities.route');
const dictionariesRoute = require('./routes/dictionaries.route');
const app = express();

app.use(cors());
app.use(json());

app.get('/', (req, res) => {
	const data = readData();

	res.status(200).send(data);
});

app.use('/', activitiesRoute);
app.use('/', dictionariesRoute);

app.use('/', (req, res) => {
	res.status(404).send('You reached the end. nothing found');
});

app.listen(8000, () => {
	console.log('Listening on port 8000');
});
