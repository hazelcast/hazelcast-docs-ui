/*global ga*/
// Tells the linter that ga is available
;(function () {
  'use strict'

  var yes = document.getElementById('yes-button')
  var no = document.getElementById('no-button')
  var response = document.getElementById('feedback-response')
  var options = document.getElementById('feedback-prompt')

  yes.onclick = function () {
    options.innerHTML = ''
    response.style.display = 'block'
    //Can use Google Analytics to track these clicks and keep track of feedback
    //https://developers.google.com/analytics/devguides/collection/analyticsjs/sending-hits
    ga('send', 'event', 'Positive Feedback', 'click')
  }
  no.onclick = function () {
    options.innerHTML = ''
    response.style.display = 'block'
    ga('send', 'event', 'Negative Feedback', 'click')
  }
})()
