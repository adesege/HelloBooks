import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
<<<<<<< HEAD
import { Document, Page } from 'react-pdf';
import cloudinary from 'cloudinary';
import { saveBooks, addBook } from '../../../actions/books';
=======
import { saveBooks } from '../../../actions/books';
>>>>>>> ad44c0c7b60423889f2e4e3e79b032885217e1d8
import Modal from '../../modal/Modal';
import Button from '../../form/Button';
import InputField from '../../form/InputField';
import Textarea from '../../form/TextareaField';
<<<<<<< HEAD
import FlashMessagesList from '../../flash/FlashMessagesList';
import { addFlashMessage } from '../../../actions/flashMessages';
import UploadBookCover from './UploadBookCover';
=======
>>>>>>> ad44c0c7b60423889f2e4e3e79b032885217e1d8

const $ = window.$;

/* eslint-disable require-jsdoc, class-methods-use-this */
class BooksModal extends Component {
<<<<<<< HEAD
    state = {
      title: this.props.book ? this.props.book.title : '',
      description: this.props.book ? this.props.book.description : '',
      book_url: this.props.book ? this.props.book.bookURL : '',
      stock_quantity: this.props.book ? this.props.book.stock.quantity : '',
      stock_record_date: this.props.book ? this.props.book.title : '',
      isbn: this.props.book ? this.props.book.title : '',
      published_date: this.props.book ? this.props.book.title : '',
      author: this.props.book ? this.props.book.title : '',
      book_category_id: this.props.book ? this.props.book.title : '',
      isLoading: false,
      showCoverBook: false,
      imageSrc: '',
      coverPhotoPath: this.props.book ? this.props.book.title : '',
      documentPath: this.props.book ? this.props.book.title : '',
      done: false
    };

    constructor(props) {
      super(props);
      this.onClickSubmit = this.onClickSubmit.bind(this);
      this.onClickOpenBookCover = this.onClickOpenBookCover.bind(this);
      this.onChangeUploadInput = this.onChangeUploadInput.bind(this);
      this.onChangeUploadFile = this.onChangeUploadFile.bind(this);
      this.onClickOk = this.onClickOk.bind(this);
    }

    onClickSubmit(event) {
      event.preventDefault();
      const { coverPhotoPath } = this.state;
      this.setState({ isLoading: true });
      if (coverPhotoPath) {
        cloudinary.config({
          cloud_name: 'adesege',
          api_key: '389297596633574',
          api_secret: 'snmxINvzk2UnTCvcnq_oolOBZ10'
        });

        cloudinary.uploader.upload(coverPhotoPath, (result) => {
          console.log(result, '++++++++++++_____________');
          this.setState({ coverPhotoPath: result.secure_url });

          this.props.saveBooks(this.state)
            .then(
              (response) => {
                const data = response.data;

                this.props.addFlashMessage({
                  type: 'success',
                  text: data
                });

                this.props.addBook(data);

                this.setState({
                  isLoading: false
                });

                $('#add-books')
                  .find('div button.btn[data-dismiss="modal"]')
                  .trigger('click');
              },
              (errors) => {
                this.setState({
                  isLoading: false
                });
                this.props.addFlashMessage({
                  type: 'error',
                  text: errors.response.data
                });
              });
        }, {
          crop: 'limit',
          width: 250,
          height: 435,
          eager: [
            { width: 125, height: 218, crop: 'fill', format: 'jpg' }
          ]
        });
      } else {
        this.props.addFlashMessage({
          type: 'error',
          text: 'Upload photo'
        });
        this.setState({
          isLoading: false
        });
      }
    }

    componentDidMount() {
      const $addBooks = $('#add-books');
      $addBooks.modal('show');

      $addBooks.on('hide.bs.modal', (e) => {
        this.context.router.push('/books');
      });
    }

    onClickOpenBookCover(event) {
      event.preventDefault();
      const $parent = $(event.target).parent().attr('target');
      const $target = $(`#${$parent}`);
      $target.click();
    }

    onChangeUploadInput(event) {
      const files = $(event.target)[0].files;
      if (!files.length || !window.FileReader) return; // no file selected, or no FileReader support

      if (/^image/.test(files[0].type)) { // only image file
        const reader = new FileReader(); // instance of the FileReader
        reader.readAsDataURL(files[0]); // read the local file
        reader.onloadend = (result) => { // set image data as background of div
          this.setState({ showCoverBook: true, imageSrc: result.target.result });
        };
      }
    }

