import React from 'react';
import PropTypes from 'prop-types';
import Autocomplete from 'react-autocomplete/dist/react-autocomplete';
import { connect } from 'react-redux';
import TimeAgo from 'react-timeago';
import { searchBooks } from 'actions/books';
import Button from 'form/Button';


/**
 * @class SearchStock
 * @extends {React.Component}
 */
class SearchStock extends React.Component {
  /**
     * Creates an instance of SearchStock.
     * @param {any} props
     * @memberof SearchStock
     */
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      searchResult: [],
      bookId: 0
    };
    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  /**
     * @returns {void}
     * @param {any} nextProps
     * @memberof SearchStock
     */
  componentWillReceiveProps(nextProps) {
    if (nextProps.searchResult !== this.props.searchResult) {
      this.setState({ searchResult: nextProps.searchResult });
    }
  }


  /**
     * @returns {void}
     * @param {any} event
     * @memberof SearchStock
     */
  onSubmit(event) {
    event.preventDefault();
    const { bookId } = this.state;
    this.context.router.push(`/books/stock-manager/${bookId}`);
  }


  /**
     * @returns {void}
     * @param {string} value
     * @param {object} book
     * @memberof SearchStock
     */
  onSelect(value, book) {
    this.setState({ title: value, bookId: book.id });
  }


  /**
     * @returns {void}
     * @param {object} event
     * @memberof SearchStock
     */
  onChange(event) {
    const { searchBooksAction } = this.props;
    this.setState({ title: event.target.value });
    const { title } = this.state;
    if (event.target.value.length > 2) {
      searchBooksAction(title);
    }
  }


  /**
     * @returns {object} JSX
     * @memberof SearchStock
     */
  render() {
    const { title, searchResult, bookId } = this.state;
    return (
      <div className="row" id="stockManager">
        <div className="col-sm-6 offset-sm-3">
          <div id="stockFilterForm" className="bg-faded p-3">
            <form>
              <input
                type="hidden"
                name="bookId"
                value={bookId}
              />
              <Autocomplete
                menuStyle={
                  {
                    position: 'absolute',
                    overflow: 'auto',
                    top: 'calc(100%-40px)',
                    left: 0,
                    right: 0,
                    margin: 'auto',
                    zIndex: '99'
                  }
                }
                items={searchResult}
                inputProps={
                  {
                    className: 'form-control px-0 mb-0',
                    type: 'text',
                    placeholder: 'Search by book title',
                    style: { position: 'relative' }
                  }
                }
                wrapperProps={
                  {
                    className: 'md-form form-sm d-block'
                  }
                }
                getItemValue={item => item.title}
                renderItem={(item, highlighted) =>
                  (<div
                    key={item.id}
                    style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
                    className="row p-3"
                  >
                    <div className="col-sm-3">
                      <img
                        className="img-thumbnail w-100 img-fluid"
                        src={item.coverPhotoPath}
                        alt={item.title} />
                    </div>
                    <div className="col-sm-9">
                      <h6 className="d-block title">{item.title}</h6>
                      <p className="small">{item.description}</p>
                      {item.publishedDate &&
                                            <p
                                              className="text-right small">
                                            Published on: {item.publishedDate}
                                            </p>}
                      <p className="text-right small">
                                                Added:
                        <TimeAgo date={item.createdAt} minPeriod={60} />
                      </p>
                    </div>
                  </div>)
                }
                value={title}
                onChange={this.onChange}
                onSelect={this.onSelect}
              />
              <div
                className="form-group text-right">
                <Button
                  name="submit"
                  onClick={this.onSubmit}
                  type="submit"
                  className="btn btn-success btn-sm"
                  label="Go!" />
                <button
                  name="reset"
                  type="reset"
                  className="btn btn-danger btn-sm">Reset
                </button>
              </div>
            </form>
          </div>{/* Stock filter form */}
        </div>
      </div>
    );
  }
}

SearchStock.propTypes = {
  searchResult: PropTypes.array.isRequired,
  searchBooksAction: PropTypes.func.isRequired
};
SearchStock.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  searchResult: state.books
});

export default connect(
  mapStateToProps,
  {
    searchBooksAction: searchBooks
  }
)(SearchStock);
