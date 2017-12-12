import model from '../models';
import { sendErrors } from '../utils';

const { Book } = model;

/**
 * @class SearchController
 * @classdesc Search Class
 */
class SearchController {
  /**
     * @method get
     * @param {object} req - express http request
     * @param {object} res - express http response
     * @return {object} - search data
   */
  static get(req, res) {
    const { type } = req.query;
    switch (type) {
      case 'books':
        SearchController.searchBooks(req, res);
        break;
      default: return res
        .status(400)
        .send({ message: ['Please specify a search type'] });
    }
  }

  /**
     * @method searchBooks
     * @param {object} request - express http request
     * @param {object} response - express http response
     * @return {object} - books
   */
  static searchBooks(request, response) {
    const { q } = request.query;
    Book.findAll({
      where: {
        title: {
          $iLike: `${q}%`
        }
      }
    })
      .then((books) => {
        if (books) {
          return response
            .status(200)
            .send({
              message: ['Book found'],
              data: books
            });
        }
        return response
          .send({ message: ['Book not found'] })
          .status(404);
      })
      .catch(errors => sendErrors({ res: response, errors }));
  }
}


export default SearchController;
