import model from '../models';

const { Book } = model;

/**
 * @class SearchClass
 * @classdesc Search Class
 */
class SearchClass {
  /**
   *
   * @method get
   * @param {object} req
   * @param {object} res
   * @return {object} response
   */
  static get(req, res) {
    const { type } = req.query;
    switch (type) {
      case 'books':
        SearchClass.searchBooks(req, res);
        break;
      default: return res
        .status(400)
        .send({ message: ['Please specify a search type'] });
    }
  }

  /**
   *
   * @method searchBooks
   * @param {object} request
   * @param {object} response
   * @return {object} response
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
      .then(books => response
        .status(200)
        .send({
          message: ['Book found'],
          data: books
        }));
  }
}


export default SearchClass;
