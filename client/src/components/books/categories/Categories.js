import React from 'react';
import { connect } from 'react-redux';
import CategoriesList from './CategoriesList';
import AddCategory from './AddCategory';
import DeleteCategory from './DeleteCategory';
import { addBookCategory,
  getBookCategories,
  editBookCategory,
  deleteBookCategory } from '../../../actions/categories';

const $ = window.$;

/* eslint-disable require-jsdoc, class-methods-use-this */
class Categories extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      id: '',
      isLoading: false,
      categories: [],
      isEdit: false
    };

    this.onOpenModal = this.onOpenModal.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onDeleteModal = this.onDeleteModal.bind(this);
    this.onDeleteSubmit = this.onDeleteSubmit.bind(this);
  }

  closeDeleteModal = () => {
    $('#delete-modal')
      .find('div button.btn[data-dismiss="modal"]')
      .trigger('click');
  }

  onDeleteSubmit(event) {
    event.preventDefault();
    const { deleteBookCategoryAction } = this.props;
    const id = $(event.target).parents('.modal-footer').find('.deleteBtn').attr('id');
    this.setState({ isLoading: true });
    deleteBookCategoryAction({ id });
    this.closeDeleteModal();
    this.setState({ isLoading: false });
  }

  onDeleteModal(event) {
    event.preventDefault();
    const id = $(event.target).parents('tr').attr('id');
    const $deleteCategory = $('#delete-modal');
    $deleteCategory.find('.deleteBtn').attr('id', id);
    $deleteCategory.modal('show');
  }

  onEditClick(event) {
    event.preventDefault();
    const { categories } = this.state;
    const { addFlashMessage } = this.props;
    const id = $(event.target).parents('tr').attr('id');
    const category = categories
      .find(item =>
        parseInt(item.id, 10) === parseInt(id, 10));
    if (category) {
      this.setState({
        id: category.id,
        name: category.name,
        isEdit: true });
      this.openModal();
    } else {
      addFlashMessage({
        type: 'error',
        text: 'There was an error processing your request'
      });
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const { isEdit, name, id } = this.state;
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
    this.closeModal();
    this.setState({ isLoading: false });
  }

  onOpenModal(event) {
    event.preventDefault();
    this.openModal();
  }

  openModal() {
    $(document).ready(() => {
      const $category = $('#category');
      $category.modal('show');
    });
  }
  closeModal = () => {
    $('#category')
      .find('div button.btn[data-dismiss="modal"]')
      .trigger('click');
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  componentDidMount() {
    this.props.getBookCategoriesAction();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.bookCategories !== this.props.bookCategories) {
      this.setState({ categories: nextProps.bookCategories });
    }
  }

  render() {
    const { categories, isLoading, name, id, isEdit } = this.state;
    return (
      <div>
        <DeleteCategory
          isLoading = {isLoading}
          onDeleteSubmit = {this.onDeleteSubmit} />

        <div className="toolaction">
          <button
            type="button"
            className="btn btn-success"
            onClick={this.onOpenModal}
          >
            <i className="fa fa-plus text-white"></i>
          </button>
        </div>
        <h4 className="title mb-2 mr-4">Book categories</h4>
        <div className="mb-4">
          <small>View books by category</small>
        </div>
        <form className="form-inline mb-4">
          <select
            className="form-control custom-select form-control-sm mb-2 mr-sm-2 mb-sm-0">
            <option value="">by date...</option>
            <option value="">Today</option>
            <option value="">Last 7 days</option>
            <option value="">Last 14 days</option>
            <option value="">A month ago</option>
          </select>
          <select
            className="form-control form-control-sm custom-select mb-2 mr-sm-2 mb-sm-0">
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
          name = {name}
          id = {id}
          isEdit = {isEdit}
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

const mapStateToProps = state => ({
  bookCategories: state.categories
});

export default connect(mapStateToProps,
  {
    addBookCategoryAction: addBookCategory,
    getBookCategoriesAction: getBookCategories,
    editBookCategoryAction: editBookCategory,
    deleteBookCategoryAction: deleteBookCategory
  })(Categories);
