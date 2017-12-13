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
 * @param {object} result
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
 * @param {object} books
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
 * @param {object} book
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
 * @param {object} book
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
 * @param {object} book
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
 * @param {object} data
 *
 * @returns {object} Axios success response object
 * @returns {object} Axios error response object
*/
export const getBooks = (data) =>
  dispatch => {
    const searchQuery = data ? new URLSearchParams(data) : null;
    const toQueryString = data ? searchQuery.toString() : '';
    const id = data && data.id ? data.id : '';
    return axios
      .get(`books/${id}?${toQueryString}`)
      .then(
        (response) => {
          dispatch(setBooks({
            books: response.data.data,
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
 * @param {string} imageData
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
 * @param {string} fileData
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
 * @param {string} publicId
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
 * @param {object} data
 *
 * @returns {promise} promise
*/
export const updateBookCoverFile = data =>
  axios
    .put(
      `books/${data.id}?fields[]=coverPhotoPath&fields[]=documentPath`,
      data
    );

/**
 * Upload coverphoto and document file to cloudinary
 *
 * @param {object} assetObject
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
 * @param {object} data
 *
 * @returns {object} Axios http success response object
 * @returns {object} Axios http error response object
*/
export const addBook = data =>
  (dispatch) => {
    const imageData = data.coverPhotoPath;
    const fileData = data.documentPath;
    const newData = {
      ...data,
      coverPhotoPath: '',
      documentPath: ''
    };
    return axios
      .post(`books`, newData)
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
 * @param {object} data
 *
 * @returns {promise} axios http promise
*/
export const updateBook = data =>
  (dispatch) => {
    const imageData = data.coverPhotoPath;
    const fileData = data.documentPath;
    const { oldDocumentURL, oldImageURL } = data;
    const newData = {
      ...data,
      coverPhotoPath: '',
      documentPath: ''
    };
    return axios
      .put(`books/${data.id}`, newData)
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
 * @param {object} data
 *
 * @returns {promise} Axios http promise
*/
export const deleteBook = data =>
  dispatch =>
    axios
      .delete(`books/${data.id}`, data)
      .then((response) => {
        deletePhoto(parseCloudinaryURL(data.coverPhotoPath).public_id)
          .then(() =>
            deletePhoto(parseCloudinaryURL(data.documentPath).public_id)
              .then(() => {
                dispatch(bookDeleted(data));
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
 * @param {string} title
 *
 * @returns {promise} Axios http promise
*/
export const searchBooks = title =>
  dispatch =>
    axios
      .get(`search?q=${encodeURIComponent(title)}&type=books`)
      .then(
        (response) => {
          dispatch(booksSearched(response.data.data));
          return response;
        },
        errors => errors
      );
