// const fs = require('fs');
import fs from 'fs/promises'; //core promises feature
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const resHandler = (req, res, next) => {
	//import fs from 'fs/promises'; //core promises feature 코드를 적용했기 때문에, 기본 module뒤에 promise chain을 붙일 수 있다.
	fs
		.readFile('my-page.html', 'utf8')
		.then((data) => {
			res.send(data);
		})
		.catch((err) => console.log(err));
};

// module.exports = resHandler;
// export default resHandler;
