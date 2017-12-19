import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUsers, updateUser } from 'actions/users';
import { addFlashMessage } from 'actions/flashMessages';
import BorrowedBooksList from 'components/Books/Histories/List';
import validateUser from 'utils/validators/user';
import Info from './Info';

const propTypes = {
  getUsersAction: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  userGroup: PropTypes.string.isRequired,
  user: PropTypes.object,
  updateUserAction: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
};

/**
 * Profile component
 *
 * @class Profile
 *
 * @extends {React.Component}
 */
class Profile extends React.Component {
  /**
   * Creates an instance of Profile.
   *
   * @param {object} props
   *
   * @memberof Profile
  */
  constructor(props) {
    super(props);
    this.state = {
      borrowedBooks: [],
      user: {},
      passwordChange: {
        oldPassword: '',
        password: '',
        confirmPassword: '',
        userId: props.userId ? `${props.userId}` : ''
      },
      isOpenModal: false,
      isLoading: false,
      errors: {},
      serverErrors: []
    };
    this.onChangePasswordInput = this.onChangePasswordInput.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.toggleOpenModal = this.toggleOpenModal.bind(this);
  }

  /**
   * Lifecycle method invoked when component mounts
   *
   * @returns {undefined}
   *
   * @memberof Profile
  */
  componentDidMount() {
    const { userId } = this.props;
    this.props.getUsersAction({
      userId
    });
  }

  /**
   * Lifecycle method invoked when component will receive props
   *
   * @returns {undefined}
   *
   * @param {object} nextProps
   *
   * @memberof Profile
  */
  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      this.setState({ user: nextProps.user });
    }
  }

  /**
   * Toggle open change password modal
   *
   * @returns {undefined}
   *
   * @memberOf Profile
   */
  toggleOpenModal() {
    this.setState({
      isOpenModal: !this.state.isOpenModal
    });
  }


  /**
   * Change password
   *
   * @returns {undefined}
   *
   * @param {object} event
   *
   * @memberof Profile
  */
  onChangePassword(event) {
    event.preventDefault();
    if (!this.isFormValid()) { return; }
    this.setState({ errors: {} });
    this.props.updateUserAction(this.state.passwordChange)
      .then((response) => {
        if (response.response && response.response.status >= 400) {
          this.setState({ serverErrors: response.response.data.message });
        } else {
          this.props.addFlashMessage({
            type: 'success',
            text: response.data.message
          });
          this.toggleOpenModal();
        }
      });
  }

  /**
   * Handle change password form input onChange event
   *
   * @returns {undefined}
   *
   * @param {object} event
   *
   * @memberof Profile
   */
  onChangePasswordInput(event) {
    this.setState({
      passwordChange: {
        ...this.state.passwordChange,
        [event.target.name]: event.target.value
      }
    });
  }


  /**
   * Validation check
   *
   * @returns {boolean} isValid
   *
   * @memberof Profile
   */
  isFormValid() {
    const { errors, isValid } = validateUser(this.state.passwordChange, 'change-password-user');
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  /**
   * Render component
   *
   * @returns {JSX} JSX
   *
   * @memberof Profile
  */
  render() {
    return (
      <div>
        <Info
          passwordChange={this.state.passwordChange}
          user={this.state.user}
          onChangePasswordInput={this.onChangePasswordInput}
          onChangePassword={this.onChangePassword}
          isOpenModal={this.state.isOpenModal}
          toggleOpenModal={this.toggleOpenModal}
          isLoading={this.state.isLoading}
          errors={this.state.errors}
          serverErrors={this.state.serverErrors}
        />
        <div className="row pr-3 pl-3" id="yetReturn">
          <div className="col-sm-8  offset-sm-2 px-0">
            <h6 className="title">I'm yet to return...</h6>
            <BorrowedBooksList
              histories={this.state.borrowedBooks}
              isReturned={false}
            />
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = propTypes;

/**
  * Get state from store
  *
  * @param {object} state
  *
  * @returns {object} map state to props
 */
const mapStateToProps = (state) => {
  const { userId } = state.auth.user;
  return {
    userId,
    userGroup: state.auth.user.group,
    user: state.users
      .find(user => parseInt(user.id, 10) === parseInt(userId, 10))
  };
};

export { Profile };
export default connect(mapStateToProps, {
  getUsersAction: getUsers,
  updateUserAction: updateUser,
  addFlashMessage
})(Profile);
