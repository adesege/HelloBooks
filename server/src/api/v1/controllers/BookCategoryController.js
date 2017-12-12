import model from '../models';
import { sendErrors } from '../utils';

const { bookCategory } = model;

/**
* @class BookCategoryController
* @classdesc Book Category Class
*/
class BookCategoryController {
  /**
    * @param {object} req - express http request
    * @param {object} res - express http response
    * @return {object} - new added category
    */
  static add(req, res) {
    const name = req.body.name || '';
    if (!name) {
      return res
        .status(400)
        .send({
          message: ['The category name field is required']
        });
    }
    return bookCategory
      .findOne({ where: { name } })
      .then((category) => {
        if (!category) {
          return bookCategory
            .create({
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
                }))
            .catch(errors => sendErrors({ res, errors }));
        }
        return res
          .status(409)
          .send({
            message: ['A category with this name already exist']
          });
      });
  }
  /**
    * @param {object} req - express http request
    * @param {object} res - express http response
    * @returns {undefined}
  */
  static delete(req, res) {
    const id = `${req.params.categoryId}`;
    bookCategory
      .findById(id)
      .then((category) => {
        if (category) {
          return bookCategory
            .destroy({
              where: { id }
            })
            .then(() =>
              res
                .status(200)
                .send({ message: ['Category deleted successfully'] }))
            .catch(errors => sendErrors({ res, errors }));
        }
        return res
          .status(404)
          .send({ message: ['Category not found'] });
      });
  }

  /**
    * @method get
    * @param {object} req - express http request
    * @param {object} res - express http response
    * @return {object} - all book categories
  */
  static get(req, res) {
    return bookCategory
      .findAll()
      .then((category) => {
        if (category) {
          return res
            .status(200)
            .send({ data: category });
        }
        return res
          .status(404)
          .send({ message: ['No category found at the moment'] });
      })
      .catch(errors => sendErrors({ res, errors }));
  }

  /**
    * @method update
    * @param {object} req - express http request
    * @param {object} res - express http response
    * @return {object} - updated category object
  */
  static update(req, res) {
    const id = `${req.params.categoryId}`;
    const name = `${req.body.name}`;
    return bookCategory
      .findById(id)
      .then((category) => {
        if (category) {
          return bookCategory
            .update(
              { name },
              {
                where: { id },
                returning: true,
                plain: true
              }
            )
            .then(updatedCategory =>
              res
                .status(200)
                .send({
                  message: ['Category updated successfully'],
                  data: updatedCategory[1]
                }));
        }
        return res
          .status(404)
          .send({ message: ['Category not found'] });
      })
      .catch(errors => sendErrors({ res, errors }));
  }
}


export default BookCategoryController;
