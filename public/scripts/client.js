/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


  const createTweetElement = function(tweetObj) {
  const $tweet = $('<article>').addClass('tweet');

  const html = `
          <header>
            <img src= ${tweetObj.user.avatars}>
            <h4>${tweetObj.user.name}</h4>
            <p>${tweetObj.user.handle}</p>
          </header>
          <p>${tweetObj.content.text}</p>
          <footer>
            <p>${tweetObj.created_at}</p>
            <div>
              <i class="fas fa-flag"></i>
              <i class="fas fa-retweet"></i>
              <i class="far fa-heart"></i>
            </div>
          </footer>`;
  
  $tweet.append(html);
  return $tweet;
};


const renderTweets = function(tweetArr) {
  for (const tweet of tweetArr) {
    const $tweet = createTweetElement(tweet);
    $('.tweet-container').prepend($tweet);
  }
};


const loadTweets = function() {
  $.ajax('/tweets', { method: 'GET' })
  .then(function (allTweets) {
    renderTweets(allTweets);
  });
};
loadTweets();


$('#submit-form').submit(function(event) {
  event.preventDefault();

  const newTweetText = $(this).find('textarea').val();

  if (!newTweetText) {
    alert('Did you even type anything?');
  } else if (newTweetText.length > 140) {
    alert('Woah, settle down there! You went over the character limit!');
  } else {
  const textStr = $('#submit-form').serialize();
  $.post('/tweets/', textStr, function() {
    loadTweets();
  })
}
});


});