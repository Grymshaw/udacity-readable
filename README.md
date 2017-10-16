# Readable App

This repository includes the code for the backend API Server that you'll use to develop and interact with the front-end portion of the project. All backend code was provided by Udacity as a starter template for the project.

## Project Summary

This is a content and comment web app that allows users to post to a set of pre-defined categories. Users can comment on these posts, and both posts and their comments can be voted on by any user.


All parts of the application frontend were built test-first. If adding new features or changes, be sure to build tests and make sure that other tests still pass. In the frontend/ directory, run `npm test` to run all tests.


## Notes

When shipping to production, ensure to change API address to the production API server in all frontend/src/actions/ files. Currently, these files fetch data from localhost:3001.

## Starting the Application

* Install and start the API server:
    - `cd api-server`
    - `npm install`
    - `node server`
* In another terminal window, install and start the front-end server:
    - `cd frontend`
    - `npm install`
    - `npm start`

## API Server

Information about the API server and how to use it can be found in its [README file](api-server/README.md).

## Front-end Server

The front-end of this application was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). See their documentation for full details.
