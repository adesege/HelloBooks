$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

var spanLoading='<span class="spanLoading"><i class="fa fa-spinner fa-spin"></i></span>';
$(document).ready(function(){
  /*$('.borrowBook').click(function(e){
    e.preventDefault();
    $(this).html(spanLoading);
  })*/

  $('#addMoreItem').click(function(e){
    var $stockTable=$(this).parents('table#stockTable'),
        $tbody=$stockTable.find('tbody'),
        $row=$tbody.find('tr:last'),
        $row_clone=$row.clone(),
        clone_num=parseInt($row_clone.find('th').html(),10),
        del_icon='<i class="fa fa-remove text-danger delete_row" data-toggle="tooltip" title="Delete row"></i>';
    $row_clone.map(function(i,el){
        $(el).find('th').html(clone_num+1);
        $(el).find('td:last').html(del_icon)
    });
    $tbody.append($row_clone);
    //console.log($row);
  });

  $('#stockTable').on('click','.delete_row', function(e){
    var $all_rows=$(this).parents('table#stockTable').find('tbody tr'),
        $row=$(this).parents('tr'),
        row_num=parseInt($row.find('th').html(),10),
        $next_rows=$all_rows.slice($row.index()+1);
        if($next_rows.length!=0){
          $next_rows.map(function(i,el){
            $(el).find('th').html(row_num++);
          });
        }
    $row.remove();
  });
});

$(function() {
  var $photoHolder=$('#imagefile'),
      $photoPreview=$('#image-cropper').find('.preview');
    $photoHolder.change(function(){
        var files = !!this.files ? this.files : [];
        if (!files.length || !window.FileReader) return; // no file selected, or no FileReader support
 
        if (/^image/.test( files[0].type)){ // only image file
            var reader = new FileReader(); // instance of the FileReader
            reader.readAsDataURL(files[0]); // read the local file
            reader.onloadend = function(){ // set image data as background of div
                $photoPreview.css("background-image", "url("+this.result+")");
				setTimeout(function(){
					$('#image-cropper').removeClass('hidden-xl-down');
				},'30');
            }
        }
    });
});

$(function() {
  var $docInput=$('#docfile'),
      $preview=$('#docpre');
    $docInput.change(function(){
        var files = !!this.files ? this.files : [];
        if (!files.length || !window.FileReader) return; // no file selected, or no FileReader support
            console.log(files[0])
            $preview.html(files[0].name).addClass('mt-3')
    });
});

function triggerUpload(elem){
document.getElementById(elem).click(); 
}

function toggleSideNav(that){
  //$('#sidebar ul').toggle('hide');
}

function closeNav(that){
  $(that).parents('#sidebar').removeClass('show');
}