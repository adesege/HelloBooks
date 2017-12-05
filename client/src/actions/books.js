import axios from 'axios';
import cloudinary from 'cloudinary';
import types from './types';
import { addFlashMessage } from './flashMessages';
import '../config/cloudinary';
import { parseCloudinaryURL } from '../utils';

const {
  SET_BOOKS,
  BOOK_ADDED,
  BOOK_UPDATED,
  BOOK_DELETED,
  BOOKS_SEARCHED
} = types;

export const booksSearched = result => ({
  type: BOOKS_SEARCHED,
  result
});


export const setBooks = books => ({
  type: SET_BOOKS,
  ...books
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


export const bookAdded = book =>
  ({
    type: BOOK_ADDED,
    book
  });


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
 * @param {object} data
 * @returns {func} promise
 */
export const getBooks = (data) =>
  dispatch => {
    const searchQuery = data ? new URLSearchParams(data) : null; // converts an object to query string
    const toQueryString = data ? searchQuery.toString() : ''; // converts it to string
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

export const deletePhoto = publicId => {
  if (publicId) {
    return cloudinary.v2.uploader.destroy(
      publicId,
      (error, result) => {
        if (error) {
          return Promise.reject(new Error('An error was encountered deleting this resource.'));
        }
        return Promise.resolve(result);
      }
    );
  }
  return Promise.resolve();
};

/**
 * @export
 * @param {any} data
 * @returns {func} promise
 */
export const updateBookCoverFile = data => axios
  .put(
    `books/${data.id}?fields[]=coverPhotoPath&fields[]=documentPath`,
    data
  );

export const uploadBookAsset = (assetObject, publicIDs) =>
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
 * @returns {Promise} response promise
 * @param {object} data
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
            .catch(errors => Promise.reject(errors)))
          .catch(failed => Promise
            .reject(failed)));
  };

/**
 * @export
 * @param {any} data
 * @returns {func} promise
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
        .catch(failed => Promise
          .reject(failed)))
      .catch(errors => errors);
  };

/**
 * @export
 * @param {any} data
 * @returns {func} promise
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
 * @export
 * @param {any} title
 * @returns {Promise} Response promise
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
