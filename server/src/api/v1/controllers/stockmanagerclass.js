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
    const bookId = req.body.bookId || '';
    Book.findById(bookId)
      .then((book) => {
        if (book) {
          stockManager.create(req.body, {
            fields: ['quantity', 'recordDate', 'bookId'],
            returning: true,
            plain: true
          }
          ).then(newStock =>
            res
              .status(201)
              .send({
                message: 'Stock added successfully',
                id: newStock.get('id'),
                data: newStock.dataValues
              }))
            .catch(error => res.status(400).send({ message: error.message }));
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
                  })
                  .then();
              }
            });
            return res.status(200)
              .send({ message: 'Stock deleted successfully' });
          });
        } else {
          return res.status(400).send({ message: 'Stock not found' });
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
  static get(req, res) {
    const { bookId } = req.query;
    stockManager.findAll(
      bookId && {
        where: { bookId }
      }
    )
      .then(stocks => res.status(200).send({ message: '', data: stocks }));
  }
}


export default StockManagerClass;
