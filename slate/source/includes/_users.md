# Users

## Create a user

> Request body

```javascript
{
  "email": "johndoe@email.com",
  "password": "password",
  "confirmPassword": "password",
  "name": "name"
}
```

> Response body (application/json)

```javascript
{
  "message": "Your account has been created successfully",
  "user": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "userId": 1,
    "group": "user"
  }
}
```

This endpoint creates a user record.

### HTTP Request

`POST /users/signup`

### HTTP Response

`201 Created`

## Send reset password

> Request body

```javascript
{
  "email": "johndoe@email.com"
}
```

> Response body (application/json)

```javascript
{
  "message": "A password reset link has been sent to johndoe@email.com. It may take upto 5 mins for the mail to arrive."
}
```

This endpoint sends a reset password link to the user associated with the provided email address

### HTTP Request

`POST /users/reset-password`

### HTTP Response

`200 OK`

## Change password on reset

> Request body

```javascript
{
  "email": "johndoe@email.com",
  "password": "new password",
  "confirmPassword": "new password",
  "validationKey": "dfghjkhg32ft4678u9dihbrfvbi3r"
}
```

> Response body (application/json)

```javascript
{
  "message": "Password successfully changed. Please login to your account."
}
```

This endpoint changes a user's password after the user has click on the reset password link

### HTTP Request

`POST /users/reset-password/verify`

### HTTP Response

`200 OK`

## Change password in profile

> Request body

```javascript
{
  "oldPassword": "old password",
  "password": "new password",
  "confirmPassword": "new password"
}
```

> Response body (application/json)

```javascript
{
  "message": "User information has been successfully edited"
}
```

This endpoint is for authenticated users to changes their password

### HTTP Request

`PUT /users/:userId`

### HTTP Response

`200 OK`

## Get all users

> Request body

```javascript
{ }
```

> Response body (application/json)

```javascript
{
  "users": [
    {
      "createdAt": "2017-12-11T16:27:39.497Z"
      "email": "johndoe@email.com"
      "id": 1
      "name": "John Doe"
      "updatedAt": "2017-12-11T16:27:39.497Z"
      "userRank": "beginner"
    }
  ]
}
```

This endpoint gets all users or a particular user by id

### HTTP Request

`GET /users/[,:userId]`

### HTTP Response

`200 OK`

### URL Parameters

Parameter | Description
--------- | -----------
userId | The ID of the user

