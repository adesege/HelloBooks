#HELLO-BOOKS [![Build Status](https://travis-ci.org/adesege/HelloBooks.svg?branch=development)](https://travis-ci.org/adesege/HelloBooks)

A simple application that helps manage a library and its processes like stocking, tracking and renting books.

Built on `Javascript` with `Postgres` as database.

#HOW TO INSTALL
##PRE-REQUISITES
    You will need to have the following installed in your working environment before this application can work.
    * Latest version of Nodejs - comes with a Node Package Manager
    * Postgresql
##INSTALLING
1. Download or clone this branch at https://github.com/adesege/HelloBooks.git
2. Install dependencies by running `npm install`. Ensure you are in your working directory. Run `cd /path/to/HelloBooks` to change.
3. Start the server by running `npm run watch`.

The application listens on port `8080` by default unless otherwise started in the environment port.

Visit `http://localhost:8000` to access the front end or `http://localhost:8000/api` to access the `api` endpoint.

#ENDPOINTS
The endpoints are listed below.
Where `:versionNumber` is the API version number.
    `/api/:versionNumber`
        1. `/users`
            **POST** /signup - Creates a user
            **POST** /signin - Logs a user in and generates a `JSON Web Token`
            **POST** /:userId/books - Allow users borrow a book.
            **PUT** /:userId/books - Allow users modfy a book.
            **GET** /:userId/books?returned=false - Allow users get all the books they have borrowed but are yet to return
        2. `/books`
            **POST** / - Allow users add a book
            **PUT** /:bookId - Allow users modify a book information
            **GET** / - Allow users get all the books they have borrowed but are yet to return
        2. `/books/stocks`
            **POST** / - Allow admin add a stock
            **DELETE** - Allow admin delete a book
            **GET** / - Allow admin get stock

#JSON WEB TOKEN
This application uses JSON web token to sign and verify user token. The default expiration time is `24 hours` but this can be modified in the application config.

#MIDDLEWARES
Some endpoints are restricted to logged users and admins only. E.g. Only admin can access `api/:versionNumber/books/stocks`.

There are three middlewares defined in this application.
* Authenticate middleware - verifies a user's token and checks if the user is valid.
* userAuthenticate middleware - verifies if the user is `user`
* adminAuthenticate middleware - checks if the user is `admin`.

#RESPONSE STATUSES
These  are the common status codes used in the app.

1. `400 Bad Request` - Used when there is a validation error.
2. `500 Internal Server Error` - A generic error message, given when no more specific message is suitable.
3. `404 Not Found` - Used when the application returns an empty result.
4. `200 OK` - All is well and set.
5. `401 Unauthorized` - Used when authentication failed.
6. `403 Forbidden` - Used when a user is accessing a restricted end point.
7. `201 Created` - Used when a new record is inserted into the database.

#CONTRIBUTING
All contributions are welcome. Just create a pull request and mention me and I will have a look at it.