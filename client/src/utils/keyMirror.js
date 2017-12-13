/**
 * Mirrors array keys and returns an object
 *
 * @param {array} array
 *
 * @returns {object} mirrored keys and values
 */
const keyMirror = (array) => array.reduce((object, string) => {
  object[string] = string;
  return object;
}, {});

export default keyMirror;
