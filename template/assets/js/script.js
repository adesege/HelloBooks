$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

var spanLoading='<span class="spanLoading"><i class="fa fa-spinner fa-spin"></i></span>';
$(document).ready(function(){
  $('.borrowBook').click(function(e){
    e.preventDefault();
    $(this).html(spanLoading);
  })
})
