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

const propTypes = {
  addBookCategoryAction: PropTypes.func.isRequired,
  getBookCategoriesAction: PropTypes.func.isRequired,
  editBookCategoryAction: PropTypes.func.isRequired,
  deleteBookCategoryAction: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  bookCategories: PropTypes.array.isRequired
};

/**
 * Categories component
 *
 * @class Categories
 *
 * @extends {React.Component}
 */
class Categories extends React.Component {
  /**
     * Creates an instance of Categories.
     *
     * @param {object} props - component props
     *
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
   * Lifecycle method when component did mount
   *
   * @returns {undefined}
   *
   * @memberof Categories
   */
  componentDidMount() {
    this.props.getBookCategoriesAction();
  }


  /**
   * Lifecycle method invoked when component receives props
   *
   * @returns {undefined}
   *
   * @param {object} nextProps - lifecycle next props
   *
   * @memberof Categories
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.bookCategories !== this.props.bookCategories) {
      this.setState({ categories: nextProps.bookCategories });
    }
  }

  /**
   * Deletes a category
   *
   * @param {object} event - event handler
   *
   * @memberof Categories
   *
   * @returns {undefined}
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
   * Open delete modal
   *
   * @param {object} event - event handler
   *
   * @memberof Categories
   *
   * @returns {undefined}
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
   * Edit a category
   *
   * @param {object} event - event handler
   *
   * @memberof Categories
   *
   * @returns {undefined}
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
   * Add a book category
   *
   * @returns {undefined}
   *
   * @param {object} event - event handler
   *
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
   * Handle file input onCHange event
   *
   * @param {object} event - event handler
   *
   * @memberof Categories
   *
   * @returns {undefined}
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
   * Toggle open category modal
   *
   * @memberof Categories
   *
   * @returns {undefined}
 */
  toggleOpenModal() {
    this.setState({
      isOpenModal: !this.state.isOpenModal
    });
  }

  /**
   * Toggle open delete modal
   *
   * @returns {undefined}
   *
   * @memberof Categories
  */
  toggleOpenDeleteModal() {
    this.setState({
      isOpenDeleteModal: !this.state.isOpenDeleteModal
    });
  }

  /**
   * Run validation on form inputs
   *
   * @memberof Categories
   *
   * @returns {boolean} isValid
  */
  isFormValid() {
    const { errors, isValid } = validateCategory(this.state.category);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  /**
   * Render component
   *
   * @memberof Categories
   *
   * @returns {object} JSX
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

Categories.propTypes = propTypes;

/**
 * Maps state to props
 *
 * @param {object} state - redux store state
 *
 * @returns {object} map state to props
 */
const mapStateToProps = state => ({
  bookCategories: state.categories
});

export { Categories };
export default connect(
  mapStateToProps,
  {
    addBookCategoryAction: addBookCategory,
    getBookCategoriesAction: getBookCategories,
    editBookCategoryAction: editBookCategory,
    deleteBookCategoryAction: deleteBookCategory
  }
)(Categories);
