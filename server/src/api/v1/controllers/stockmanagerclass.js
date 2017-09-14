import model from '../models';

const Book = model.Book;
const stockManager = model.stockManager;

/**
 * @class StockManagerClass
 * @classdesc Stock Manager Class
 */
class StockManagerClass {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @return {void}
   */
  static create(req, res) {
    const quantity = req.body.quantity || '';
    const recordDate = req.body.record_date || '';
    const bookId = req.query.book_id || req.body.book_id || '';

    Book.findById(bookId)
      .then((book) => {
        if (book) {
          stockManager.create({
            quantity,
            recordDate,
            bookId
          }, {
            fields: ['quantity', 'recordDate', 'bookId']
          }).then(id => res.status(201).send({ message: 'Stock added successfully', id: id.get('id')
          })).catch(error => res.status(400).send({ message: error.message }))
            .catch(error => res.status(500).send({ message: error.message }));
        } else {
          return res.status(404).send({ message: 'Book not found' });
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
    const id = req.params.stockId || '';
    stockManager.findById(id)
      .then((stock) => {
        if (stock !== null) {
          stockManager.destroy({ // delete record from stockManager
            where: { id }
          }).then(() => {
            Book.findById(stock.bookId).then((book) => {
              if (book.quantity >= 0) {
                book.update( // update count in book table
                  { quantity: book.quantity - stock.quantity },
                  { where: { id: stock.bookId, }
                  }).then().catch(error => res.status(400).send({ message: error.message })
                );
              }
            });
            return res.status(200)
              .send({ message: 'Stock deleted successfully' });
          }).catch(error => res.status(400)
            .send({ message: error.message }));
        } else {
          return res.status(400).send({ message: 'Stock not found' });
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
  static get(req, res) {
    stockManager.findAll()
      .then((stocks) => {
        if (stocks) {
          return res.status(200).send({ message: stocks });
        }
        return res.status(404).send({ message: 'No record available' });
      }).catch(error => res.status(500).send({ message: error.message }));
  }
}


export default StockManagerClass;
