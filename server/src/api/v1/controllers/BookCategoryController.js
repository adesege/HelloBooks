import model from '../models';
import { sendErrors } from '../utils';

const { bookCategory } = model;

/**
 * Book Category Controller
 *
 * @class BookCategoryController
*/
class BookCategoryController {
  /**
   * Adds a category
   *
   * @param {object} req - express http request
   * @param {object} res - express http response
   *
   * @return {object} - new added category
  */
  static addCategory(req, res) {
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
   * Delete category
   *
   * @param {object} req - express http request
   * @param {object} res - express http response
   *
   * @returns {object} Response message
  */
  static deleteCategory(req, res) {
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
   * Get all categories
   *
   * @method getCategories
   *
   * @param {object} req - express http request
   * @param {object} res - express http response
   *
   * @return {object} - all book categories
  */
  static getCategories(req, res) {
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
   * Edit a category
   *
   * @method update
   *
   * @param {object} req - express http request
   * @param {object} res - express http response
   *
   * @return {object} - edited category object
  */
  static editCategory(req, res) {
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
