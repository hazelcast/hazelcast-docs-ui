
// /*global ga*/ Tells the linter that ga is available
;(function () {
  'use strict'

  var yes = document.getElementById('yes-button')
  var no = document.getElementById('no-button')
  var response = document.getElementById('feedback-response')
  var options = document.getElementById('feedback-prompt')
  //var url = window.location.href
  //var googleScript = document.getElementById('google-script')

  if (yes !== null && no !== null /* && googleScript !== null */) {
    yes.onclick = function () {
      options.innerHTML = ''
      response.style.display = 'block'
      // Use Google Analytics to track these clicks and keep track of feedback
      //https://developers.google.com/analytics/devguides/collection/analyticsjs/sending-hits
      //ga('send', 'event', 'Positive Feedback', url /* page as action */)
    }
    no.onclick = function () {
      options.innerHTML = ''
      response.style.display = 'block'
      //ga('send', 'event', 'Negative Feedback', url /* page as action */)
    }
  }
})()
