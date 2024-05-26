/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}



const createTweetElement = function(tweetData) {
  const $tweet = $(`<article class="tweet">Hello world
  
<article class="tweet">
      <header class="tweet-header">
        <div class="user-profile">
          <img class="user-icon" src="${tweetData.user.avatars}"></img> 
          <h4 class="user-name">${tweetData.user.name}</h4>
        </div>
        <div>
          <h4 class="user-handle">${tweetData.user.handle}</h4>
        </div>
      </header>
      <div class="tweet-text">
        ${escape(tweetData.content.text)}
      </div>
      <footer class="tweet-footer">
        <div class="tweet-response">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
    </article>`);
  return $tweet;
};

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet); //

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {
// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
for(let tweet of tweets) {
  // calls createTweetElement for each tweet
  const tweetElement = createTweetElement(tweet);
  // takes return value and appends it to the tweets container
  $('#tweets-container').prepend(tweetElement);
}
}

renderTweets(data);