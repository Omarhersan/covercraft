# Covercraft Project

## Overview
This is the initial development project for Covercraft. The project is set up with a development environment and a production environment.

## Development Environment
The following modules are installed as part of the development environment:

- **nodemon**: Automatically restarts the node application when file changes are detected.
- **eslint**: Lints JavaScript code to ensure code quality and consistency.
- **jest**: JavaScript testing framework for writing and running tests.

## Production Environment
The following modules are installed as part of the production environment:

- **express**: Fast, unopinionated, minimalist web framework for Node.js.
- **mongoose**: MongoDB object modeling tool designed to work in an asynchronous environment.
- **dotenv**: Loads environment variables from a `.env` file into `process.env`.

## Available Scripts
In the project directory, you can run:

### `npm start`
Runs the app in the production mode.

### `npm run dev`
Runs the app in the development mode using nodemon.

### `npm test`
Launches the test runner using Jest.

## Installation
To install the dependencies, run:
```bash
npm install
```

## Usage
To start the development server, run:
```bash
npm run dev
```

To start the production server, run:
```bash
npm start
```

To run tests, run:
```bash
npm test
```

## License
This project is licensed under the MIT License.