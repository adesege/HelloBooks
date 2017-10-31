const { $ } = window;

export const openModal = (modalId) => {
  $('body').on('click', `#${modalId}-btn`, (e) => {
    $(`#${modalId}`).modal('show');
  });
};

export const closeModal = (modalId) => {
  const $modal = $(`#${modalId}`);
  const $closeBtn = $modal.find('div button.btn[data-dismiss="modal"]');
  $closeBtn.attr('isClicked', false);
  $('html, body').on('click', $closeBtn, (e) => {
    e.preventDefault();
    $closeBtn.attr('isClicked', true);
  });

  if (!$closeBtn.attr('isClicked')) {
    $modal.modal('hide');
  }
};

export const closeCustomModal = (modalId) => {
  $(modalId)
    .find('div button.btn[data-dismiss="modal"]')
    .trigger('click');
};

export const onClickOpenBookCover = (event) => {
  event.preventDefault();
  const $parent = $(event.target).parents('span').attr('target');
  const $target = $(`#${$parent}`);
  $target.click();
};