    onChangeUploadFile(event) {
      const files = $(event.target)[0].files;
      if (!files.length || !window.FileReader) return; // no file selected, or no FileReader support

      if (/^application\/pdf/.test(files[0].type)) { // only image file
        this.setState({ fileData: files[0] });
      // console.log(files[0]);
      // $preview.html(files[0].name).addClass('mt-3')
      }
    }

    onClickOk() {
      this.setState({ showCoverBook: false });
    }

    onChange(e) {
      this.setState({ [e.target.name]: e.target.value });
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.coverPhotoPath !== nextProps.coverPhotoPath) {
        this.setState({ coverPhotoPath: nextProps.coverPhotoPath });
      }
    }


    render() {
      const { showCoverBook, coverPhotoPath, fileData } = this.state;

      const headerOptions = [
        (
          <span key="triggerUpload" className="d-inline-flex">
            <InputField
              type="file"
              id="triggerUploadInput"
              name="triggerUploadInput"
              hide={true}
              onChange={this.onChangeUploadInput} />

            <Button
              className="btn-sm btn-default"
              icon="image"
              target="triggerUploadInput"
              onClick = {this.onClickOpenBookCover}
            >
              <span className="hidden-xs-down">{coverPhotoPath ? 'Change' : 'Add'} cover</span>
            </Button>
          </span>
        ),
        (<span key="triggerUploadDoc" className="d-inline-flex">
          <InputField
            type="file"
            id="triggerUploadDoc"
            hide={true}
            name="triggerUploadDoc"
            onChange={this.onChangeUploadFile} />

          <Button
            key="triggerUploadDoc"
            className="btn-sm btn-default"
            target="triggerUploadDoc"
            icon="folder"
            onClick = {this.onClickOpenBookCover}
          >
            <span className="hidden-xs-down">{fileData ? 'Change' : 'Add'} file</span>
          </Button>
        </span>
        )
      ];
      return (
        <div>
          <Modal
            modalId="add-books"
            title={ showCoverBook ? 'Upload cover photo' : 'Add a book' }
            size="modal-lg"
            headerOptions={headerOptions}
            btnClass = "btn-success"
            btnLabel= { showCoverBook ? 'Ok' : 'Submit' }
            closeLabel = { showCoverBook ? 'Cancel' : 'Close' }
            btnOnClick={ showCoverBook ? this.onClickOk : this.onClickSubmit }
            btnDisabled={this.state.isLoading}
          >
            <FlashMessagesList />
            { showCoverBook ?
              (
                <UploadBookCover
                  id="upload-cover"
                  imageSrc={this.state.imageSrc} />
              )

              : (
                <div>
                  <div className="row" id="addBookForm">
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
                        <option value="1">Category 1</option>
                        <option value="2">Category 2</option>
                        <option value="3">Category 3</option>
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
                    <div className="col-sm-6">
                      <InputField
                        label="Number of copies"
                        name="stock_quantity"
                        value={this.state.stock_quantity}
                        onChange={this.onChange} />
                    </div>
                    <div className="col-sm-6">
                      <InputField
                        label="Stock date"
                        name="stock_record_date"
                        value={this.state.stock_record_date}
                        onChange={this.onChange} />
                    </div>
                    <div className="col-sm-6">
                      <InputField
                        label="ISBN"
                        name="isbn"
                        value={this.state.isbn}
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
                    </div>
                  </div>
                  <div className="row">
                    {coverPhotoPath && <div className="col-sm-5">
                      <img src={coverPhotoPath} alt="Book cover" style={{ width: 'auto', height: '300px' }} />
                    </div>
                    }
                    {fileData && <div className="col-sm-7">
                      <Document
                        file={fileData}
                      >
                        <Page
                          pageNumber={1}
                          width="250"
                        />
                      </Document>
                    </div>
                    }
                  </div>
                </div>
              )}
          </Modal>
        </div>
      );
    }
=======
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
>>>>>>> ad44c0c7b60423889f2e4e3e79b032885217e1d8
}

BooksModal.contextTypes = {
  router: PropTypes.object.isRequired
};

<<<<<<< HEAD
const mapStateToProps = (state, props) => {
  if (props.params.id && state.books && state.books.message) {
    return {
      book: state.books.message.find(item => item.id === parseInt(props.params.id, 10))
    };
  }
  return {
    book: null,
    coverPhotoPath: state.cropper.coverPhotoPath
  };
};

export default connect(mapStateToProps, { saveBooks, addFlashMessage, addBook })(BooksModal);
=======

export default connect(null, { saveBooks })(BooksModal);
>>>>>>> ad44c0c7b60423889f2e4e3e79b032885217e1d8
