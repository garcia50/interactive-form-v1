//Declare variables
var amount = 0
var num = 0
var validate;
const chosenEvents = []
const $otherTitle = $('<input type="text" id="other-title" placeholder="Your Job Role">');
const fieldsets = $('form fieldset').get();
const paymentOptions = $('#payment option').get();

//Responsible for removing, creating and displaying the total during activity selection process
const activityCost = (amount) => {
  $(".activities #total").remove();
  $total = $(`<label id="total">Total: ${amount} </label>`)
  amount === 0 ? $('#total').hide() : $('.activities').append($total);
}

//Manipulating display settings for better UX
$('#name').focus();
$('#other-title').hide();
$('#colors-js-puns').hide();
$('select option[value="credit card"]').attr("selected",true);
$(fieldsets[3].children[4]).css('display', 'none');
$(fieldsets[3].children[5]).css('display', 'none');

//Maniulating display settings base upon selection of 'other' job role
$('#title').on('change', function(e){
  if (e.target.value === 'other') {
    $('#other-title').show();
  } else {
    $('#other-title').hide();
  }
});

//*********Extra Credit
//Maniulating display settings base upon selection of T-Shirt Design 
$('#design').on('change', function(e){
  $('#colors-js-puns').show();
  $('#color option').show();
  //Using if statements to help UX and filter options
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

//Ensure's that a user doesn't not overlap and/or purchases workshops that may interfere with date and time
$('.activities input').on('change', function(e) {
  $('input[type="checkbox"]:checked').length > 0 ? $('#total').show() : $('#total').hide();
  //Seperates responsibility of selection and total price for a user when checking or unchecking the 'Main Conference' checkbox
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
  //Seperates responsibility of selection and total price for a user when checking or unchecking the other activities' checkbox
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
  //Sends total amount to the activity function to be displayed (or not)
  activityCost(amount);
});

//Maniulating display settings base upon selection of how the user chooses to pay
$('#payment').on('change', function(e) {
  //First hide the entire 'Payment Info'
  $(fieldsets[3]).find('div').css('display', 'none');
  //Use if statement to display info depending on what payement option the user chooses 
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

//Creating and adding all the validation 'pop-up' alerts to the corresponding locations
$(fieldsets[0].children[1]).append('<span class="nameError" style="color: red;">   name required</span>');
$(fieldsets[0].children[3]).append('<span class="emailError" style="color: red;">   email required</span>');
$(fieldsets[2].children[0]).append('<span class="activityError" style="color: red;">   acitivity required</span>');
$(fieldsets[3].children[3].children[0].children[0]).append('<span class="cardError" style="color: red;"> required</span>');
$(fieldsets[3].children[3].children[1].children[0]).append('<span class="zipError" style="color: red;"> required</span>');
$(fieldsets[3].children[3].children[2].children[0]).append('<span class="cvvError" style="color: red;"> required</span>');
//Immediately hide the error 'pop-up's (validations) after appending them to the corresponding locations
$('.nameError').hide();
$('.emailError').hide();
$('.activityError').hide();
$('.cardError').hide();
$('.zipError').hide();
$('.cvvError').hide();

//Validation form
//Validate all the neccessary information to register a user 
const formValidation = (e) => {
  //set a 'validate' variable to true; it will later sereve as our rule whether or not we can approve a user's information 
  validate = true;
  //Hide the error 'pop-up's (validations) after the validations are checked
  $('.nameError').hide();
  $('.emailError').hide();
  $('.activityError').hide();
  $('.cardError').hide();
  $('.zipError').hide();
  $('.cvvError').hide();
  //Hide the error red border after the validations are checked
  $(fieldsets[0].children[2]).css('border', 'none');
  $(fieldsets[0].children[4]).css('border', 'none');
  $(fieldsets[3].children[3].children[0].children[1]).css('border', 'none');
  $(fieldsets[3].children[3].children[1].children[1]).css('border', 'none');
  $(fieldsets[3].children[3].children[2].children[1]).css('border', 'none');

  //Declare variables that will help with validations
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

  //Checks and ensures name length of a user is a minimum of 4 characters
  if ($.trim(name).length < 4) {
    $('.nameError').show();
    $(fieldsets[0].children[2]).css('border', '2px solid red');
    alert("Please type your full name");
    validate = false;
  }
  //Checks and ensures email is valid
  if (!email.match(email_regex) || email.length == 0) {
    $('.emailError').show();
    $(fieldsets[0].children[4]).css('border', '2px solid red');
    alert("Please enter a valid email address");
    validate = false;
  }
  //Checks and ensures a user chooses at least one activity
  if (count <= 0) {
    $('.activityError').show();
    alert("Please choose at least one activity");
    validate = false;
  }

  //*********Extra Credit
  //Checks and ensures Credit card information is valid
  if ($('#payment').get()[0].value === "credit card") { 
    //Initially, if there hasn't been an attempt to enter cc info, this first 'if' will alert the user accordinglly
    if (ccNum <= 0) {
      $('.cardError').show();
      $(fieldsets[3].children[3].children[0].children[1]).css('border', '2px solid red');
      alert("Please enter a credit card number");
      validate = false;
      //After there's been an attempt to enter either too little or too much cc info, this will alert the user accordinglly
    } else if (ccNum > 0 && !ccNum.match(ccNum_regex)) {
      $('.cardError').show();
      $(fieldsets[3].children[3].children[0].children[1]).css('border', '2px solid red');
      alert("Please enter a number that is between 13 and 16 digits long")
      validate = false;
      //If the user doesn't doesn't match the exact validation requirements
    } else if (!ccNum.match(ccNum_regex)) {
      $('.cardError').show();
      $(fieldsets[3].children[3].children[0].children[1]).css('border', '2px solid red');
      alert("Please enter your valid credit card number");
      validate = false;
    }
    //Checks and ensures zipcode information is valid
    if (!zip.match(zip_regex)) {
      $('.zipError').show();
      $(fieldsets[3].children[3].children[1].children[1]).css('border', '2px solid red');
      alert("Please enter a valid zipcode");
      validate = false;
    }
    //Checks and ensures cc cvv information is valid
    if (!cvv.match(cvv_regex)) {
      $('.cvvError').show();
      $(fieldsets[3].children[3].children[2].children[1]).css('border', '2px solid red');
      alert("Please enter the cvv");
      validate = false;
    }
  }
}

//*********Extra Credit
//Lets user know how many numbers they have left to enter to be considered a valid cc number entry 
const remainingNum = (remnum) => {
  $("#remaining-num").remove();
  $remaining = $(`<label id="remaining-num">${remnum} Entries remaining</label>`)
  $('.credit-card').prepend($remaining);

  if (remnum <= 0) {
    $("#remaining-num").remove();
  }
}
 //Displays amount of characters is remaing before reaching validation
$('.credit-card #cc-num').on('keyup', function(e) {
  num = (13 - e.target.value.length)
  e.target.value.length > 0 ? $('#remaining-num').show() : $('#remaining-num').show();
  remainingNum(num);
});

//Checks and validates user information
//If there is a discrepancy, the form validator function will prevent the window from moving forward which is were the 'validate = true;' in the 'formValidation' function comes in handy
$('button').on('click', function(e) {
  formValidation(e);
  validate === true ? "" : e.preventDefault();
});










