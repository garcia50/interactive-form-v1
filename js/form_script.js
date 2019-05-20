const $otherTitle = $('<input type="text" id="other-title" placeholder="Your Job Role">');
var amount = 0
const chosenEvents = []

const activityCost = (amount) => {
  $(".activities #total").remove();
  
  $total = $(`<label id="total">Total: ${amount} </label>`)

  amount === 0 ? $('#total').hide() : $('.activities').append($total);
}

$('#name').focus();
$('#colors-js-puns').hide();

$('#title').on('change', function(e){
  if (e.target.value === 'other') {
    $(this).parent().append($otherTitle);
    $('#other-title').show();
  } else {
    $('#other-title').hide();
  }
});

$('#design').on('change', function(e){
  $('#colors-js-puns').show();
  $('#color option').show();
  if (e.target.value == 'js puns') {
    $('#color option').filter(':eq(3), :eq(4), :eq(5)').hide();
    $('#color option:eq(0)').prop('selected', true);
  } else if (e.target.value == 'heart js') {
    $('#color option').filter(':eq(0), :eq(1), :eq(2)').hide();
    $('#color option:eq(3)').prop('selected', true);
  } else {
    $('#colors-js-puns').hide();
  }
});

$('.activities input').on('change', function(e) {
  $('input[type="checkbox"]:checked').length > 0 ? $('#total').show() : $('#total').hide();

  //A user unchecks a checkbox and/or has interference with another checked box
  if (e.target.name === 'all' && e.target.checked === false) {
    chosenEvents.splice(chosenEvents.indexOf(e.target.name));
    amount -= 200;
  } else if (e.target.checked === false && !e.target.checked === false) {
    chosenEvents.splice(chosenEvents.indexOf(e.target.name));
    amount -= 100;
  } else if (e.target.checked === false) {
    chosenEvents.splice(chosenEvents.indexOf(e.target.name));
    amount -= 100;
  }

  //A user checks a box and/or has interference with another checked box
  if (e.target.name === 'all' && e.target.checked === true) {
    chosenEvents.push(e.target.name);
    amount += 200;
  } else if ((chosenEvents.indexOf("js-frameworks") > -1) && (e.target.name === "express")) {
      alert("You already have a work shop selected for that time.");
      $('input[name="express"]').parent().hide();
      e.target.checked = false;
  } else if ((e.target.name === "js-frameworks") && (e.target.checked === false)) {
      $('input[name="express"]').parent().show();
  } else if ((chosenEvents.indexOf("express") > -1) && (e.target.name === "js-frameworks")) {
      alert("You already have a work shop selected for that time.");
      $('input[name="js-frameworks"]').parent().hide();
      e.target.checked = false;
  } else if ((e.target.name === "express") && (e.target.checked === false)) {
      $('input[name="js-frameworks"]').parent().show();
  } else if ((chosenEvents.indexOf("js-libs") > -1) && (e.target.name === "node")) {
      alert("You already have a work shop selected for that time.");
      $('input[name="node"]').parent().hide();
      e.target.checked = false;
  } else if ((e.target.name === "js-libs") && (e.target.checked === false)) {
      $('input[name="node"]').parent().show();
  } else if ((chosenEvents.indexOf("node") > -1) && (e.target.name === "js-libs")) {
      alert("You already have a work shop selected for that time.");
      $('input[name="js-libs"]').parent().hide();
      e.target.checked = false;
  } else if ((e.target.name === "node") && (e.target.checked === false)) {
      $('input[name="js-libs"]').parent().show();
  } else if (e.target.checked === true) {
    chosenEvents.push(e.target.name);
    amount += 100;
  }

  activityCost(amount);
});


$('select option[value="credit card"]').attr("selected",true);

const fieldsets = $('form fieldset').get();
$(fieldsets[3].children[4]).css('display', 'none');
$(fieldsets[3].children[5]).css('display', 'none');

const paymentOptions = $('#payment option').get();

