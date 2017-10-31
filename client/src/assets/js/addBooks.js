import triggerUpload from './script';

const { $ } = window;

$('body').on('click', '#triggerUpload', (e) => {
  triggerUpload('imagefile');
});

$('body').on('click', '#triggerUploadDoc', (e) => {
  triggerUpload('docfile');
});

$(() => {
  const $photoHolder = $('#imagefile');
  const $photoPreview = $('#image-cropper').find('.preview');
  $photoHolder.change(function () { // eslint-disable-line func-names
    const files = this.files ? this.files : [];
    // no file selected, or no FileReader support
    if (!files.length || !window.FileReader) return;

    if (/^image/.test(files[0].type)) { // only image file
      const reader = new FileReader(); // instance of the FileReader
      reader.readAsDataURL(files[0]); // read the local file
      reader.onloadend = function () { // eslint-disable-line func-names
        $photoPreview.css('background-image', `url(${this.result})`);
        setTimeout(() => {
          $('#image-cropper').removeClass('hidden-xl-down');
        }, '30');
      };
    }
  });
});

$(() => {
  const $docInput = $('#docfile');
  const $preview = $('#docpre');
  $docInput.change(function () { // eslint-disable-line func-names
    const files = this.files ? this.files : [];
    // no file selected, or no FileReader support
    if (!files.length || !window.FileReader) return;
    $preview.html(files[0].name).addClass('mt-3');
  });
});
