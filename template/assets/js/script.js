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
})

$(document).ready(function() {
    $('#stockTable').DataTable();
} );