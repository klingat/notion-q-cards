```diff
- This is a work in progress
```

# ✏️ Notion Database Q-Cards

A React based app to help you study with a set of answers & questions from a Notion database, presented in Q-card format. Click on each card to reveal the answer.
![](https://user-images.githubusercontent.com/19555303/155453032-af31700a-b94b-46f5-8574-1ff1302ea47c.png)

## Setup

1. Ensure you are an admin of a Notion workspace.
2. Create a database page with 2 columns. The first column (title column) should be labelled as `question` and the second column should be labelled as `answer` and of type "text".
3. Add your set of questions and answers in this database page.
4. Then follow the steps from the Notion getting started guide to get a Notion integration token and your database ID you just created: https://developers.notion.com/docs/getting-started
5. Then create a .env file in /server and add the following keys:

```
NOTION_TOKEN=secret_yourToken
NOTION_DATABASE_ID=yourDatabaseID
```

## Available Scripts

### `npm install` 👈 to install dependencies

### `npm start` 👈 to run the client

### `node server.js` 👈 to run the server

Ensure both the server and client are running. Then open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
