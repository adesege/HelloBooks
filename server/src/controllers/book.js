import model from '../models';

const Book = model.Book;
const borrowedBook = model.borrowedBook;

/**
 * @class bookClass
 * @classdesc Book Class
 */
class bookClass {
  /**
   * 
   * @param {object} req 
   * @param {object} res
   * @return {void} 
   */
  static create(req, res) {
    const title = req.body.title || '';
    const description = req.body.description || '';
    const author = req.body.author || '';
    const publishedDate = req.body.published_date || '';
    const bookURL = req.body.book_url || '';
    const ISBN = req.body.isbn || '';
    const bookCategoryId = req.body.book_category || '';
    const coverPhotoId = req.body.cover_photo || '';
    const documentPath = req.body.document_path || '';
    const userId = req.decoded.user;

    Book.create(
      {
        title,
        description,
        author,
        publishedDate,
        bookURL,
        ISBN,
        bookCategoryId,
        coverPhotoId,
        documentPath,
        userId
      },
      {
        fields: ['title', 'description', 'author', 'userId']
      })
      .then(() => res.status(201).send({
        message: 'Book added successfully',
        status: 'Created',
        code: 201
      }))
      .catch(error => res.status(400).send({
        message: error.message,
        status: 'Bad Request',
        code: 400
      }))
      .catch(error => res.status(500).send({
        message: error.message,
        status: 'Internal Server Error',
        code: 500
      }));
  }
  /**
     * 
     * @param {object} req 
     * @param {object} res
     * @returns {void} 
     */
  static edit(req, res) {
    const title = req.body.title || '';
    const description = req.body.description || '';
    const author = req.body.author || '';
    const publishedDate = req.body.published_date || '';
    const bookURL = req.body.book_url || '';
    const ISBN = req.body.isbn || '';
    const bookCategoryId = req.body.book_category || 0;
    const coverPhotoId = req.body.cover_photo || 0;
    const documentPath = req.body.document_path || '';
    const id = req.query.book_id;

    Book.findOne({ where: { id } })
      .then((book) => {
        if (book) {
          Book.update(
            {
              title,
              description,
              author,
              publishedDate,
              bookURL,
              ISBN,
              bookCategoryId,
              coverPhotoId,
              documentPath
            },
            {
              where: { id }
            }).then(() => {
            res.status(200)
              .send({ message: 'Book successfully updated', status: 'OK', code: 200 });
          }).catch(error => res.status(400)
            .send({
              message: error.message,
              status: 'Bad Request',
              code: 400
            }));
        } else {
          res.status(400).send({ message: 'Book not found', status: 'Not Found', code: 404 });
        }
      })
      .catch(error => res.status(500).send({
        message: error.message,
        status: 'Internal Server Error',
        code: 500
      }));
  }
  /**
   * 
   * @method get
   * @param {object} req 
   * @param {object} res 
   * @return {object} response
   */
  static get(req, res) {
    Book.findAll()
      .then((books) => {
        if (books) {
          res.status(200).send({ message: books, status: 'OK', code: 200 });
        } else {
          res.status(404).send({ message: 'No record available', status: 'No Content', code: 404 });
        }
      })
      .catch(error => res.status(500).send({
        message: error.message,
        status: 'Internal Server Error',
        code: 500
      }));
  }
  /**
   * 
   * @param {object} req 
   * @param {object} res
   * @return {object} response 
   */
  static borrowBook(req, res) {
    const bookId = req.query.book_id;
    const userId = req.params.userId;
    let returnedDate = req.body.return_date || '';
    const isReturned = false;
    returnedDate = new Date(returnedDate);

    Book.findById(bookId)
      .then((book) => {
        if (!book) {
          res.status(404).send({
            message: 'Sorry, we can\'t find this book',
            status: 'Not Found',
            code: 404
          });
          return;
        }

        if (book.quantity <= 0) {
          res.status(404).send({
            message: 'There are no more copies left of this book to borrow',
            status: 'Not Found',
            code: 404
          });
          return;
        }

        borrowedBook.findOne({ where: { bookId, userId, isReturned } })
          .then((borrowed) => {
            if (borrowed) {
              res.status(403).send({
                message: 'You have already borrowed this book. Please return it before you can borrow it again.',
                status: 'Forbidden',
                code: 403 });
              return;
            }
            borrowedBook.create(
              {
                bookId,
                userId,
                isReturned,
                returnedDate
              },
              {
                fields: ['bookId', 'userId', 'returnedDate', 'isReturned']
              })
              .then(() => res.status(201).send({
                message: 'You have successfully  borrowed this book',
                status: 'Created',
                code: 201
              }))
              .catch(error => res.status(400).send({
                message: error.message,
                status: 'Bad Request',
                code: 400
              }))
              .catch(error => res.status(500).send({
                message: error.message,
                status: 'Internal Server Error',
                code: 500
              }));
          })
          .catch(error => res.status(400).send({
            message: error.message,
            status: 'Bad Request',
            code: 400
          }));
      }).catch(() => {});
  }
  /**
    * 
    * @param {object} req 
    * @param {object} res 
    * @return {object} response
  */
  static getBorrowBook(req, res) {
    const userId = req.params.userId;
    const isReturned = req.query.returned;

    borrowedBook.findAll({
      include: [Book],
      where: { userId, isReturned }
    }).then((books) => {
      if (books) {
        res.status(200).send({
          message: books,
          status: 'OK',
          code: 200 });
      } else {
        res.status(404).send({ message: 'No record available', status: 'No Content', code: 404 });
      }
    }).catch(error => res.status(400).send({
      message: error.message,
      status: 'Bad Request',
      code: 400
    }));
  }
  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @return {object} response
   */
  static returnBorrowedBook(req, res) {
    const userId = req.params.userId;
    const bookId = req.body.book_id;
    const isReturned = true;
    const id = req.query.id;

    if (userId === undefined) {
      res.status(400).send({
        message: 'Invalid user',
        status: 'Bad Request',
        code: 400 });
      return;
    }

    if (bookId === undefined) {
      res.status(400).send({
        message: 'Please select a book to return',
        status: 'Bad Request',
        code: 400 });
      return;
    }

    borrowedBook.findOne({
      where: { id, userId, bookId, isReturned: false }
    }).then((books) => {
      if (books) {
        borrowedBook.update({
          isReturned,
          bookId
        },
        {
          where: { id, userId, bookId, isReturned: false }, individualHooks: true
        }).then(() => {
          res.status(200).send({
            message: 'You have successfully returned this book',
            status: 'OK',
            code: 200 });
        }).catch(error => res.status(400).send({
          message: error.message,
          status: 'Bad Request',
          code: 400
        }));
      } else {
        return res.status(404).json({ message: 'No record available', status: 'Not Found', code: 404 });
      }
    }).catch(error => res.status(400).send({
      message: error.message,
      status: 'Bad Request',
      code: 400
    }));
  }
}


export default bookClass;
