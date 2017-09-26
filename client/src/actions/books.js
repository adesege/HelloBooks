import axios from 'axios';
import cloudinary from 'cloudinary';
import types from './types';
import { addFlashMessage } from './flashMessages';
import '../config/cloudinary';
import { parseCloudinaryURL } from '../utils';

const API_VERSION = window.API_VERSION;
const {
  SET_BOOKS,
  BOOK_ADDED,
  BOOK_FETCHED,
  BOOK_UPDATED,
  BOOK_DELETED,
  BOOKS_SEARCHED } = types;

export const booksSearched = result => ({
  type: BOOKS_SEARCHED,
  result
});


export const setBooks = books => ({
  type: SET_BOOKS,
  books
});

/**
 * @export
 * @param {any} bookId 
 * @returns  {object} book action
 */
export const bookDeleted = bookId => ({
  type: BOOK_DELETED,
  bookId: bookId.id
});

/**
 * @export
 * @param {any} book 
 * @returns  {object} book action
 */
export const bookFetched = book => ({
  type: BOOK_FETCHED,
  book
});

export const bookAdded = book =>
  ({
    type: BOOK_ADDED,
    book
  })
;


/**
 * @export
 * @param {any} book 
 * @returns  {object} bookUpdated Payload
 */
export const bookUpdated = book => ({
  type: BOOK_UPDATED,
  book
});


/**
 * @export
 * @returns {func} promise
 */
export const getBooks = () =>
  dispatch =>
    axios.get(`/api/${API_VERSION}/books`)
      .then(
        (data) => {
          dispatch(setBooks(data.data.data));
        },
        (errors) => {
          dispatch(addFlashMessage({
            type: 'error',
            text: errors.response.data
          }));
          return errors;
        });


/**
 * @export
 * @param {any} data 
 * @returns {func} promise
 */
export const getBook = data =>
  dispatch =>
    axios
      .get(`/api/${API_VERSION}/books/${data.id}`)
      .then(
        (book) => {
          dispatch(bookFetched(book.data.data));
        },
        errors => errors
      );

export const uploadCoverPhoto = imageData =>
  cloudinary.v2.uploader.upload(
    imageData,
    {
      crop: 'limit',
      width: 250,
      height: 435,
      eager: [
        { width: 125,
          height: 218,
          crop: 'fill',
          format: 'jpg' }
      ]
    },
    (error, result) => {
      if (error) {
        return Promise.reject(false);
      }
      return Promise.resolve(result);
    });

export const deletePhoto = publicId =>
  cloudinary.v2.uploader.destroy(
    publicId,
    (error, result) => {
      if (error) {
        return Promise.reject(false);
      }
      return Promise.resolve(result);
    });

export const addBook = data =>
  (dispatch) => {
    const imageData = data.coverPhotoPath;
    const newData = { ...data, coverPhotoPath: '' };
    if (imageData) {
      return axios
        .post(`/api/${API_VERSION}/books`, newData)
        .then(
          response =>
            uploadCoverPhoto(imageData)
              .then(
                (success) => {
                  dispatch(
                    updateBookCover({
                      id: response.data.id,
                      coverPhotoPath: success.secure_url
                    })).then(
                    (updateResponse) => {
                      dispatch(bookAdded(updateResponse.data.book));
                    },
                    errors => Promise.reject(errors)
                  );
                  return response;
                }).catch(
                failed =>
                  Promise
                    .reject('There was an error uploading this cover photo')),
          errors => Promise
            .reject(errors)
        );
    }
    return Promise
      .reject('Please choose a cover photo to upload');
  };

/**
 * @export
 * @param {any} data 
 * @returns {func} promise
 */
export const updateBookCover = data =>
  dispatch =>
    axios
      .put(`/api/${API_VERSION}/books/${data.id}?fields[]=coverPhotoPath`,
        data);

/**
 * @export
 * @param {any} data 
 * @returns {func} promise
 */
export const updateBook = data =>
  (dispatch) => {
    const imageData = data.coverPhotoPath;
    if (data.coverPhotoPath.match(/^data:image/)) {
      delete data.coverPhotoPath;
    }
    if (imageData) {
      return axios.put(`/api/${API_VERSION}/books/${data.id}`, data)
        .then(
          (response) => {
            if (imageData.match(/^data:image/)) {
              return uploadCoverPhoto(imageData)
                .then(
                  (success) => {
                    if (data.oldImageURL) {
                      dispatch(deletePhoto(
                        parseCloudinaryURL(data.oldImageURL).public_id)
                      );
                    }
                    dispatch(updateBookCover({
                      id: data.id,
                      coverPhotoPath: success.secure_url
                    }))
                      .then(
                        (updatedBook) => {
                          dispatch(bookUpdated(updatedBook.data.book));
                          dispatch(addFlashMessage({
                            type: 'success',
                            text: response.data
                          }));
                        },
                        errors => errors
                      );
                  }
                ).catch(
                  failed => Promise
                    .reject('There was an error uploading this cover photo'));
            }
            dispatch(bookUpdated(response.data.book));
            dispatch(addFlashMessage({
              type: 'success',
              text: response.data
            }));
          },
          errors => errors);
    }
    return Promise
      .reject('Please choose a cover photo to upload');
  };

/**
 * @export
 * @param {any} data 
 * @returns {func} promise
 */
export const deleteBook = data =>
  dispatch =>
    axios
      .delete(`/api/${API_VERSION}/books/${data.id}`, data)
      .then(
        (response) => {
          dispatch(bookDeleted(data));
          dispatch(addFlashMessage({
            type: 'success',
            text: response.data
          }));
          return response;
        },
        errors => errors
      );


/**
 * @export
 * @param {any} title 
 * @returns {func} promise
 */
export const searchBooks = title =>
  dispatch =>
    axios
      .get(`/api/${API_VERSION}/search?q=${encodeURIComponent(title)}&type=books`)
      .then(
        (response) => {
          dispatch(booksSearched(response.data.data));
          return response;
        },
        errors => errors
      );
