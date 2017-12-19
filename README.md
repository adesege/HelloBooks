[![Build Status](https://travis-ci.org/adesege/HelloBooks.svg?branch=chore/153550278/feedback-implementation)](https://travis-ci.org/adesege/HelloBooks)
[![Code Climate](https://codeclimate.com/github/adesege/HelloBooks/badges/gpa.svg)](https://codeclimate.com/github/adesege/HelloBooks)
[![Test Coverage](https://codeclimate.com/github/adesege/HelloBooks/badges/coverage.svg)](https://codeclimate.com/github/adesege/HelloBooks/coverage)
[![Coverage Status](https://coveralls.io/repos/github/adesege/HelloBooks/badge.svg?branch=chore/153550278/feedback-implementation)](https://coveralls.io/github/adesege/HelloBooks?branch=chore/153550278/feedback-implementation)
[![Issue Count](https://codeclimate.com/github/adesege/HelloBooks/badges/issue_count.svg)](https://codeclimate.com/github/adesege/HelloBooks)

# Hello-Books 
A simple application that helps manage a library and its processes like stocking, tracking and renting books.

Built on `Nodejs`.

<img width="1440" alt="screen shot 2017-12-13 at 5 29 15 pm" src="https://user-images.githubusercontent.com/20769821/33949896-313c8d4c-e02b-11e7-89c6-df0f6dfd6b95.png">


## How to install
### Pre-requisites
You will need to have the following installed in your working environment before this application can work.
* Latest version of Nodejs - comes with a Node Package Manager
* Postgresql
### Installing
1. Download or clone this branch at https://github.com/adesege/HelloBooks.git
2. Install dependencies by running `npm install`. Ensure you are in your working directory. Run `cd /path/to/HelloBooks` to change.
1. Go to client directory and run `npm run install` to install dependencies.
3. Go to the root dir `cd ../`
1. Then type `npm run transpile` to transpile from es6 to es5
1. and then run `npm run start:dev` in your terminal to start the server.
1. To start the client, `cd client`
1. Then `npm run start`

The server and client listens on port `5000` and `3000` by default respectively unless otherwise stated as an environment variable.

Visit `http://localhost:3000` to access the front end and `http://localhost:5000/api` to access the `api` endpoint.

## Authentication Mechanism
This application uses JSON web token to sign and verify users. The default expiration time is `24 hours` but this can be modified in the application config.

## Middlewares
Some endpoints are restricted to logged users and admins only. E.g. Only admin can access `api/:versionNumber/books/stocks`.

There are two middlewares defined in this application.
* authMiddleware - verifies a user's token and checks if the user is valid.
* adminMiddleware - checks if the user is `admin`.

## Documentation
> If Ruby is already installed, but the bundle command doesn't work, just run `gem install bundler` in a terminal.
### Starting the server
1. `cd slate` from the root directory.
1. Initialize and start Slate. You can either do this locally, or with Vagrant:
```js
    npm run slate:install
  # then
    npm run slate:build 
  # finally
    npm run slate:start
  # OR run this to run with vagrant
    vagrant up
```

Please visit the application documentation at http://hellobooks.herokuapp.com/docs/v1 or http://localhost:4567 to test locally

To deploy generated files into your application, run `npm run slate:build`

# Testing
There are three different kind of testing in this application; client, server and end-to-end testing.

> To start the server test. In your CMD, run
```js
  npm run test

  # To get coverage result, run
  npm run test:coverage
```

> To start the end-to-end test
```js
# For the first time you are running it, 
# you'll need to install the selenium server and chrome driver.
# To do that, run
npm run test:e2e-install

# then start the server with
npm run test:e2e-server

# finally, run the test with
npm run test:e2e
```

> Finally, for the client test,
```
# first cd to the test folder
# then run
npm run test

# for coverage report, run
npm run test:coverage
```

# Author

**Temitayo Fadojutimi** is a Software Developer at Andela and he dedicates his expertise to solving practical problems in the society. He tweets at [@adesege_](http://twitter.com/adesege_)

# Contributing Guide

Thank you for your interest in contributing to this package. I currently accept contributions from everyone but I expect that standards are maintained.
To contribute,
1. Fork the project
1. Create a feature branch, branch away from `master`
1. Write tests, using `Mocha and Chai` or any other testing frameworks, and code
1. If you have multiple commits please combine them into a few logically organized commits by [squashing them](git-squash)
1. Push the commit(s) to your fork
1. Submit a merge request (MR) to the `master` branch
1. The MR title should describe the change you want to make
1. The MR description should give a motive for your change and the method you used to achieve it.
  1. Mention the issue(s) your merge request solves, using the `Solves #XXX` or
    `Closes #XXX` syntax to auto-close the issue(s) once the merge request will
    be merged.
1. Be prepared to answer questions and incorporate feedback even if requests for this arrive weeks or months after your MR submission
  1. If a discussion has been addressed, select the "Resolve discussion" button beneath it to mark it resolved.
1. When writing commit messages please follow
   [these guidelines](http://chris.beams.io/posts/git-commit).

# License
This project is licensed under the MIT license. Click **[here](blob/master/LICENSE.md)** to read the license in full