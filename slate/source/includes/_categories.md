# Categories

## Create a category

> Request body

```javascript
{
  "name": "African Fiction"
}
```

> Response body (application/json)

```javascript
{
  "message": ["Category added successfully"],
  "id": 1,
  "category": 
    {
      "id": 1,
      "name": "African Fiction",
      "createdAt": "2017-12-12T16:27:39.497Z",
      "updatedAt": "2017-12-12T16:27:39.497Z"
  }
}
```

This endpoint creates a category.

### HTTP Request

`POST /books/categories`

### HTTP Response

`201 Created`

## Edit a category

> Request body

```javascript
{
  "name": "African Fiction & tales"
}
```

> Response body (application/json)

```javascript
{
  "message": ["Category updated successfully"],
  "category": 
    {
      "id": 1,
      "name": "African Fiction & tales",
      "createdAt": "2017-12-12T16:27:39.497Z",
      "updatedAt": "2017-12-12T16:27:39.497Z"
  }
}
```

This endpoint updates a category.

### HTTP Request

`PUT /books/:categoryId`

### HTTP Response

`200 OK`

### URL Parameters

Parameter | Description
--------- | -----------
categoryId | The ID of the book

## Get categories

> Request body

```javascript
{ }
```

> Response body (application/json)

```javascript
{
  "categories": [
    {
      "id": 1,
      "name": "African Fiction and tales",
      "createdAt": "2017-12-12T16:27:39.497Z",
      "updatedAt": "2017-12-12T16:27:39.497Z"
    }
  ]
}
```

This endpoint get all categiories or by category id.

### HTTP Request

`GET /books/categiories/[,:categoryId]`

### HTTP Response

`200 OK`

### URL Parameters

Parameter | Description
--------- | -----------
categoryId | The ID of the category

## Delete a category

> Request body

```javascript
{ }
```

> Response body (application/json)

```javascript
{
  "message": ["Category deleted successfully"]
}
```

This endpoint deletes a category by id
### HTTP Request

`DELETE /books/categories/:categoryId`

### HTTP Response

`200 OK`

### URL Parameters

Parameter | Description
--------- | -----------
categoryId | The ID of the category