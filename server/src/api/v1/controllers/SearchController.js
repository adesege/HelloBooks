import model from '../models';
import { sendErrors } from '../utils';

const { Book } = model;

/**
 * Search controller
 *
 * @class SearchController
 */
class SearchController {
  /**
   * Get search result
   *
   * @method getResult
   *
   * @param {object} req - express http request
   * @param {object} res - express http response
   *
   * @return {object} - search data
  */
  static getResult(req, res) {
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
   * Search books
   *
   * @method searchBooks
   *
   * @param {object} request - express http request
   * @param {object} response - express http response
   *
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
        if (books.length !== 0) {
          return response
            .status(200)
            .send({
              message: ['Book found'],
              books
            });
        }
        return response
          .status(404)
          .send({ message: ['Book not found'] });
      })
      .catch(errors => sendErrors({ res: response, errors }));
  }
}


export default SearchController;
