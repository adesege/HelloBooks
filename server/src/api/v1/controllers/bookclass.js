import model from '../models';

const { Book, borrowedBook, stockManager } = model;

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
    const title = `${req.body.title}`;
    req.body.userId = req.decoded.user;
    const stock = {
      quantity: req.body.stockQuantity
    };
    delete req.body.stock;

    if (!stock.quantity) {
      return res.status(400)
        .send({ message: 'The stock quantity is required' });
    }

    Book.findOne({ where: { title } })
      .then((book) => {
        if (book !== null) {
          return res.status(400)
            .send({ message: 'A book with the same title already exist' });
        }
        Book.create(req.body, {
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
          return stockManager.create(stock)
            .then(() => res.status(201).send({
              message: 'Book added successfully',
              id: bookId
            }))
            .catch(error =>
              res.status(400)
                .send({ message: error.errors })); // Stock manager create
        })
          .catch(error =>
            res.status(400)
              .send({ message: error.errors })); // Book create
      });
  }
  /**
     * @method edit
     * @param {object} req
     * @param {object} res
     * @returns {void}
     */
  static edit(req, res) {
    const id = req.params.bookId;
    const fields = req.query.fields &&
     (req.query.fields !== '') ?
      [...req.query.fields] :
      ['title',
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
          }).then(updatedBook =>
            res.status(200)
              .send({
                message: 'Book successfully updated',
                book: updatedBook[1]
              }))
            .catch(error =>
              res
                .status(400)
                .send({ message: error.message }));
        } else {
          res.status(400).send({ message: 'Book not found' });
        }
      });
  }
  /**
   *
   * @method get
   * @param {object} req
   * @param {object} res
   * @return {object} response
   */
  static get(req, res) { // get all the books in the database
    const { id } = req.params;
    Book.findAll({
      where: req.params.id ? { id } : null,
      order: [['updatedAt', 'DESC']]
    })
      .then(books => res.status(200).send({ data: books }));
  }
  /**
   * @method borrowBook
   * @param {object} req
   * @param {object} res
   * @return {object} response
   */
  static borrowBook(req, res) {
    const { bookId } = req.body;
    const { userId } = req.params;
    const isReturned = false;

    Book.findById(bookId)
      .then((book) => {
        if (!book) { // check if no book can be found
          return res.status(404).send({
            message: 'Sorry, we can\'t find this book'
          });
        }
        if (book.quantity === 0) { // check if book quantity is less than or equal to zero
          return res.status(400).send({
            message: 'There are no more copies left of this book to borrow'
          });
        }

        borrowedBook.findOne({ where: { bookId, userId, isReturned } })
          .then((borrowed) => {
            if (borrowed) {
              return res
                .status(400)
                .send({
                  message:
                  'You have already borrowed this book. Please return it before you can borrow it again.'
                });
            }
            borrowedBook.create({
              bookId,
              userId,
              isReturned,
            }, {
              individualHooks: true
            }).then(id => res.status(201).send({
              message: 'You have successfully  borrowed this book',
              id: id.get('id')
            }));
          });
      }).catch(error => res.status(400).send({
        message: error.message
      }));
  }
  /**
    * @method getBorrowedBook
    * @param {object} req
    * @param {object} res
    * @return {object} response
  */
  static getBorrowedBook(req, res) {
    const { userId } = req.params;
    const { bookId } = req.query;
    const isReturned = req.query.returned || false;
    const where = bookId
      ? { userId, isReturned, bookId } : { userId, isReturned };

    borrowedBook.findAll({
      include: [Book],
      where
    }).then((books) => {
      res.status(200).send({
        data: books
      });
    });
  }
  /**
   *
   * @param {object} req
   * @param {object} res
   * @return {object} response
   */
  static returnBorrowedBook(req, res) {
    const { userId } = req.params;
    const id = req.params.borrowedBookId;
    const isReturned = true;
    const { bookId } = req.query;

    borrowedBook.findOne({
      where: {
        id, userId, bookId, isReturned: false
      }
    }).then((books) => {
      if (books) {
        borrowedBook.update({
          isReturned,
          bookId,
          userId
        }, {
          where: {
            id, userId, bookId, isReturned: false
          },
          individualHooks: true
        }).then(() => {
          res
            .status(200)
            .send({
              message: 'You have successfully returned this book'
            });
        });
      } else {
        return res.status(404).json({ message: 'No record available' });
      }
    });
  }

  /**
*
* @param {object} req
* @param {object} res
* @returns {void}
*/
  static delete(req, res) { // delete a book
    const id = parseInt(req.params.id, 10);
    Book.findById(id)
      .then((book) => {
        if (book !== null) {
          Book.destroy({ // delete record
            where: { id }
          }).then(() =>
            res.status(200).send({ message: 'Book deleted successfully' }));
          // .catch(error =>
          //   res.status(400).send({ message: error.message }));
        } else {
          return res.status(404).send({ message: 'Book not found' });
        }
      });
  }

  /**
    * @method getHistories
    * @param {object} req
    * @param {object} res
    * @return {object} response
  */
  static getHistories(req, res) {
    const { userId } = req.params;

    borrowedBook.findAll({
      include: [Book],
      order: [['updatedAt', 'DESC']],
      where: { userId }
    }).then((books) => {
      res.status(200).send({
        data: books
      });
    });
  }
}


export default BookClass;
