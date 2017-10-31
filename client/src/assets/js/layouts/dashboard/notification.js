const { $ } = window;

const notiHolder = $('#notificationHolder');
$('body').on('mouseenter', '#notificationInfo', (e) => {
  notiHolder.show();
});

$('body').on('click', (e) => {
  notiHolder.hide();
});
