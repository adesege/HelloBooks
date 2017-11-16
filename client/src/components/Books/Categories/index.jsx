import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addBookCategory,
  getBookCategories,
  editBookCategory,
  deleteBookCategory } from 'actions/categories';
import validateCategory from 'utils/validators/category';
import CategoriesList from './CategoriesList';
import AddCategory from './AddCategory';
import DeleteCategory from './DeleteCategory';

/**
 * @class Categories
 * @extends {React.Component}
 */
class Categories extends React.Component {
  /**
     * Creates an instance of Categories.
     * @param {any} props
     * @memberof Categories
     */
  constructor(props) {
    super(props);

    this.state = {
      category: {
        name: '',
        id: '',
      },
      isLoading: false,
      categories: [],
      isEdit: false,
      isOpenModal: false,
      isOpenDeleteModal: false,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onDeleteModal = this.onDeleteModal.bind(this);
    this.onDeleteSubmit = this.onDeleteSubmit.bind(this);
    this.toggleOpenModal = this.toggleOpenModal.bind(this);
    this.toggleOpenDeleteModal = this.toggleOpenDeleteModal.bind(this);
  }


  /**
   * @returns {void}
   * @memberof Categories
   */
  componentDidMount() {
    this.props.getBookCategoriesAction();
  }


  /**
   * @returns {void}
   * @param {any} nextProps
   * @memberof Categories
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.bookCategories !== this.props.bookCategories) {
      this.setState({ categories: nextProps.bookCategories });
    }
  }

  /**
   * @returns {void}
   * @param {any} event
   * @memberof Categories
   */
  onDeleteSubmit(event) {
    event.preventDefault();
    const { deleteBookCategoryAction } = this.props;
    const { id } = this.state.category;
    this.setState({ isLoading: true });
    deleteBookCategoryAction({ id });
    this.setState({
      isOpenDeleteModal: false
    });
    this.setState({ isLoading: false });
  }


  /**
   * @returns {void}
   * @param {any} event
   * @memberof Categories
   */
  onDeleteModal(event) {
    event.preventDefault();
    const id = event.target.parentNode.getAttribute('id');
    this.setState({
      category: {
        ...this.state.category,
        id
      },
      isOpenDeleteModal: true
    });
  }


  /**
   * @returns {void}
   * @param {any} event
   * @memberof Categories
   */
  onEditClick(event) {
    event.preventDefault();
    const { categories } = this.state;
    const { addFlashMessage } = this.props;
    const id = event.target.parentNode.getAttribute('id');
    const category = categories
      .find(item =>
        parseInt(item.id, 10) === parseInt(id, 10));
    if (category) {
      this.setState({
        category: {
          id: category.id,
          name: category.name,
        },
        isEdit: true
      });
      this.setState({ isOpenModal: true });
    } else {
      addFlashMessage({
        type: 'error',
        text: 'There was an error processing your request'
      });
    }
  }


  /**
   * @returns {void}
   * @param {any} event
   * @memberof Categories
   */
  onSubmit(event) {
    event.preventDefault();
    if (!this.isFormValid()) { return; }
    const { name, id } = this.state.category;
    const { isEdit } = this.state;
    const {
      addBookCategoryAction,
      editBookCategoryAction
    } = this.props;
    this.setState({ isLoading: true });
    if (isEdit) {
      editBookCategoryAction({ name, id });
    } else {
      addBookCategoryAction({ name });
    }
    this.toggleOpenModal();
    this.setState({ isLoading: false });
  }

  /**
   * @returns {void}
   * @param {any} event
   * @memberof Categories
   */
  onChange(event) {
    this.setState({
      category: {
        ...this.state.category,
        [event.target.name]: event.target.value
      }
    });
  }

  /**
 * @returns {void}
 * @memberof Categories
 */
  toggleOpenModal() {
    this.setState({
      isOpenModal: !this.state.isOpenModal
    });
  }

  /**
 * @returns {void}
 * @memberof Categories
 */
  toggleOpenDeleteModal() {
    this.setState({
      isOpenDeleteModal: !this.state.isOpenDeleteModal
    });
  }

  /**
   * @returns {boolean} isValid
   * @memberof Categories
   */
  isFormValid() {
    const { errors, isValid } = validateCategory(this.state.category);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  /**
   * @returns {object} JSX
   * @memberof Categories
   */
  render() {
    const {
      categories, isLoading, isEdit, category, isOpenDeleteModal
    } = this.state;
    return (
      <div>
        <DeleteCategory
          isOpenModal = {isOpenDeleteModal}
          toggleOpenModal = {this.toggleOpenDeleteModal}
          isLoading = {isLoading}
          onDeleteSubmit = {this.onDeleteSubmit} />

        <div className="toolaction">
          <button
            type="button"
            className="btn btn-success"
            onClick={this.toggleOpenModal}
          >
            <i className="fa fa-plus text-white" />
          </button>
        </div>
        <h4 className="title mb-2 mr-4">Book categories</h4>
        <div className="mb-4">
          <small>View books by category</small>
        </div>
        <form className="form-inline mb-4">
          <select
            className=
              "form-control custom-select \
                          form-control-sm mb-2 mr-sm-2 mb-sm-0">
            <option value="">by date...</option>
            <option value="">Today</option>
            <option value="">Last 7 days</option>
            <option value="">Last 14 days</option>
            <option value="">A month ago</option>
          </select>
          <select
            className=
              "form-control form-control-sm \
                           custom-select mb-2 mr-sm-2 mb-sm-0">
            <option value="">by name...</option>
            <option value="">A-Z</option>
            <option value="">Z-A</option>
          </select>
          <button
            type="submit"
            className="btn btn-sm btn-danger">filter
          </button>
        </form>

        <AddCategory
          onChange = {this.onChange}
          isLoading = {isLoading}
          onSubmit = {this.onSubmit}
          category = {category}
          isEdit = {isEdit}
          isOpenModal = {this.state.isOpenModal}
          toggleOpenModal = {this.toggleOpenModal}
          validationError = {this.state.errors}
        />

        <CategoriesList
          categories = {categories}
          onEditClick = {this.onEditClick}
          onDeleteModal = {this.onDeleteModal}
        />
      </div>
    );
  }
}

Categories.propTypes = {
  addBookCategoryAction: PropTypes.func.isRequired,
  getBookCategoriesAction: PropTypes.func.isRequired,
  editBookCategoryAction: PropTypes.func.isRequired,
  deleteBookCategoryAction: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  bookCategories: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
  bookCategories: state.categories
});

export default connect(
  mapStateToProps,
  {
    addBookCategoryAction: addBookCategory,
    getBookCategoriesAction: getBookCategories,
    editBookCategoryAction: editBookCategory,
    deleteBookCategoryAction: deleteBookCategory
  }
)(Categories);
