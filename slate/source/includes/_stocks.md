# Stocks

## Create a stock

> Request body

```javascript
{
  "bookId": 1,
  "quantity": 5
}
```

> Response body (application/json)

```javascript
{
  "message": ["Stock added successfully"],
  "id": 1,
  "data": 
    {
      "bookId": 1,
      "quantity": 8
      "createdAt": "2017-12-12T16:27:39.497Z",
      "updatedAt": "2017-12-12T16:27:39.497Z"
  }
}
```

This endpoint creates a stock.

### HTTP Request

`POST /books/stocks`

### HTTP Response

`201 Created`

## Get stocks

> Request body

```javascript
{ }
```

> Response body (application/json)

```javascript
{
  "data": 
    {
      "bookId": 1,
      "quantity": 8
      "createdAt": "2017-12-12T16:27:39.497Z",
      "updatedAt": "2017-12-12T16:27:39.497Z"
  }
}
```

This endpoint get all stocks or by book id.

### HTTP Request

`GET /books/stocks/[,:bookId]`

### HTTP Response

`200 OK`

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
bookId | undefined | If defined, gets stock by book Id

## Delete a stock

> Request body

```javascript
{ }
```

> Response body (application/json)

```javascript
{
  "message": ["Stock deleted successfully"]
}
```

This endpoint delete stock by stock id

### HTTP Request

`DELETE /stocks/[,:stockId]`

### HTTP Response

`200 OK`

### URL Parameters

Parameter | Description
--------- | -----------
stockId | The ID of the stock