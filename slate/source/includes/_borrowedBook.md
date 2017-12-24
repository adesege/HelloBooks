# Borrowed Books

## Borrow a book

> Request body

```javascript
{
  "bookId": 1
}
```

> Response body (application/json)

```javascript
{
  "message": ["You have successfully  borrowed this book"],
  "id": 1
}
```

This endpoint allows a user to borrow a book

### HTTP Request

`POST /users/:userId/books`

### HTTP Response

`201 Created`

### URL Parameters

Parameter | Description
--------- | -----------
userId | The ID of the user

## Return a borrowed book

> Request body

```javascript
{ }
```

> Response body (application/json)

```javascript
{
  "message": ["You have successfully returned this book"]
}
```

This endpoint returns a borrowed book

### HTTP Request

`PUT /users/:userId/books/:borrowedBookId`

### HTTP Response

`200 OK`

### URL Parameters

Parameter | Description
--------- | -----------
userId | The ID of the user
borrowedBookId | The ID of the borrowed book

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
bookId | undefined | If defined, it will set the bookId of the book that is being returned.

## Get borrowed books

> Request body

```javascript
{ }
```

> Response body (application/json)

```javascript
{
  "books": [
    {
      "id": 1,
      "title": "Half of a yellow sun",
      "description": "A sweet book from Chimamanda Adichie",
      ...
      "createdAt": "2017-12-12T16:27:39.497Z",
      "updatedAt": "2017-12-12T16:27:39.497Z"
    }
  ],
  "message": ["Success"]
}
```

This endpoint gets all the books that have been borrowed but are yet to be returned

### HTTP Request

`GET /users/:userId/books`

### HTTP Response

`200 OK`

### URL Parameters

Parameter | Description
--------- | -----------
userId | The ID of the user

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
bookId | 0 | Sets the id of the book that has been borrowed
returned | false | The return status of the book


## Get borrowed books history

> Request body

```javascript
{ }
```

> Response body (application/json)

```javascript
{
  "books": [
    {
      "id": 1,
      "title": "Half of a yellow sun",
      "description": "A sweet book from Chimamanda Adichie",
      ...
      "createdAt": "2017-12-12T16:27:39.497Z",
      "updatedAt": "2017-12-12T16:27:39.497Z"
    }
    ...
  ],
  "pagination": {
      "pageSize": 1,
      "totalCount": 1,
      "page": 0,
      "pageCount": 0,
      "limit": 12
  }
}
```

This endpoint gets borrowed book histories based on some criteria

### HTTP Request

`GET /books/histories/:userId`

### HTTP Response

`200 OK`

### URL Parameters

Parameter | Description
--------- | -----------
userId | The ID of the user

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
offset | 0 | Sets the offset for pagination
limit | 12 | The number of histories to display per page
isReturned | undefined | Sets the returned status of the borrowed book
updatedAt | undefined | Filter by updatedAt

## Delete a book

> Request body

```javascript
{ }
```

> Response body (application/json)

```javascript
{
  "message": ["Book deleted successfully"]
}
```

This endpoint get all books or by book id.

### HTTP Request

`DELETE /books/[,:bookId]`

### HTTP Response

`200 OK`

### URL Parameters

Parameter | Description
--------- | -----------
bookId | The ID of the book