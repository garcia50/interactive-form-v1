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
