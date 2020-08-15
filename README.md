# ESModule-for-node.js-and-core-promises

[Modern JavaScript & Node.js, ESModule and CorePromise](https://www.notion.so/Modern-JavaScript-Node-js-ESModule-and-CorePromise-86e73e700c6b4335aeb70a396f65c02b)

❗️너무 깊게 보지 않아도 된다 참고만 하자

# "Modern" Node.JS

- Don't take "modern" too literally.
- The syntax you learnt in this course is 100% correct, 100% up-to-date and used in the vast majority of projects!
- But NodeJS also support more modern JavaScript syntax features
- ES Modules
- Promises in Core APIS

# What are "ES Modules"?

- Import/Export Syntax for modern JavaScript in the Browser

```jsx
export const doSomething = () => { ... };
import { doSomething } from 'my-file';
```

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6cfa2990-6d92-40bd-b5a2-583fb89ec19a/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6cfa2990-6d92-40bd-b5a2-583fb89ec19a/Untitled.png)

# Working with ES Modules & SetUp

### Package JSON

```json
{
	"name": "complete-guide",
	"version": "1.0.0",
	"description": "",
	"main": "index.js",
	"type": "module",
	"scripts": {
		"test": "echo \"Error: no test specified\" && exit 1"
	},
	"author": "",
	"license": "ISC",
	"dependencies": {
		"express": "^4.17.1"
	}
}
```

```json
"type": "module",
```

⇒ add `"type": "module"`

### Refactoring

- Before being refactored

```jsx
const fs = require('fs');

const express = require('express');

const app = express();

app.get('/', (req, res, next) => {
	fs.readFile('my-page.html', 'utf8', (err, data) => {
		res.send(data);
	});
});

app.listen(3000);
```

- After being refactored

```jsx
import fs from 'fs';
import express from 'express';

import resHandler from './response-handler.js';

const app = express();

app.get('/', (req, res, next) => {
	fs.readFile('my-page.html', 'utf8', (err, data) => {
		res.send(data);
	});
});

app.listen(3000);
```

### Entire Project

- response-handler.js

```jsx
import fs from 'fs';

export const resHandler = (req, res, next) => {
	fs.readFile('my-page.html', 'utf8', (err, data) => {
		res.send(data);
	});
};

// export default resHandler
```

- app.js

```jsx
import express from 'express';

import { resHandler } from './response-handler.js';

const app = express();

app.get('/', resHandler);

app.listen(3000);
```

❗️When importing, you must give `extension name` , otherwise, it wouldn't work.

- package.json

```json
{
	"name": "complete-guide",
	"version": "1.0.0",
	"description": "",
	"main": "app.js",
	"type": "module",
	"scripts": {
		"test": "echo \"Error: no test specified\" && exit 1"
	},
	"author": "",
	"license": "ISC",
	"dependencies": {
		"express": "^4.17.1"
	}
}
```

# More on ES Modules

- node.js global

- Get absolute path ( it doesn't work with ES Modules )

```jsx
path.join(__dirname, 'my-page.html')
```

- Before being refactored

```jsx
import fs from 'fs';
import path from 'path';

export const resHandler = (req, res, next) => {
	fs.readFile('my-page.html', 'utf8', (err, data) => {
		res.send(data);
	});

	//It simply doesn't work if you configured ESModule
	// res.sendFile(path.join(__dirname, 'my-page.html'));
};

// export default resHandler
```

- After being refactored

```jsx
// import fs from 'fs';
// import path from 'path';

import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const resHandler = (req, res, next) => {
	// fs.readFile('my-page.html', 'utf8', (err, data) => {
	// 	res.send(data);
    // });
    
	//It simply doesn't work if you configured ESModule, unless you create the variable `__dirname` manually
	res.sendFile(path.join(__dirname, 'my-page.html'));
};

// export default resHandler
```

# Module Resources

Attached, you find the code snapshots for this module.

More on Node & ES Modules: [https://nodejs.org/dist/latest-v14.x/docs/api/esm.html](https://nodejs.org/dist/latest-v14.x/docs/api/esm.html)