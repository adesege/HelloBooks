import URLPackage from 'url';
import md5 from 'md5';
import noCover from 'assets/images/no-cover.jpg';
import defaultAvatar from 'assets/images/user.png';

/**
 * Shows book cover photo or a default photo
 *
 * @param {string} coverPhoto - coverphoto url
 *
 * @returns {string} coverphoto url or default photo
 */
export const showCoverPhoto =
    coverPhoto =>
      coverPhoto || noCover;

/**
 * Checks whether string is a valid url
 *
 * @param {string} string - url
 *
 * @returns {boolean} true or false
 */
export const isValidUrl = (string) => {
  const urlRegex =
          '^(?:(?:http|https)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$'; // eslint-disable-line max-len
  const url = new RegExp(urlRegex, 'i');
  return string.length < 2083 && url.test(string);
};

/**
 * Gets and set public id from cloudinary url
 *
 * @param {string} url - url to get cloudinary url
 *
 * @returns {object} url object with public id
 */
export const parseCloudinaryURL = (url) => {
  let newUrl = {};
  newUrl.public_id = '';
  if (url && isValidUrl(url)) {
    newUrl = URLPackage.parse(url);
    const urlPath = newUrl.path.match(/.*\/(.*)\.+/);
    newUrl.public_id = urlPath ? urlPath[1] : '';
    return newUrl;
  }
  return newUrl;
};

/**
 * Check whether type is an image
 *
 * @param {string} type - image type
 *
 * @returns {boolean} true or false
 */
export const isImage = (type) => {
  if (/^image/.test(type)) {
    return true;
  }
  return false;
};

/**
 * Check whether type is a pdf
 *
 * @param {string} type - pdf type
 *
 * @returns {boolean} true or false
 */
export const isPDF = (type) => {
  if (/^application\/pdf/.test(type)) {
    return true;
  }
  return false;
};

/**
 * Extract query string from url
 *
 * @param {string} url - url to extract query string from
 *
 * @returns {object} query strings from url
 */
export const extractURLQuery = (url) => new URL(url).searchParams;

/**
 * Get user avatar from gravatar
 *
 * @param {string} email - user email
 *
 * @returns {string} user avatar
 */
export const userAvatar = (email) => {
  const hash = email ? md5(email) : '';
  return `https://www.gravatar.com/avatar/${hash}?s=100&d=identicon`;
};
