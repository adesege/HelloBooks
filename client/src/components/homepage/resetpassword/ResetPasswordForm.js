import React from 'react';
import FlashMessagesList from '../../flash/FlashMessagesList';
import InputField from '../../form/InputField';
import Button from '../../form/Button';

/* eslint-disable require-jsdoc, class-methods-use-this */
class ResetPasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      isLoading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ isLoading: true });
  }

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
