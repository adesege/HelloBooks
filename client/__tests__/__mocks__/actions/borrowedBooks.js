const book = {
  userId: 1,
  bookId: 1
};

export default {
  book,
  response: {
    message: 'You have successfully borrowed this book',
    id: 1,
    ...book
  },
  error: {
    message: ['There are no more copies left of this book to borrow']
  },
  getRequestData: {
    userId: 1
  },
  getResponseData: {
    books: {
      ...book,
      createdAt: '2017-01-01'
    }
  },
  returnRequestData: {
    userId: 1,
    bookId: 1,
    borrowedBookId: 1
  },
  returnResponseData: {
    message: 'You have successfully returned this book'
  }
};
