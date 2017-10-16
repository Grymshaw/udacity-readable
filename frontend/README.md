# Project Summary
This is a content and comment web app that allows users to post to a set of pre-defined categories. Users can comment on these posts, and both posts and their comments can be voted on by any user.


All parts of the application frontend were built test-first. If adding new features or changes, be sure to build tests and make sure that other tests still pass. In the frontend/ directory, run `npm test` to run all tests.


# Notes
When shipping to production, ensure to change API address to the production API server in all actions/ files. Currently, these files fetch data from localhost:3001


# Running
In order to use this application:
1) Clone this repository and change into the created directory
2) Run `npm install`
3) Run `npm start` to start the client server.

_note: The api server must also be running on port `3001` in order for the application to work correctly_


# Other Notes
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

See this documentation for all commands and instructions related to create-react-app.
