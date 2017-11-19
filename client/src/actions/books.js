import axios from 'axios';
import cloudinary from 'cloudinary';
import types from './types';
import { addFlashMessage } from './flashMessages';
import '../config/cloudinary';
import { parseCloudinaryURL } from '../utils';

const { API_VERSION } = window;

const {
  SET_BOOKS,
  BOOK_ADDED,
  BOOK_FETCHED,
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
        }
      );


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
    `/api/${API_VERSION}/books/${data.id}
        ?fields[]=coverPhotoPath&fields[]=documentPath`,
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
      .post(`/api/${API_VERSION}/books`, newData)
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
      .put(`/api/${API_VERSION}/books/${data.id}`, newData)
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
      .delete(`/api/${API_VERSION}/books/${data.id}`, data)
      .then((response) => {
        deletePhoto(parseCloudinaryURL(data.coverPhotoPath).public_id)
          .then(() =>
            deletePhoto(parseCloudinaryURL(data.documentPath).public_id)
              .then(() => {
                dispatch(bookDeleted(data));
                dispatch(addFlashMessage({
                  type: 'success',
                  text: response.data
                }));
                return response;
              })
              .catch(errors => errors))
          .catch(errors => errors);
      })
      .catch(errors =>
        dispatch(addFlashMessage({
          type: 'error',
          text: errors.response.data
        })));


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
