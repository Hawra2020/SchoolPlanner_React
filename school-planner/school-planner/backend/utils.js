const fs = require('fs');

exports.readData = () => {
	const data = fs.readFileSync('./data.json', { encoding: 'utf8' });
	return JSON.parse(data);
};

exports.writeData = (data) => {
    fs.writeFileSync("./data.json", JSON.stringify(data))
    return this.readData()
}
