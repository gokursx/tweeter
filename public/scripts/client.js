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

// Function to create a single tweet element
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

// Function to render tweets
function renderTweets(tweets) {
  $('#tweets-container').empty();
  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet); // Define the $tweet variable here
    $('#tweets-container').prepend($tweet);
  }
}

// Function to escape characters
const escape = function (str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};



$(document).ready(function () {
  // Function to perform tweet content validation
  function isTweetValid(tweetContent) {
    if (!tweetContent.trim()) {
      return "Enter tweet content in the text box!";
    } else if (tweetContent.length > 140) {
      return "The tweet content exceeds maximum set limit!";
    }
    return null; // Indicates success
  }

  // Function to load tweets from the server
  function loadTweets() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: function (tweets) {
        renderTweets(tweets);
      },
      error: function () {
        alert("Error fetching tweets");
      }
    });
  }

  // renderTweets(data);

  // Load tweets when the page is ready
  loadTweets();

//   // Form submission handler
  $('#formId').on('submit', function (event) {
    console.log("Form submit event intercepted");
    event.preventDefault();
    const _this = this; // Capture the form context to use inside the callback function

    // Hide any existing error messages
    $('#error-message').slideUp(function () {
      const tweetContent = $('#tweet-text').val();
      const validationResult = isTweetValid(tweetContent);

      // Use isTweetValid function to check if the tweet content is valid
      if (!validationResult) { // If validationResult is null or false, tweet is valid
        // Serialize the form data into a query string
        const formData = $(_this).serialize();

        // AJAX POST request because the tweet content is valid
        $.ajax({
          type: "POST",
          url: "/tweets",
          data: formData,
          success: function () {
            console.log("Tweet submitted successfully");
            // Clear the textarea upon successful submission
            $('#formId').find('textarea').val('');
            loadTweets(); // Reload tweets to display the new tweet without refreshing the page
          },
          error: function () {
            alert("Tweet submission failed");
          }
        });
      } else {
        // Display the validation error message
        $('#error-message').text(validationResult).slideDown();
      }
    });
  });

//   // Load tweets when the page is ready
//   $(document).ready(function () {
//     loadTweets();
//   })
});