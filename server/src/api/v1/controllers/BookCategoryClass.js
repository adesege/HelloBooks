import model from '../models';
import { formatErrorMessage } from '../utils';

const { bookCategory } = model;

/**
* @class BookCategoryClass
* @classdesc Book Category Class
*/
class BookCategoryClass {
  /**
    *
    * @param {object} req
    * @param {object} res
    * @return {void}
    */
  static add(req, res) {
    const name = req.body.name || '';
    if (!name) {
      return res.status(400).send({ message: ['The category name field is required'] });
    }
    return bookCategory
      .findOne({ where: { name } })
      .then((category) => {
        if (!category) {
          bookCategory.create({
            name
          }, {
            fields: ['name']
          })
            .then(newCategory =>
              res.status(201)
                .send({
                  message: ['Category added successfully'],
                  id: newCategory.get('id'),
                  category: newCategory
                }));
        } else {
          return res
            .status(400)
            .send({
              message: ['A category with this name already exist']
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
  static delete(req, res) { // delete a book
    const id = `${req.params.categoryId}`;
    bookCategory.findById(id)
      .then((category) => {
        if (category !== null) {
          bookCategory.destroy({ // delete record from stockManager
            where: { id }
          }).then(() =>
            res
              .status(200)
              .send({ message: ['Category deleted successfully'] }));
        } else {
          return res.status(404).send({ message: ['Category not found'] });
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
    bookCategory.findAll()
      .then(category => res
        .status(200)
        .send({ data: category }));
  }

  /**
*
* @method update
* @param {object} req
* @param {object} res
* @return {object} response
  */
  static update(req, res) {
    const id = `${req.params.categoryId}`;
    const name = `${req.body.name}`;
    bookCategory.findById(id)
      .then((category) => {
        if (category) {
          return bookCategory.update(
            { name },
            {
              where: { id },
              returning: true,
              plain: true
            }
          )
            .then(updatedCategory =>
              res.status(200)
                .send({
                  message: ['Category updated successfully'],
                  data: updatedCategory[1]
                }));
        }
        return res.status(400).send({ message: 'Cannot process this request at the moment.' });
      })
      .catch(errors => res.status(500).send({ message: formatErrorMessage(errors) }));
  }
}


export default BookCategoryClass;
