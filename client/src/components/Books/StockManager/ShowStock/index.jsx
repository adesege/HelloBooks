import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getStockManagerByBookId,
  addStock,
  deleteStock } from 'actions/stockManager';
import Button from 'form/Button';
import StockList from './StockList';
import AddStock from './AddStock';
import DeleteStock from './DeleteStock';

/**
 * @class ShowStock
 * @extends {React.Component}
 */
class ShowStock extends React.Component {
  /**
     * Creates an instance of ShowStock.
     * @param {object} props
     * @memberof ShowStock
     */
  constructor(props) {
    super(props);
    this.state = {
      bookId: 0,
      stocks: [],
      quantity: '',
      isLoading: false,
      isOpenModal: false,
      isOpenDeleteModal: false,
      isOpenAddModal: false,
      stockId: 0
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDeleteSubmit = this.onDeleteSubmit.bind(this);
    this.onDeleteModal = this.onDeleteModal.bind(this);
    this.toggleOpenAddModal = this.toggleOpenAddModal.bind(this);
  }


  /**
     * @returns {void}
     * @memberof ShowStock
     */
  componentDidMount() {
    const {
      getStockManagerByBookIdAction,
      params,
    } = this.props;
    const bookId = params.id;
    getStockManagerByBookIdAction({ bookId });
  }


  /**
     * @returns {void}
     * @param {object} nextProps
     * @memberof ShowStock
     */
  componentWillReceiveProps(nextProps) {
    if (nextProps.stocks !== this.props.stocks) {
      this.setState({ stocks: nextProps.stocks });
    }
  }

  /**
   * @returns {void}
   * @param {any} event
   * @memberof ShowStock
   */
  onDeleteSubmit(event) {
    event.preventDefault();
    const { deleteStockAction } = this.props;
    const id = this.state.stockId;
    this.setState({ isLoading: true });
    deleteStockAction({ id })
      .then(() =>
        this.toggleOpenDeleteModal())
      .catch(() => this.toggleOpenDeleteModal());
    this.setState({ isLoading: false });
  }

  /**
   * @returns {void}
   * @param {any} event
   * @memberof ShowStock
   */
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
        this.toggleOpenAddModal();
      },
      () => {
        this.toggleOpenAddModal();
      }
    );
    this.setState({ isLoading: false });
  }

  /**
   * @returns {void}
   * @param {any} event
   * @memberof ShowStock
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
 * @returns {void}
 * @param {any} event
 * @memberof ShowStock
 */
  onDeleteModal(event) {
    event.preventDefault();
    const stockId = event.target.getAttribute('id');
    this.setState({
      isOpenDeleteModal: !this.state.isOpenDeleteModal,
      stockId
    });
  }

  /**
 * @returns {void}
 * @memberof ShowStock
 */
  toggleOpenAddModal() {
    this.setState({
      isOpenAddModal: !this.state.isOpenAddModal
    });
  }

  /**
   * @returns {object} JSX
   * @memberof ShowStock
   */
  render() {
    const {
      stocks,
      quantity,
      isLoading,
    } = this.state;
    return (
      <div>
        <DeleteStock
          isLoading = {isLoading}
          onDeleteSubmit = {this.onDeleteSubmit}
          isOpenModal = {this.state.isOpenDeleteModal}
          toggleOpenDeleteModal = {this.onDeleteModal}
        />

        <AddStock
          quantity={quantity}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          isLoading={isLoading}
          isOpenModal = {this.state.isOpenAddModal}
          toggleOpenModal = {this.toggleOpenAddModal}
        />
        <div className="toolaction">
          <Button
            type="button"
            onClick={this.toggleOpenAddModal}
            className="btn btn-success"
            icon="plus"
          />
        </div>
        <h4 className="title mb-2 mr-4">Viewing {this.state.stock && this.state.stocks[0].book.title} stock</h4>
        <div className="mb-4">
          <small>
                    You can add or edit stock
                    information for {this.state.stock && this.state.stocks[0].book.title} here.<br/>
                    Use the filter form to view from a particular page.
          </small>
        </div>
        <form className="form-inline mb-4">
          <div className="form-group mr-2">
            <select
              className="custom-select custom-select-sm form-control-sm w-100">
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

ShowStock.propTypes = {
  stocks: PropTypes.array.isRequired,
  getStockManagerByBookIdAction: PropTypes.func.isRequired,
  addStockAction: PropTypes.func.isRequired,
  deleteStockAction: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  stocks: state.stocks,
});

export default connect(mapStateToProps, {
  getStockManagerByBookIdAction: getStockManagerByBookId,
  addStockAction: addStock,
  deleteStockAction: deleteStock,
})(ShowStock);
