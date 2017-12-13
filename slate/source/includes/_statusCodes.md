# Status Code References

The HelloBooks API uses the following status codes:

Error Code | Meaning
---------- | -------
400 | Bad Request -- Validation errors.
401 | Unauthorized -- Your API key is wrong.
403 | Forbidden -- Either the resource requested is meant for authenticated user or administrator only.
404 | Not Found -- The specified resource could not be found.
409 | Conflict -- The resource you are updating, creating or requesting already exist.
500 | Internal Server Error -- We had a problem with our server. Try again later.
