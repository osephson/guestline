# Introduction

A website that allows users to browse the list of hotels and their rooms.

## Prerequisites

1. Before you run the application, make sure all the required software are installed on your local machine:

- [Node.js 16+](https://nodejs.org/en)
- [Yarn 1.22+](https://classic.yarnpkg.com/en/)

2. Install project dependencies with the following script:

   ```shell
   yarn install
   ```

3. Add the `REACT_APP_COLLECTION_ID` to `.env.local.example` and rename the file to `.env.local`. Otherwise, the default value of Collection ID would be `OBMNG`.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
