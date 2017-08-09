import model from '../models';

const Book = model.Book;
const stockManager = model.stockManager;

/**
 * @class bookClass
 * @classdesc Book Class
 */
class stockManagerClass {
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
          stockManager.create(
            {
              quantity,
              recordDate,
              bookId
            },
            {
              fields: ['quantity', 'recordDate', 'bookId']
            })
            .then((id) => {
              res.status(201).send({
                message: 'Stock added successfully',
                id: id.get('id'),
                status: 'Created',
                code: 201
              });
            })
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
        } else {
          return res.status(404).send({
            message: 'Book not found',
            status: 'Not Found',
            code: 404
          });
        }
      });
  }
  /**
     * 
     * @param {object} req 
     * @param {object} res
     * @returns {void} 
     */
  static delete(req, res) {
    const id = req.query.id || '';

    stockManager.findById(id)
      .then((stock) => {
        if (stock !== null) {
          stockManager.destroy({
            where: { id }
          }).then(() => {
            Book.findById(stock.bookId).then((book) => {
              if (book.quantity >= 0) {
                book.update(
                  { quantity: book.quantity - stock.quantity },
                  { where: { id: stock.bookId, }
                  }).then().catch(error => res.status(400).send({
                  message: error.message,
                  status: 'Bad Request',
                  code: 400
                })
                );
              }
            });
            return res.status(200)
              .send({ message: 'Stock deleted successfully', status: 'OK', code: 200 });
          })
            .catch(error => res.status(400)
              .send({
                message: error.message,
                status: 'Bad Request',
                code: 400
              }));
        } else {
          return res.status(400).send({ message: 'Stock not found', status: 'Not Found', code: 404 });
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
    stockManager.findAll()
      .then((stocks) => {
        if (stocks) {
          res.status(200).send({ message: stocks, status: 'OK', code: 200 });
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
}


export default stockManagerClass;
