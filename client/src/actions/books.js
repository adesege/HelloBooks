import axios from 'axios';
import cloudinary from 'cloudinary';
import types from './types';
import { addFlashMessage } from './flashMessages';
import { parseCloudinaryURL } from '../utils';
import '../config/cloudinary';

const {
  SET_BOOKS,
  BOOK_ADDED,
  BOOK_UPDATED,
  BOOK_DELETED,
  BOOKS_SEARCHED
} = types;

/**
 * Action creator for searching books
 *
 * @export
 *
 * @param {array} result - search result array
 *
 * @returns {object} Search book action creator
*/
export const booksSearched = result => ({
  type: BOOKS_SEARCHED,
  result
});

/**
 * Action creator for setting a book in the store
 * after a network request
 *
 * @export
 *
 * @param {array} books - books array
 *
 * @returns {object} action creator
*/
export const setBooks = books => ({
  type: SET_BOOKS,
  ...books
});

/**
 * Action creator for deleting a book
 *
 * @export
 *
 * @param {object} book - deleted book object
 *
 * @returns {object} action creator
*/
export const bookDeleted = book => ({
  type: BOOK_DELETED,
  bookId: book.id
});

/**
 * Action creator for adding a book in the store
 *
 * @return {object} action creator
 *
 * @param {object} book - new book object
*/
export const bookAdded = book => ({
  type: BOOK_ADDED,
  book
});


/**
 * Action Creator for setting store
 * when book has been editted
 *
 * @export
 *
 * @param {object} book - updated book object
 *
 * @returns  {object} action creator
*/
export const bookUpdated = book => ({
  type: BOOK_UPDATED,
  book
});


/**
 * Make network request to get all book or a particular book
 *
 * @export
 *
 * @param {object} options - options to get all books
 *
 * @returns {object} Axios success response object
 * @returns {object} Axios error response object
*/
export const getBooks = (options) =>
  dispatch => {
    const searchQuery = options ? new URLSearchParams(options) : null;
    const toQueryString = options ? searchQuery.toString() : '';
    const id = options && options.id ? options.id : '';
    return axios
      .get(`books/${id}?${toQueryString}`)
      .then(
        (response) => {
          dispatch(setBooks({
            books: response.data.books,
            pagination: response.data.pagination
          }));
        },
        (errors) => {
          dispatch(addFlashMessage({
            type: 'error',
            text: errors.response.data.message
          }));
          return errors;
        }
      );
  };

/**
 * Upload cover photo to cloudinary
 *
 * @param {string} imageData - image data uri
 *
 * @returns {promise} Resolve promise of imageData is not type image
 * @returns {promise} Reject promise
 * if there is an error uploading to cloudinary
 * @returns {promise} Resolve promise if imageData is successfully uploaded
*/
export const uploadCoverPhoto = imageData => {
  if (!imageData.match(/^data:image/)) {
    return Promise.resolve({});
  }
  return cloudinary
    .v2.uploader.upload(
      imageData,
      {
        crop: 'limit',
        width: 250,
        height: 435,
        eager: [
          {
            width: 125,
            height: 218,
            crop: 'fill',
            format: 'jpg'
          }
        ]
      },
      (error, result) => {
        if (error) {
          return Promise
            .reject(new Error('There was an error uploading this cover photo'));
        }
        return Promise.resolve(result);
      }
    );
};

/**
 * Upload book file to cloudinary
 *
 * @param {string} fileData - file data uri
 *
 * @returns {promise} Resolve promise of fileData is not type pdf
 * @returns {promise} Reject promise
 * if there is an error uploading to cloudinary
 * @returns {promise} Resolve promise if fileData is successfully uploaded
*/
export const uploadBookFile = fileData => {
  if (!fileData.match(/^data:application\/pdf/)) {
    return Promise.resolve({});
  }
  return cloudinary
    .v2.uploader.upload(
      fileData,
      (error, result) => {
        if (error) {
          return Promise
            .reject(new Error('There was an error uploading this document'));
        }
        return Promise.resolve(result);
      }
    );
};

/**
 * Delete photo from cloudinary
 *
 * @param {string} publicId - cloudinary public id
 *
 * @returns {promise} Reject promise
 * if there is an error deleting from cloudinary
 * @returns {promise} Resolve promise if photo has been deleted
*/
export const deletePhoto = publicId => {
  if (publicId) {
    return cloudinary.v2.uploader.destroy(
      publicId,
      (error, result) => {
        if (error) {
          const throwError =
          new Error('An error was encountered deleting this resource.');
          return Promise
            .reject(throwError);
        }
        return Promise.resolve(result);
      }
    );
  }
  return Promise.resolve();
};

