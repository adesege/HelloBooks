import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getStockByBookId,
  addStock,
  deleteStock } from 'actions/stockManager';
import Button from 'form/Button';
import StockList from './StockList';
import AddStock from './AddStock';
import DeleteStock from './DeleteStock';

const propTypes = {
  stocks: PropTypes.array.isRequired,
  getStockByBookIdAction: PropTypes.func.isRequired,
  addStockAction: PropTypes.func.isRequired,
  deleteStockAction: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired
};

/**
 * Show stock component
 *
 * @class ShowStock
 *
 * @extends {React.Component}
*/
class ShowStock extends React.Component {
  /**
   * Creates an instance of ShowStock.
   *
   * @param {object} props - component props
   *
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
   * Get stock manager by book id when component mounts
   *
   * @returns {undefined}
   *
   * @memberof ShowStock
  */
  componentDidMount() {
    const {
      getStockByBookIdAction,
      params,
    } = this.props;
    const bookId = params.id;
    getStockByBookIdAction({ bookId });
  }


  /**
   * Lifecycle method invoked when component receives props
   *
   * @param {object} nextProps - lifecycle next props
   *
   * @memberof ShowStock
   *
   * @returns {undefined}
  */
  componentWillReceiveProps(nextProps) {
    if (nextProps.stocks !== this.props.stocks) {
      this.setState({ stocks: nextProps.stocks });
    }
  }

  /**
   * Delete stock info
   *
   * @returns {undefined}
   *
   * @param {object} event - event handler
   *
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
   * Add stock information for a particular book
   *
   * @returns {undefined}
   *
   * @param {object} event - event handler
   *
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
   * Handle file input onChange event and set state according
   *
   * @returns {undefined}
   *
   * @param {object} event - event handler
   *
   * @memberof ShowStock
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * Delete a particular stock information
   *
   * @returns {undefined}
   *
   * @param {object} event - event handler
   *
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
   * Toggle open add modal
   *
   * @returns {undefined}
   *
   * @memberof ShowStock
  */
  toggleOpenAddModal() {
    this.setState({
      isOpenAddModal: !this.state.isOpenAddModal
    });
  }

  /**
   * Render component
   *
   * @returns {JSX} JSX
   *
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
        {this.state.stocks[0] &&
        <div className="toolaction">
          <Button
            type="button"
            onClick={this.toggleOpenAddModal}
            className="btn btn-success"
            icon="plus"
          />
        </div>
        }
        <h4 className="title mb-2 mr-4">
        Viewing {this.state.stocks[0] && this.state.stocks[0].book.title} stock
        </h4>
        <div className="mb-4">
          <small>
            You can add or edit stock
            information for &nbsp;
            {this.state.stocks[0] && this.state.stocks[0].book.title} here.
          </small>
        </div>
        <StockList
          stocks={stocks}
          onDeleteModal={this.onDeleteModal}
        />
      </div>
    );
  }
}

ShowStock.propTypes = propTypes;

/**
 * Get state from store
 *
 * @param {object} state - redux store state
 *
 * @returns {object} map state to props
 */
const mapStateToProps = state => ({
  stocks: state.stocks,
});

export { ShowStock };
export default connect(mapStateToProps, {
  getStockByBookIdAction: getStockByBookId,
  addStockAction: addStock,
  deleteStockAction: deleteStock,
})(ShowStock);
