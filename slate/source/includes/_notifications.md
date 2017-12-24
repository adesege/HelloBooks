# Notifications

## Get notifications

> Request body

```javascript
{ }
```

> Response body (application/json)

```javascript
{
  "notifications": [
    {
      "id": 1,
      "bookId": 1,
      "userId": 1,
      "notificationType": "BOOK_RETURNED",
      "createdAt": "2017-12-12T16:27:39.497Z",
      "updatedAt": "2017-12-12T16:27:39.497Z",
      "Book": {
        ...
      },
      "User": {
        ...
      },
    }
  ]
}
```

This endpoint get all notifications and can filter the result

### HTTP Request

`GET /notifications`

### HTTP Response

`200 OK`

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
offset | 0 | Sets the offset for pagination
limit | 12 | The number of books to display per page
notificationType | undefined | Filter by the type of notification; `BOOK_RETURNED` or `BOOK_BORROWED`
name | undefined | Filter by user's name
