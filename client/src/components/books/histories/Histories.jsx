import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getHistories } from '../../../actions/histories';
import List from './List';


/**
 * @class Histories
 * @extends {React.Component}
 */
class Histories extends React.Component {
  /**
     * Creates an instance of Histories.
     * @param {any} props
     * @memberof Histories
     */
  constructor(props) {
    super(props);
    this.state = {
      histories: []
    };
  }

  /**
     * @returns {void}
     * @memberof Histories
     */
  componentDidMount() {
    const { userId } = this.props;
    this.props.getHistoriesAction({
      userId
    });
  }

  /**
     * @returns {void}
     * @param {any} nextProps
     * @memberof Histories
     */
  componentWillReceiveProps(nextProps) {
    if (nextProps.histories !== this.props.histories) {
      this.setState({ histories: nextProps.histories });
    }
  }


  /**
     * @returns {object} JSX
     * @memberof Histories
     */
  render() {
    return (
      <div>
        <h4 className="title mb-2 mr-4">My borrowing history</h4>
        <div className="mb-1">
          <small>I can view all my borrowing history here.</small>
        </div>
        <p>Borrowed 5, returned 3</p>
        <form className="form-inline mb-4">
          <select className="form-control form-control-sm mb-2 mr-sm-2 mb-sm-0">
            <option value="">by date...</option>
            <option value="">Today</option>
            <option value="">Last 7 days</option>
            <option value="">Last 14 days</option>
            <option value="">A month ago</option>
          </select>
          <select className="form-control form-control-sm mb-2 mr-sm-2 mb-sm-0">
            <option value="">by name...</option>
            <option value="">A-Z</option>
            <option value="">Z-A</option>
          </select>
          <button type="submit" className="btn btn-sm btn-danger">filter</button>
        </form>
        <List
          content={this.state.histories}
        />
        <button
          type="button"
          className="btn btn-primary bg-light btn-block mb-3">
                See more
        </button>
      </div>
    );
  }
}
Histories.propTypes = {
  histories: PropTypes.array.isRequired,
  userId: PropTypes.number.isRequired,
  getHistoriesAction: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  histories: state.histories,
  userId: state.auth.user.userId
});

export default connect(
  mapStateToProps,
  { getHistoriesAction: getHistories }
)(Histories);
