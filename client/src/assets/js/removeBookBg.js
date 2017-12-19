/**
 * Removes background image from DOM body
 *
 * @returns {undefined}
 */
export default () =>
  document.getElementsByTagName('body')[0]
    .classList.remove('bg-books');
