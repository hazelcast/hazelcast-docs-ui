;(function () {
  'use strict'

  function getAnswer (elem, selector) {
    // Get the next sibling element
    var sibling = elem.nextElementSibling
    var found = false

    for (var j = 0; j < sibling.children.length; j++) {
      if (sibling.children[j].matches(selector)) {
        found = true
        return sibling.children[j]
      }
    }
    if (!found) {
      console.error('No answer found for FAQ question')
    }
  }

  function createFAQJSON () {
    var faqObject = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
    }

    var questions = document.getElementsByTagName('h2')
    faqObject.mainEntity = []

    for (var i = 0; i < questions.length; i++) {
      var answer = getAnswer(questions[i], '.answer')
      var question = {
        '@type': 'Question',
        name: questions[i].innerText,
        acceptedAnswer: {
          '@type': 'Answer',
          text: answer.children[0].innerText,
        },
      }
      faqObject.mainEntity.push(question)
    }
    if (!document.getElementById('faq')) {
      var structuredDataText = JSON.stringify(faqObject)
      const script = document.createElement('script')
      script.setAttribute('type', 'application/ld+json')
      script.setAttribute('id', 'faq')
      script.textContent = structuredDataText
      document.head.appendChild(script)
    }
  }
  window.addEventListener('DOMContentLoaded', createFAQJSON)
})()
