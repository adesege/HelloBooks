import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Document, Page } from 'react-pdf';
import cloudinary from 'cloudinary';
import { saveBooks, addBook, uploadBookCoverPhoto } from '../../../actions/books';
import Modal from '../../modal/Modal';
import Button from '../../form/Button';
import InputField from '../../form/InputField';
import Textarea from '../../form/TextareaField';
import FlashMessagesList from '../../flash/FlashMessagesList';
import { addFlashMessage } from '../../../actions/flashMessages';
import UploadBookCover from './UploadBookCover';

const $ = window.$;

/* eslint-disable require-jsdoc, class-methods-use-this */
class BooksModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      bookURL: '',
      stock_quantity: '',
      stock_record_date: '',
      ISBN: '',
      publishedDate: '',
      author: '',
      bookCategoryId: '',
      isLoading: false,
      showCoverBook: false,
      imageSrc: '',
      coverPhotoPath: '',
      documentPath: ''
    };

    this.onChange = this.onChange.bind(this);
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

    // this.handleCoverPhotoUpload();
    this.setState({ coverPhotoPath: '' });
    this.props.saveBooks(this.state)
      .then(
        (response) => {
          const data = response.data;

          cloudinary.config({
            cloud_name: 'sample',
            api_key: '874837483274837',
            api_secret: 'a676b67565c6767a6767d6767f676fe1'
          });

          cloudinary.uploader.upload(coverPhotoPath, (result) => {
            console.log(result, '+++++++++++');
            this.setState({ isLoading: false });

            this.props.addBook(data);

            $('#add-books')
              .find('div button.btn[data-dismiss="modal"]')
              .trigger('click');

            this.props.addFlashMessage({
              type: 'success',
              text: data
            });
          });
        },
        (errors) => {
          this.setState({
            isLoading: false
          });
          this.props.addFlashMessage({
            type: 'error',
            text: errors.response.data
          });
        }
      );
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

    this.setState({ isLoading: false });

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
      this.setState({ documentPath: files[0] });
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
    const { showCoverBook, coverPhotoPath, documentPath } = this.state;

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
          <span className="hidden-xs-down">{documentPath ? 'Change' : 'Add'} file</span>
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
                      name="bookCategoryId"
                      value={this.state.bookCategoryId}
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
                      name="ISBN"
                      value={this.state.ISBN}
                      onChange={this.onChange} />
                  </div>
                  <div className="col-sm-6">
                    <InputField
                      label="Book url"
                      name="bookURL"
                      value={this.state.bookURL}
                      onChange={this.onChange} />
                  </div>
                  <div className="col-sm-6">
                    <InputField
                      label="Date published"
                      name="publishedDate"
                      value={this.state.publishedDate}
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
                  {documentPath && <div className="col-sm-7">
                    <Document
                      file={documentPath}
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
}

BooksModal.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  coverPhotoPath: state.cropper.coverPhotoPath
});

export default connect(mapStateToProps, { saveBooks, addFlashMessage, addBook, uploadBookCoverPhoto })(BooksModal);
