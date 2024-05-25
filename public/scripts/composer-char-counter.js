$(document).ready(function() {
  // --- our code goes here ---
  $('#tweet-text').on('keyup', function(e) {
   
    //counts the length of characters inthe box.
    const currCharCount = $(this).val().length;
    
    //Counter element locates the counter
    const counterElem = $(this).closest('form').find('.counter');

    const remainingChars = 140 - currCharCount;
    
    //updating counter elem on DOM to reflect current changes in remaining characters
    counterElem.text(remainingChars);
    if (remainingChars < 0) {
      counterElem.css('color', 'mediumvioletred');
    } else {
      counterElem.css('color', '#545149');
    }
  });
});