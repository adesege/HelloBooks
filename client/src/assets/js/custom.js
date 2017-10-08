const $ = window.$;

$('body').on('click', '.closeBtn', function (e) { // eslint-disable-line func-names
  $(this).parents('#sidebar').removeClass('show');
});
