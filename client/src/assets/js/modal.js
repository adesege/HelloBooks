export const onClickOpenBookCover = (event, target) => {
  event.preventDefault();
  document.getElementById(`${target}`).click();
};

export default{};

