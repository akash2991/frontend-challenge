# Product Engineer Front-End Challenge

## Folder Structure

- App is structured according to **Type-First-Organization** methodology.
- `App.js` is the entry point for the app (in `/news-app-react/src` folder)
- It contains following folders (names are self explanatory)
  1. tests
  2. components
  3. screens
  4. service
  5. utils

## Folder Contents

- Tests folder contains tests
- Inside the components folder, **component driven development** is followed (atoms, molecules, organisms) to keep the components modular and insulated.
- Service folder **separates business logic from UI**. API calls are extracted from the component and can be easily reused by any component using a simple function call
- Utils folder contains all the other utilities that are used with in the app like constants, helper functions etc.

Each folder exports its own index file. It has dual benefits

- relative paths of its exports are insulated even if we shuffle the contents inside the folder
- it also mitigates the problem of deeply nested imports

## Technical Choices

- React is used as front end framework
- React's local state API is used to store data on frontend
- Fetch API is used for server calls
- Jest and enzyme are used for testing
- Material UI library is used for components

## To start the app

go to `/news-app-react` and execute _npm i && npm start_

## To start test

go to `/news-app-react` and execute _npm test_

## Analytics Task

**[Analytics Task](ANALYTICS.md)**

## DB task

**[Database Evaluation Task](DB-Task.md)**
