import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveBooks } from '../../../actions/books';
import Modal from '../../modal/Modal';
import Button from '../../form/Button';
import InputField from '../../form/InputField';
import Textarea from '../../form/TextareaField';

const $ = window.$;

/* eslint-disable require-jsdoc, class-methods-use-this */
class BooksModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      book_url: '',
      stock: {
        quantity: '',
        record_date: ''
      },
      ISBN: '',
      published_date: '',
      author: '',
      book_category_id: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onClickSubmit = this.onClickSubmit.bind(this);
  }

  onClickSubmit(event) {
    event.preventDefault();
    this.props.saveBooks(this.state);

  }

  componentDidMount() {
    const $addBooks = $('#add-books');
    $addBooks.modal('show');

    $addBooks.on('hide.bs.modal', (e) => {
      this.context.router.push('/books');
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }


  render() {
    const headerOptions = [
      (<Button
        className="btn-sm btn-default"
        id="triggerUpload"
        icon="image"
      >
        <span className="hidden-xs-down">Add cover</span>
      </Button>
      ),
      (<Button
        className="btn-sm btn-default"
        id="triggerUploadDoc"
        icon="folder"
      >
        <span className="hidden-xs-down">Add file</span>
      </Button>
      )
    ];
    return (
      <Modal
        modalId="add-books"
        title="Add a book"
        size="modal-lg"
        headerOptions={headerOptions}
        btnClass = "btn-success"
        btnLabel= "Submit"
        btnOnClick={this.onClickSubmit}
      >
        <div className="row">
          <div className="col-sm-9 mdb-form form-sm">
            <InputField
              label="Title"
              name="title"
              value={this.state.title}
              onChange={this.onChange} />
          </div>
          <div className="col-sm-3 mdb-form form-sm">
            <select
              className="form-control"
              name="book_category_id"
              value={this.state.book_category_id}
              onChange={this.onChange}>
              <option value="">Please select a category...</option>
              <option value="">Category 1</option>
              <option value="">Category 2</option><option value="">Category 3</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <InputField
              label="Book author"
              name="author"
              value={this.state.author}
              onChange={this.onChange} />
          </div>
          <div className="col-sm-6" name="stock['quantity']">
            <InputField
              label="Number of copies"
              name="stock['quantity']"
              value={this.state.stock.quantity}
              onChange={this.onChange} />
          </div>
          <div className="col-sm-6">
            <InputField
              label="Stock date"
              name="stock['record_date']"
              value={this.state.stock.record_date}
              onChange={this.onChange} />
          </div>
          <div className="col-sm-6">
            <InputField
              label="ISBN"
              name="ISBN"
              value={this.state.ISBN}
              onChange={this.onChange} />
          </div>
          <div className="col-sm-6">
            <InputField
              label="Book url"
              name="book_url"
              value={this.state.book_url}
              onChange={this.onChange} />
          </div>
          <div className="col-sm-6">
            <InputField
              label="Date published"
              name="published_date"
              value={this.state.published_date}
              onChange={this.onChange} />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="mdb-form">
              <Textarea
                name="description"
                placeholder="Description for this book"
                rows="5"
                style={{ minHeight: '200px' }}
                value={this.state.description}
                onChange={this.onChange} />
            </div>
          </div>{/* col-sm-6 */}
        </div>{/* row */}
      </Modal>

    );
  }
}

BooksModal.contextTypes = {
  router: PropTypes.object.isRequired
};


export default connect(null, { saveBooks })(BooksModal);
