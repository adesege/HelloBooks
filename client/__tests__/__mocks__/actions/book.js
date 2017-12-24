export const bookData = {
  title: 'A new title',
  coverPhotoPath: '',
  documentPath: ''
};

export const response = {
  message: ['Book added successfully'],
  book: {
    title: 'A new book title',
    id: 1
  },
  id: 1
};

export const searchResponse = {
  books: {
    ...response.book
  }
};

export const getBookResponse = {
  books: { ...response.book },
  pagination: {
    pageSize: 1,
    totalCount: 10,
    page: 0,
    pageCount: 1,
    limit: 10
  },
  message: ['There was an unexpected error']
};

export const responseFailure = {
  message: ['The title field is required']
};

export const signinResponseFailure = {
  message: ['Sorry, we can\'t find this account']
};

