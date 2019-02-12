// const nameField = $('#name');
const $otherTitle = $('<input type="text" id="other-title" placeholder="Your Job Role">');



$('#name').focus();



$('#title').on('change', function(e){
  if (e.target.value === 'other') {
    $(this).parent().append($otherTitle);
    $('#other-title').show();
  } else {
    $('#other-title').hide();
  }
});


$('#design').on('change', function(e){
  $('#color option').show();
  if (e.target.value == 'js puns') {
    $('#color option').filter(':eq(3), :eq(4), :eq(5)').hide();
    $('#color>option:eq(0)').prop('selected', true);
  } else if (e.target.value == 'heart js') {
    $('#color option').filter(':eq(0), :eq(1), :eq(2)').hide();
    $('#color>option:eq(3)').prop('selected', true);
  } else {
    $('#color option').show();
    $('#color>option:eq(0)').prop('selected', true);
  }
});