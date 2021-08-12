/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // const data = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png"
  //       ,
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": "https://i.imgur.com/nlhLi3I.png",
  //       "handle": "@rd" },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   },
  //   {
  //     "user": {
  //       "name": "Charlie",
  //       "avatars": "https://i.imgur.com/73hZDYK.png",
  //       "handle": "@KittenMittens" },
  //     "content": {
  //       "text": "What is this word, ‘spa’? I feel like you’re starting to say a word and you’re not finishing it. Are you trying to say ‘spaghetti’? Are you taking me for a spaghetti day?"
  //     },
  //     "created_at": 1461116232227
  //     }
  //   ]


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
    $('.tweet-container').append($tweet);
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
  console.log(event);
  const textStr = $('#submit-form').serialize();
  $.post('/tweets/', textStr, function(data) {
    console.log('data:', data);
  })
});


});