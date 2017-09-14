import model from '../models';

const Book = model.Book;
const borrowedBook = model.borrowedBook;
const stockManager = model.stockManager;

/**
 * @class BookClass
 * @classdesc Book Class
 */
class BookClass {
  /**
   * @method create
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
    const bookCategoryId = req.body.book_category || 0;
    const coverPhotoPath = req.body.coverPhotoPath || '';
    const documentPath = req.body.document_path || '';
    const userId = req.decoded.user;
    if (req.body.stock_quantity || req.body.stock_record_date) {
      req.body.stock = {
        quantity: req.body.stock_quantity,
        record_date: req.body.stock_record_date
      };
    }
    const stock = req.body.stock || {};
    stock.record_date = stock.recordDate || stock.record_date || '';
    delete req.body.stock;

    if (stock.length === 0) {
      return res.status(400)
        .send({ message: 'You must set a stock information for this book' });
    }

    if (stock.quantity === undefined) {
      return res.status(400)
        .send({ message: 'The stock quantity is required' });
    }

    if (stock.record_date === undefined) {
      return res.status(400)
        .send({ message: 'The stock record date is required' });
    }

    Book.findOne({ where: { title } })
      .then((book) => {
        if (book !== null) {
          return res.status(400)
            .send({ message: 'A book with the same title already exist' });
        }
        Book.create({
          title,
          description,
          author,
          publishedDate,
          bookURL,
          ISBN,
          bookCategoryId,
          coverPhotoPath,
          documentPath,
          userId
        }, {
          fields: [
            'title',
            'description',
            'author',
            'userId',
            'publishedDate',
            'bookURL',
            'ISBN',
            'bookCategoryId',
            'coverPhotoPath',
            'documentPath'
          ]
        }).then((id) => {
          const bookId = id.get('id');
          stock.bookId = bookId;
          stockManager.create(stock).then(() => res.status(201).send({
            message: 'Book added successfully',
            id: bookId
          })).catch(error =>
            res.status(400)
              .send({ message: error.errors })); // Stock manager create
        }).catch(error =>
          res.status(400)
            .send({ message: error.errors })); // Book create
      }).catch(error =>
        res.status(400)
          .send({ message: error.errors })); // Find by title
  }
  /**
     * @method edit
     * @param {object} req
     * @param {object} res
     * @returns {void}
     */
  static edit(req, res) {
    req.body.publishedDate = req.body.published_date || '';
    req.body.bookURL = req.body.book_url || '';
    req.body.ISBN = req.body.isbn || '';
    req.body.bookCategoryId = req.body.book_category_id || 0;
    req.body.documentPath = req.body.document_path || '';
    const id = req.params.bookId;
    const fields = req.query.fields && (req.query.fields !== '') ? [req.query.fields] : ['title',
      'description',
      'author',
      'userId',
      'publishedDate',
      'bookURL',
      'ISBN',
      'bookCategoryId',
      'coverPhotoPath',
      'documentPath'];

    Book.findOne({ where: { id } })
      .then((book) => {
        if (book) {
          Book.update(req.body, {
            where: { id },
            fields,
            returning: true,
            plain: true
          }).then((updatedBook) => {
            res.status(200)
              .send({ message: 'Book successfully updated', book: updatedBook[1] });
          }).catch(error => res.status(400)
            .send({ message: error.message }));
        } else {
          res.status(400).send({ message: 'Book not found' });
        }
      }).catch(error => res.status(500).send({ message: error.message }));
  }
  /**
   *
   * @method get
   * @param {object} req
   * @param {object} res
   * @return {object} response
   */
  static get(req, res) { // get all the books in the database
    const id = req.params.id;
    Book.findAll({
      where: req.params.id ? { id } : null,
      include: ['stock'] })
      .then((books) => {
        res.status(200).send({ message: books });
      }).catch(error => res.status(500).send({ message: error.message }));
  }
  /**
   * @method borrowBook
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
        if (!book) { // check if no book can be found
          return res.status(404).send({ message: 'Sorry, we can\'t find this book' });
        }

        if (book.quantity <= 0) { // check if book quantity is less than or equal to zero
          return res.status(404).send({ message: 'There are no more copies left of this book to borrow' });
        }

        borrowedBook.findOne({ where: { bookId, userId, isReturned } })
          .then((borrowed) => {
            if (borrowed) {
              return res.status(403).send({
                message: 'You have already borrowed this book. Please return it before you can borrow it again.' });
            }
            borrowedBook.create({
              bookId,
              userId,
              isReturned,
              returnedDate
            }, {
              fields: ['bookId', 'userId', 'returnedDate', 'isReturned']
            }).then(id => res.status(201).send({
              message: 'You have successfully  borrowed this book',
              id: id.get('id')
            })).catch(error => res.status(400).send({
              message: error.message
            })).catch(error => res.status(500).send({
              message: error.message
            }));
          }).catch(error => res.status(400).send({
            message: error.message
          }));
      }).catch(() => {});
  }
  /**
    * @method getBorrowedBook
    * @param {object} req
    * @param {object} res
    * @return {object} response
  */
  static getBorrowedBook(req, res) {
    const userId = req.params.userId;
    const isReturned = req.query.returned;

    borrowedBook.findAll({
      include: [Book],
      where: { userId, isReturned }
    }).then((books) => {
      if (books) {
        res.status(200).send({
          message: books
        });
      } else {
        res.status(404).send({ message: 'No record available' });
      }
    }).catch(error => res.status(400).send({
      message: error.message
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
    const id = req.params.borrowedBookId;
    const isReturned = true;
    const bookId = req.query.bookId;

    if (userId === undefined) {
      return res.status(400).send({
        message: 'Invalid user'
      });
    }

    if (bookId === undefined) {
      return res.status(400).send({
        message: 'Please select a book to return'
      });
    }

    borrowedBook.findOne({
      where: { id, userId, bookId, isReturned: false }
    }).then((books) => {
      if (books) {
        borrowedBook.update({
          isReturned,
          bookId
        }, {
          where: { id, userId, bookId, isReturned: false }, individualHooks: true
        }).then(() => {
          res.status(200).send({ message: 'You have successfully returned this book' });
        }).catch(error => res.status(400).send({ message: error.message }));
      } else {
        return res.status(404).json({ message: 'No record available' });
      }
    }).catch(error => res.status(400).send({ message: error.message }));
  }

  /**
*
* @param {object} req
* @param {object} res
* @returns {void}
*/
  static delete(req, res) { // delete a book
    const id = req.params.id || '';
    Book.findById(id)
      .then((book) => {
        if (book !== null) {
          Book.destroy({ // delete record
            where: { id }
          }).then(() =>
            res.status(200).send({ message: 'Book deleted successfully' }))
            .catch(error =>
              res.status(400).send({ message: error.message }));
        } else {
          return res.status(404).send({ message: 'Book not found' });
        }
      }).catch(error => res.status(500).send({ message: error.message }));
  }
}


export default BookClass;
