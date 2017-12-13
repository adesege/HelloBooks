# Books

## Create a book

> Request body

```javascript
{
  "title": "Half of a yellow sun",
  "description": "A sweet book from Chimamanda Adichie",
  "bookCategoryId": 1,
  "ISBN": "1234567890",
  "stockQuantity": 3,
  "publishedYear": 2015,
  "author": "Chimanmanda Adichie",
  "bookURL": "",
  "coverPhotoPath": "",
  "documentPath": "",
  "userId": 1
}
```

> Response body (application/json)

```javascript
{
  "message": ["Book added successfully"],
  "id": 1,
  "book": 
    {
      "title": "Half of a yellow sun",
      "description": "A sweet book from Chimamanda Adichie",
      "bookCategoryId": 1,
      "ISBN": "1234567890",
      "stockQuantity": 3,
      "publishedYear": 2015,
      "author": "Chimanmanda Adichie",
      "bookURL": "",
      "coverPhotoPath": "",
      "documentPath": "",
      "userId": 1,
      "createdAt": "2017-12-12T16:27:39.497Z",
      "updatedAt": "2017-12-12T16:27:39.497Z"
  }
}
```

This endpoint creates a book.

### HTTP Request

`POST /books`

### HTTP Response

`201 Created`

## Update a book

> Request body

```javascript
{
  "title": "Half of a yellow sun",
  "description": "A sweet book from Chimamanda Adichie",
  "bookCategoryId": 1,
  "ISBN": "1234567890",
  "publishedYear": 2015,
  "author": "Chimanmanda Adichie",
  "bookURL": "",
  "coverPhotoPath": "http://res.cloudinary.com/johndoe/image/upload/v1512654679/qclzzr...mwf8ktc.png",
  "documentPath": "",
  "userId": 1
}
```

> Response body (application/json)

```javascript
{
  "message": ["Book successfully updated"],
  "book": 
    {
      "id": 1,
      "title": "Half of a yellow sun",
      "description": "A sweet book from Chimamanda Adichie",
      "bookCategoryId": 1,
      "ISBN": "1234567890",
      "stockQuantity": 3,
      "publishedYear": 2015,
      "author": "Chimanmanda Adichie",
      "bookURL": "",
      "coverPhotoPath": "http://res.cloudinary.com/johndoe/image/upload/v1512654679/qclzzr...mwf8ktc.png",
      "documentPath": "",
      "userId": 1,
      "createdAt": "2017-12-12T16:27:39.497Z",
      "updatedAt": "2017-12-12T16:27:39.497Z"
  }
}
```

This endpoint updates a book.

### HTTP Request

`PUT /books/:bookId`

### HTTP Response

`200 OK`

### URL Parameters

Parameter | Description
--------- | -----------
bookId | The ID of the book

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
fields | undefined | If defined, it will set the columns to update to the ones specified in the query parameter. It's an array of fields

## Get books

> Request body

```javascript
{ }
```

> Response body (application/json)

```javascript
{
  "data": 
    {
      "id": 1,
      "title": "Half of a yellow sun",
      "description": "A sweet book from Chimamanda Adichie",
      ...
      "createdAt": "2017-12-12T16:27:39.497Z",
      "updatedAt": "2017-12-12T16:27:39.497Z"
  },
  "pagination": {
      "pageSize": 1,
      "totalCount": 1,
      "page": 0,
      "pageCount": 0,
      "limit": 12
  }
}
```

This endpoint get all books or by book id.

### HTTP Request

`GET /books/[,:bookId]`

### HTTP Response

`200 OK`

### URL Parameters

Parameter | Description
--------- | -----------
bookId | The ID of the book

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
offset | 0 | Sets the offset for pagination
limit | 12 | The number of books to display per page
author | undefined | Filter by author name
title | undefined | Filter by book title
bookCategoryId | undefined | Filter by book category


## Search for books

> Request body

```javascript
{ }
```

> Response body (application/json)

```javascript
{
  "message": ["Book found"],
  "data": 
    {
      "id": 1,
      "title": "Half of a yellow sun",
      "description": "A sweet book from Chimamanda Adichie",
      ...
      "createdAt": "2017-12-12T16:27:39.497Z",
      "updatedAt": "2017-12-12T16:27:39.497Z"
  }
}
```

This endpoint search books

### HTTP Request

`GET /search`

### HTTP Response

`200 OK`

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
type | undefined | Sets the type of searching that is being done. `Possible parameters is 'books'`
q | undefined | The search query string

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

`DELETE /books/{,:bookId}`

### HTTP Response

`200 OK`

### URL Parameters

Parameter | Description
--------- | -----------
bookId | The ID of the book