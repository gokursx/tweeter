$(document).ready(function () {
  // --- our code goes here ---

  $('.new-tweet textarea').on('input', function (event) {
    console.log("Input event on textarea within .new-tweet section, event:", event);

    // Place your code here to handle the event
    //counts the length of characters in the box.
    const currCharCount = $(this).val().length;

    //Counter element locates the counter
    const counterElem = $(this).closest('form').find('.counter');

    const remChars = 140 - currCharCount;

    //Displays color change depending upon characters in textbox
    counterElem.text(remChars);
    if (remChars < 0) {
      counterElem.css('color', '#db751b');
    } else {
      counterElem.css('color', '#2d2c29');
    }
  });
});