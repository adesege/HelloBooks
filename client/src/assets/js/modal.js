/**
 * Trigger an element on click
 *
 * @param {object} event - event handler
 * @param {string} target - target to hidden input file element
 *
 * @returns {undefined}
 */
export const onClickOpenBookCover = (event, target) => {
  event.preventDefault();
  document.getElementById(`${target}`).click();
};

export default{};

