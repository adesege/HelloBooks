[![Build Status](https://travis-ci.org/adesege/HelloBooks.svg?branch=development)](https://travis-ci.org/adesege/HelloBooks)
[![Code Climate](https://codeclimate.com/github/adesege/HelloBooks/badges/gpa.svg)](https://codeclimate.com/github/adesege/HelloBooks)
[![Test Coverage](https://codeclimate.com/github/adesege/HelloBooks/badges/coverage.svg)](https://codeclimate.com/github/adesege/HelloBooks/coverage)
[![Coverage Status](https://coveralls.io/repos/github/adesege/HelloBooks/badge.svg?branch=development)](https://coveralls.io/github/adesege/HelloBooks?branch=development)
[![Issue Count](https://codeclimate.com/github/adesege/HelloBooks/badges/issue_count.svg)](https://codeclimate.com/github/adesege/HelloBooks)

# Hello-Books
A simple application that helps manage a library and its processes like stocking, tracking and renting books.

Built on `Javascript` with `Postgres` as database.

## How to install
### Pre-requisites
You will need to have the following installed in your working environment before this application can work.
* Latest version of Nodejs - comes with a Node Package Manager
* Postgresql
### Installing
1. Download or clone this branch at https://github.com/adesege/HelloBooks.git
2. Install dependencies by running `npm install`. Ensure you are in your working directory. Run `cd /path/to/HelloBooks` to change.
3. Start the server by running `npm run watch`.
1. To start the client, `cd client`
1. Then `npm run start`

The server and client listens on port `5000` and `3000` by default respectively unless otherwise stated as an environment variable.

Visit `http://localhost:3000` to access the front end and `http://localhost:5000/api` to access the `api` endpoint.

## Authentication Mechanism
This application uses JSON web token to sign and verify users. The default expiration time is `24 hours` but this can be modified in the application config.

## Middlewares
Some endpoints are restricted to logged users and admins only. E.g. Only admin can access `api/:versionNumber/books/stocks`.

There are two middlewares defined in this application.
* middleware - verifies a user's token and checks if the user is valid.
* adminAuthenticate middleware - checks if the user is `admin`.

## Documentation
Please visit the application documentation at https://app.swaggerhub.com/apis/adesege/Hello-Books/1.0.0

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