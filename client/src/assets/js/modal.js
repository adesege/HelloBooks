/**
 * Trigger an element on click
 *
 * @param {object} event
 * @param {string} target
 *
 * @returns {undefined}
 */
export const onClickOpenBookCover = (event, target) => {
  event.preventDefault();
  document.getElementById(`${target}`).click();
};

export default{};

