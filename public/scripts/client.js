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

$(document).ready(function () {
   // Function to escape potentially dangerous characters
   const escape = function (str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  const safeHTML = `<p>${escape(textFromUser)}</p>`;

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

  // Function to perform tweet content validation
  function isTweetValid(tweetContent) {
    if (!tweetContent.trim()) {
      alert("The tweet content cannot be empty!");
      return false;
    } else if (tweetContent.length > 140) {
      alert("The tweet content is too long!");
      return false;
    }
    return true;
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
 

  renderTweets(data);

  // Function to create a single tweet element
  

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
// Function to render tweets
function renderTweets(tweets) {
  $('#tweets-container').empty();
  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet); // Define the $tweet variable here
    $('#tweets-container').prepend($tweet);
  }
}


// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet); //

// Load tweets when the page is ready
loadTweets();

// Form submission handler
  $('#formId').on('submit', function (event) {
    console.log("Form submit event intercepted");
    event.preventDefault();
    const tweetContent = $(this).find('textarea').val();
    // Use isTweetValid function to check if the tweet content is valid
    if (isTweetValid(tweetContent)) {
      // Serialize the form data into a query string
      const formData = $(this).serialize();

      // AJAX POST request if the tweet content is valid
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: formData,
        success: function () {
          console.log("Tweet submitted successfully");
          // Clear the textarea upon successful submission
          $('#formId').find('textarea').val('');
          loadTweets(); // Reload tweets to display the new tweet
        },
        error: function () {
          alert("Failed to submit tweet");
        }
      });
    }
  });
  // Load tweets when the page is ready
  loadTweets();
});

