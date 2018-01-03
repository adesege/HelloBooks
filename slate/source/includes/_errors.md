# Handling Errors

All response messages are returned as an array with a `message` key in the response body.

> Sample validation error

```javascript
  Status code = 400 Bad Request
  {
    "message": [
      "The name field is required",
      "The email field is required",
      "The password and confirm password fields is required"
    ]
  }
```

> Sample server error

```javascript
  Status code = 500 Internal Server Error
  {
    "message": [
      "There was an error processing your request. \
      You don't need to do anything else. \
      Our engineers are on it. "
    ]
  }
````