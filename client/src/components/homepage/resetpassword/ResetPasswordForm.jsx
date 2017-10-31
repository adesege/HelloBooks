import React from 'react';
import FlashMessagesList from '../../flash/FlashMessagesList';
import InputField from '../../form/InputField';
import Button from '../../form/Button';


/**
 * @class ResetPasswordForm
 * @extends {React.Component}
 */
class ResetPasswordForm extends React.Component {
  /**
     * Creates an instance of ResetPasswordForm.
     * @param {any} props
     * @memberof ResetPasswordForm
     */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      isLoading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
     * @returns {void}
     * @param {any} event
     * @memberof ResetPasswordForm
     */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
     * @returns {void}
     * @param {any} e
     * @memberof ResetPasswordForm
     */
  onSubmit(e) {
    e.preventDefault();
    this.setState({ isLoading: true });
  }

  /**
     *
     * @returns {object} JSX
     * @memberof ResetPasswordForm
     */
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <FlashMessagesList />
        <InputField
          type="email"
          label="Email address"
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          icon="envelope"
        />

        <Button
          disabled={this.state.isLoading}
          className="btn-danger btn-block"
          name="ResetPassword"
          label = "Send me the link"
        />
      </form>
    );
  }
}

export default ResetPasswordForm;
