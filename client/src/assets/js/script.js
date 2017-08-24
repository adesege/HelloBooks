import $ from 'jquery';


export default function triggerUpload(elem) { // eslint-disable-line require-jsdoc
  document.getElementById(elem).click();
}

$(() => {
  $('[data-toggle="tooltip"]').tooltip();
});

export const spanLoading = '<span class="spanLoading"><i class="fa fa-spinner fa-spin"></i></span>';
