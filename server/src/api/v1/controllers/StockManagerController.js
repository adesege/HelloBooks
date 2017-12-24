import model from '../models';
import { sendErrors } from '../utils/index';

const {
  Book,
  stockManager
} = model;

/**
 * Stock manager controller
 *
 * @class StockManagerController
*/
class StockManagerController {
  /**
   * Add stock
   *
   * @param {object} req - express http request
   * @param {object} res - express http response
   *
   * @return {object} - new stock
   */
  static addStock(req, res) {
    /* istanbul ignore next */
    const bookId = `${req.body.bookId}` || 0;
    Book.findById(bookId)
      .then((book) => {
        if (book) {
          stockManager.create(req.body, {
            fields: ['quantity', 'recordDate', 'bookId'],
            returning: true,
            plain: true
          }).then(newStock =>
            res
              .status(201)
              .send({
                message: ['Stock added successfully'],
                id: newStock.get('id'),
                stock: {
                  ...newStock.dataValues,
                  book
                }
              }))
            .catch(errors => sendErrors({ res, errors }));
        } else {
          return res.status(404).send({ message: ['Book not found'] });
        }
      })
      .catch(errors => sendErrors({ res, errors }));
  }

  /**
   * Delete stock
   *
   * @param {object} req - express http request
   * @param {object} res - express http response
   *
   * @returns {object} - response object
  */
  static deleteStock(req, res) {
    const id = `${req.params.stockId}`;
    stockManager.findById(id)
      .then((stock) => {
        if (stock) {
          stockManager
            .destroy({ // delete record from stockManager
              where: { id }
            })
            .then(() => {
              Book
                .findById(stock.bookId)
                .then((book) => {
                /* istanbul ignore next */
                  if (book.quantity >= 0) {
                    book.update( // update count in book table
                      { quantity: book.quantity - stock.quantity },
                      { where: { id: stock.bookId } }
                    );
                  }
                  return res.status(200)
                    .send({ message: ['Stock deleted successfully'] });
                });
            })
            .catch(errors => sendErrors({ res, errors }));
        } else {
          return res
            .status(404)
            .send({ message: ['Stock not found'] });
        }
      })
      .catch(errors => sendErrors({ res, errors }));
  }

  /**
   * Get stocks
   *
   * @method getStocks
   *
   * @param {object} req - express http request
   * @param {object} res - express http response
   *
   * @return {object} stock information
   */
  static getStocks(req, res) {
    const { bookId } = req.query;
    stockManager
      .findAll({
        include: ['book'],
        order: [['updatedAt', 'DESC']],
        where: { bookId }
      })
      .then((stocks) => {
        if (stocks.length === 0) {
          return res
            .status(404)
            .send({ message: ['No stock record found'] });
        }
        return res
          .status(200)
          .send({ message: ['Success'], stocks });
      })
      .catch(errors => sendErrors({ res, errors }));
  }
}


export default StockManagerController;
