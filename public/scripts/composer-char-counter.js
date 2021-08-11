$(document).ready(function() {
  let tweetMax = 140;
  
  $('textarea').keydown(function() {
    let tweetLength= $(this).val().length;
    let count = tweetMax - tweetLength;
    
    // traverses the DOM to 'this' parent
    // then searches children for a child with '.counter' class
    // inputs the value of count into text field.

    $(this)
    .parent()
    .children('.counter')
    .text(count);

    if (count < 0) {
      $(this)
      .parent()
      .children('.counter')
      .addClass('negative');
    }

    if (count >= 0) {
      $(this)
      .parent()
      .children('.counter')
      .removeClass('negative');
    }
  });
});