/**
 * Update coverphoto and book file link
 *
 * @export
 *
 * @param {object} options - options for updating book cover and file
 *
 * @returns {promise} promise
*/
export const updateBookCoverFile = options =>
  axios
    .put(
      `books/${options.id}?fields[]=coverPhotoPath&fields[]=documentPath`,
      options
    );

/**
 * Upload coverphoto and document file to cloudinary
 *
 * @param {object} assetObject - image and file data
 *
 * @returns {promise} Resolve promise
 * if coverphoto and document file has been uploaded
 * @returns {promise} Reject promise
 * if coverphoto and document file can't be uploaded
*/
export const uploadBookAsset = (assetObject) =>
  uploadCoverPhoto(assetObject.imageData)
    .then((photo) =>
      uploadBookFile(assetObject.fileData)
        .then((document) =>
          Promise.resolve({
            coverPhotoPath: photo.secure_url,
            documentPath: document.secure_url
          }))
        .catch(error => Promise.reject(error.message)))
    .catch(error => Promise.reject(error.message));

/**
 * Make network request to add book
 *
 * @param {object} options - options for adding book
 *
 * @returns {object} Axios http success response object
 * @returns {object} Axios http error response object
*/
export const addBook = options =>
  (dispatch) => {
    const imageData = options.coverPhotoPath;
    const fileData = options.documentPath;
    const newOptions = {
      ...options,
      coverPhotoPath: '',
      documentPath: ''
    };
    return axios
      .post(`books`, newOptions)
      .then(response =>
        uploadBookAsset({
          imageData,
          fileData
        })
          .then((assets) => updateBookCoverFile({
            id: response.data.id,
            coverPhotoPath: assets.coverPhotoPath,
            documentPath: assets.documentPath
          })
            .then(updatedResponse => {
              dispatch(bookAdded(updatedResponse.data.book));
              return response;
            })
            .catch(errors => errors))
          .catch(failed => failed));
  };

/**
 * Make network request to edit a book
 *
 * @export
 *
 * @param {object} options - options for editing book
 *
 * @returns {promise} axios http promise
*/
export const updateBook = options =>
  (dispatch) => {
    const imageData = options.coverPhotoPath;
    const fileData = options.documentPath;
    const { oldDocumentURL, oldImageURL } = options;
    const newOptions = {
      ...options,
      coverPhotoPath: '',
      documentPath: ''
    };
    return axios
      .put(`books/${options.id}`, newOptions)
      .then((response) => uploadBookAsset({
        imageData,
        fileData
      }, {
        imageData: parseCloudinaryURL(oldImageURL),
        fileData: parseCloudinaryURL(oldDocumentURL)
      })
        .then((success) =>
          dispatch(updateBookCoverFile({
            id: response.data.book.id,
            coverPhotoPath: success.coverPhotoPath || oldImageURL,
            documentPath: success.documentPath || oldDocumentURL
          })
            .then((updatedBook) => {
              dispatch(bookUpdated(updatedBook.data.book));
              dispatch(addFlashMessage({
                type: 'success',
                text: response.data.message
              }));
            })
            .catch(errors => errors)))
        .catch(failed => failed))
      .catch(errors => errors);
  };

/**
 * Make network request to delete a book
 *
 * @export
 *
 * @param {object} options - options for deleting book
 *
 * @returns {promise} Axios http promise
*/
export const deleteBook = options =>
  dispatch =>
    axios
      .delete(`books/${options.id}`, options)
      .then((response) => {
        deletePhoto(parseCloudinaryURL(options.coverPhotoPath).public_id)
          .then(() =>
            deletePhoto(parseCloudinaryURL(options.documentPath).public_id)
              .then(() => {
                dispatch(bookDeleted(options));
                dispatch(addFlashMessage({
                  type: 'success',
                  text: response.data.message
                }));
                return response;
              })
              .catch(errors => errors))
          .catch(errors => errors);
      })
      .catch(errors =>
        dispatch(addFlashMessage({
          type: 'error',
          text: errors.response.data.message
        })));


/**
 * Make network request to search a book
 *
 * @export
 *
 * @param {string} title - title of the book to search for
 *
 * @returns {promise} Axios http promise
*/
export const searchBooks = title =>
  dispatch =>
    axios
      .get(`search?q=${encodeURIComponent(title)}&type=books`)
      .then(
        (response) => {
          dispatch(booksSearched(response.data.books));
          return response;
        },
        errors => dispatch(addFlashMessage({
          type: 'error',
          text: errors.response.data.message
        }))
      );
