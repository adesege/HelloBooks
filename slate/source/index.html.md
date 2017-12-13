---
title: API Reference

language_tabs: # must be one of https://git.io/vQNgJ
  - javascript

toc_footers:
  - <a href='/docs/v1'>HelloBooks Documentation v1.0.0</a>
  - <a href='/'>Visit main site</a>

includes:
  - users
  - categories
  - books
  - borrowedBook
  - stocks
  - notifications
  - errors
  - statusCodes

search: false
---

# Introduction

Welcome to the HelloBooks API! You can use our API to access HelloBooks API endpoints, which can get information on various books and users in our database.

You can view code examples in the dark area to the right.

HTTP Request url must be prepended with the base url

`BASE URL = http://hellobooks.herokuapp.com/api/v1`

# Authentication

> To authorize, 

```javascript
  add `authenticate-token` to your request header. 
  Its value must be a valid signed JWT token.
```

HelloBooks uses JWT to authenticate a user. The JWT token must be signed by the application and it has an expiry time of 24hours.

HelloBooks expects that the token is included in every request like:

`authenticate-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

<aside class="notice">
You must replace <code>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...</code> with the signed token.
</aside>

## Login

> Request body

```javascript
{
  "email": "johndoe@email.com",
  "password": "password"
}
```

> Response body (application/json)

```javascript
{
  "message": "Successfully validated",
  "payload": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "userId": 1,
    "group": "user"
  }
}
```

This endpoint logs a user into the application. The token should be included in subsequent request header.

### HTTP Request

`POST /users/signin`

### HTTP Response

`200 OK`