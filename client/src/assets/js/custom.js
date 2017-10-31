const { $ } = window;

$('body').on('click', '.closeBtn', function (e) {
  $(this).parents('#sidebar').removeClass('show');
});

$('body').on('click', '.editProfile', (e) => {
  $('#editProfile').toggleClass('hidden-xl-down');
});

$('body').on('click', '.changePassword', (e) => {
  $('#changePassword').toggleClass('hidden-xl-down');
});
