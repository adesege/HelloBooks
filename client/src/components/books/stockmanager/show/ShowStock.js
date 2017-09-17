import React from 'react';
import { connect } from 'react-redux';
import AddStock from './AddStock';
import { getStockManagerByBookId, addStock, deleteStock } from '../../../../actions/stockManager';
import { getBook } from '../../../../actions/books';
import StockList from './StockList';
import Button from '../../../form/Button';
import DeleteCategory from './DeleteCategory';

const $ = window.$;

/* eslint-disable require-jsdoc, class-methods-use-this */
class ShowStock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookId: 0,
      stocks: [],
      quantity: '',
      recordDate: '',
      isLoading: false,
      book: {}
    };

    this.onOpenModal = this.onOpenModal.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
    const { deleteStockAction } = this.props;
    const id = $(event.target).parents('.modal-footer').find('.deleteBtn').attr('id');
    this.setState({ isLoading: true });
    deleteStockAction({ id });
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

  onSubmit(event) {
    event.preventDefault();
    const { addStockAction, params } = this.props;
    const { quantity, recordDate } = this.state;
    this.setState({ isLoading: true });
    addStockAction({
      quantity,
      recordDate,
      bookId: params.id
    }).then(
      () => {
        this.closeModal();
      },
      () => {
        this.closeModal();
      }
    );
    this.setState({ isLoading: false });
  }

  closeModal = () => {
    $('#stock')
      .find('div button.btn[data-dismiss="modal"]')
      .trigger('click');
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onOpenModal(event) {
    event.preventDefault();
    this.openModal();
  }

  openModal() {
    const $stock = $('#stock');
    $stock.modal('show');
  }

  componentDidMount() {
    const { getStockManagerByBookIdAction, params, getBookAction } = this.props;
    const bookId = params.id;
    getBookAction({ id: bookId });
    getStockManagerByBookIdAction({ bookId });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.stocks !== this.props.stocks) {
      this.setState({ stocks: nextProps.stocks });
    }

    if (nextProps.book !== this.props.book) {
      this.setState({ book: nextProps.book });
    }
  }

  render() {
    const { stocks, quantity, recordDate, isLoading, book } = this.state;
    return (
      <div>
        <DeleteCategory
          isLoading = {isLoading}
          onDeleteSubmit = {this.onDeleteSubmit} />

        <AddStock
          quantity={quantity}
          recordDate={recordDate}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          isLoading={isLoading}
        />
        <div className="toolaction">
          <Button
            type="button"
            onClick={this.onOpenModal}
            className="btn btn-success"
            icon="plus"
          />
        </div>
        <h4 className="title mb-2 mr-4">Viewing {book.title} stock</h4>
        <div className="mb-4">
          <small>You can add or edit stock information for {book.title} here.<br/>
          Use the filter form to view from a particular page. </small>
        </div>
        <form className="form-inline mb-4">
          <div className="form-group mr-2">
            <select className="custom-select custom-select-sm form-control-sm w-100">
              <option>Filter by date</option>
              <option value="">Today</option>
              <option value="">7 days ago</option>
              <option value="">2 weeks ago</option>
              <option value="">a month ago</option>
              <option value="">a while ago</option>
            </select>
          </div>
          <div className="form-group text-right">
            <button
              type="button"
              className="btn btn-sm btn-success">Go!
            </button>
          </div>
        </form>

        <StockList
          stocks={stocks}
          onDeleteModal={this.onDeleteModal}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stocks: state.stocks,
  book: state.book
});

export default connect(mapStateToProps, {
  getStockManagerByBookIdAction: getStockManagerByBookId,
  addStockAction: addStock,
  deleteStockAction: deleteStock,
  getBookAction: getBook
})(ShowStock);