$('#payment').on('change', function(e) {
  $(fieldsets[3]).find('div').css('display', 'none');

  if (e.target.value === paymentOptions[1].value) {
    $(fieldsets[3]).find('div').css('display', 'block');
    $(fieldsets[3].children[4]).css('display', 'none');
    $(fieldsets[3].children[5]).css('display', 'none');
    } else if (e.target.value === paymentOptions[2].value) {
      $(fieldsets[3].children[4]).css('display', 'block');
      $(fieldsets[3]).find($('.credit-card')).css('display', 'none');
    } else if (e.target.value === paymentOptions[3].value) {
      $(fieldsets[3].children[5]).css('display', 'block');
      $(fieldsets[3]).find($('.credit-card')).css('display', 'none');
    }
});


$(fieldsets[0].children[1]).append('<span class="nameError" style="color: red;">   name required</span>');
$(fieldsets[0].children[3]).append('<span class="emailError" style="color: red;">   email required</span>');
$(fieldsets[2].children[0]).append('<span class="activityError" style="color: red;">   acitivity required</span>');
$(fieldsets[3].children[3].children[0].children[0]).append('<span class="cardError" style="color: red;"> required</span>');
$(fieldsets[3].children[3].children[1].children[0]).append('<span class="zipError" style="color: red;"> required</span>');
$(fieldsets[3].children[3].children[2].children[0]).append('<span class="cvvError" style="color: red;"> required</span>');
$('.nameError').hide();
$('.emailError').hide();
$('.activityError').hide();
$('.cardError').hide();
$('.zipError').hide();
$('.cvvError').hide();

const formValidation = (e) => {
  $('.nameError').hide();
  $('.emailError').hide();
  $('.activityError').hide();
  $('.cardError').hide();
  $('.zipError').hide();
  $('.cvvError').hide();

  $(fieldsets[0].children[2]).css('border', 'none');
  $(fieldsets[0].children[4]).css('border', 'none');
  $(fieldsets[3].children[3].children[0].children[1]).css('border', 'none');
  $(fieldsets[3].children[3].children[1].children[1]).css('border', 'none');
  $(fieldsets[3].children[3].children[2].children[1]).css('border', 'none');

  var count = $('input[type="checkbox"]:checked').length;
  var ccNum = $('#cc-num')[0].value;
  var zip = $('#zip')[0].value;
  var cvv = $('#cvv')[0].value;
  var name = $(fieldsets[0]).find('input[type="text"]')[0].value;
  var email_regex = /^.+@[^\.].*\.[a-z]{2,}$/;
  var email = $(fieldsets[0]).find('input[type="email"]')[0].value;
  var ccNum_regex = /^[0-9]{13,16}$/;
  var zip_regex = /^[0-9]{5}$/;
  var cvv_regex = /^[0-9]{3}$/;

  if (name.length < 3) {
    $('.nameError').show();
    $(fieldsets[0].children[2]).css('border', '2px solid red');
    alert("Please type your full name");
    return false;
  }
  if (!email.match(email_regex) || email.length == 0) {
    $('.emailError').show();
    $(fieldsets[0].children[4]).css('border', '2px solid red');
    alert("Please enter a valid email address");
    return false;
  }
  if (count <= 0) {
    $('.activityError').show();
    alert("Please choose at least one activity");
    return false
  }
  if ($('#payment').get()[0].value === "credit card") { 
    if (!ccNum.match(ccNum_regex)) {
      $('.cardError').show();
      $(fieldsets[3].children[3].children[0].children[1]).css('border', '2px solid red');
      alert("Please enter your valid credit card number");
    }
    if (!zip.match(zip_regex)) {
      $('.zipError').show();
      $(fieldsets[3].children[3].children[1].children[1]).css('border', '2px solid red');
      alert("Please enter a valid zipcode");
    }
    if (!cvv.match(cvv_regex)) {
      $('.cvvError').show();
      $(fieldsets[3].children[3].children[2].children[1]).css('border', '2px solid red');
      alert("Please enter the cvv");
    }
  }
}

$('button').on('click', function(e) {
  formValidation(e);
  e.preventDefault();
})


















