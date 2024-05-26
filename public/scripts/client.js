/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Test / driver code (temporary). Eventually will get this from the server.

// const tweetData = {
//   "user": {
//     "name": "Newton",
//     "avatars": "https://i.imgur.com/73hZDYK.png",
//       "handle": "@SirIsaac"
//     },
//   "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//   "created_at": 1461116232227
// }



const createTweetElement = function (tweetData) {
  const $tweet = $(`
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
        <span class="tweet-date">${timeago.format(tweetData.created_at)}</span>
        <div class="tweet-response">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
    </article>
  `);
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
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function (tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (let tweet of tweets) {
    // calls createTweetElement for each tweet
    const tweetElement = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $('#tweets-container').prepend(tweetElement);
  }
}

renderTweets(data);

$(document).ready(function () {

  // Function to escape potentially dangerous characters
  const escape = function (str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Function to create a single tweet element
  const createTweetElement = function (tweetData) {
    // Implementation remains the same as your previous code...
  };

  // Function to render an array of tweets
  const renderTweets = function (tweets) {
    $('#tweets-container').empty(); // Clears out existing tweets before rendering new ones
    for (let tweet of tweets) {
      const tweetElement = createTweetElement(tweet);
      $('#tweets-container').prepend(tweetElement);
    }
  };

  // Function to fetch tweets from the server
  const loadTweets = function () {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json', // Expecting JSON data in response
      success: function (tweets) {
        renderTweets(tweets); // Call renderTweets to render the fetched tweets
      },
      error: function () {
        alert("Error fetching tweets");
      }
    });
  };

  // Call loadTweets to fetch and render tweets when the page is loaded
  loadTweets();

});


$(document).ready(function () {

  // Assuming your form has an ID of 'formId'
  $('#formId').on('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    const tweetContent = $(this).find('textarea').val(); // Get the value of textarea

    // Validation checks
    if (!tweetContent.trim()) {
      alert("The tweet content cannot be empty!"); // Notify user that the content is empty
    } else if (tweetContent.length > 140) { // Assuming 140 is the max tweet length
      alert("The tweet content is too long!"); // Notify user that the content exceeds the max length
    } else {
      // Data is valid, proceed with form submission via AJAX
      const formData = $(this).serialize(); // Serialize the form data into a query string

      $.ajax({
        type: "POST",
        url: "/tweets", // The server endpoint to submit tweets
        data: formData,
        success: function () {
          console.log("Tweet submitted successfully");
          // Here, you might want to clear the form, or reload the tweets to display the new one
          // For now, just reloading the tweets as an example
          loadTweets();
        },
        error: function () {
          alert("Failed to submit tweet");
        }
      });
    }
  });

  // Function to load tweets from the server (make sure you have defined this based on previous instructions)
  const loadTweets = function () {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json', // Expecting JSON data in response
      success: function (tweets) {
        renderTweets(tweets); // Call renderTweets to render the fetched tweets
      },
      error: function () {
        alert("Error fetching tweets");
      }
    });
  };

  // Immediately load existing tweets
  loadTweets();
});