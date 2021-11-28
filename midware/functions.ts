import { readFileSync } from 'fs';
import path from 'path';

const obj = {
	loadItems: () => {
		try {
			const data = readFileSync(path.resolve('./routes/data.json'), {
				encoding: 'utf-8',
			});
			return JSON.parse(data);
		} catch (err) {
			console.log(err);
			return [];
		}
	},
};

module.exports = obj;
