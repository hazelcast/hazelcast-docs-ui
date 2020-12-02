/*;(function () {
  document.querySelector('#yes-button, #no-button').bind('click', function () {
    if (document.querySelector(this).attr('id') === 'yes-button') {
      document.querySelector('#feedback-prompt').innerHTML('<p class="feedback-response">Thanks for the feedback!</p>')
    }
    if (document.querySelector(this).attr('id') === 'no-button') {
      console.log('nope')
    }
  })
})()*/

;(function () {
  'use strict'

  var yes = document.getElementById('yes-button')
  var no = document.getElementById('no-button')
  var response = document.getElementById('feedback-response')
  var options = document.getElementById('feedback-prompt')

  yes.onclick = function () {
    options.innerHTML = ''
    response.style.display = 'block'
    // Can use Google Analytics to track these clicks and keep track of feedback
    // https://developers.google.com/analytics/devguides/collection/analyticsjs/sending-hits
    //ga('send', 'event', 'Positive Feedback', 'click');
  }
  no.onclick = function () {
    options.innerHTML = ''
    response.style.display = 'block'
    //ga('send', 'event', 'Negative Feedback', 'click');
  }
})()
