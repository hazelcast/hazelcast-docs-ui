const feedbackForm = document.getElementById('feedback-form')
const additionalTextualFeedback = document.getElementById('additional-textual-feedback')
const overlay = document.getElementById('feedback-overlay')
const helpfulFeedbackWidget = document.getElementById('helpful-feedback-widget')
const feedbackSubmitSuccess = document.getElementById('feedback-submit-success')
const submitBtn = document.getElementById('feedback-form-submit-btn')

const handleSubmit = (event) => {
  event.preventDefault()
  submitBtn.setAttribute('disabled', '')

  // eslint-disable-next-line no-undef
  const formData = new FormData(feedbackForm)

  // eslint-disable-next-line no-undef
  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(formData).toString(),
  })
    .then(() => console.debug('Thank you for your feedback'))
    .catch((error) => console.error(error))
  submitBtn.removeAttribute('disabled')
  overlay.classList.remove('open')
  feedbackSubmitSuccess.classList.remove('hidden')
  helpfulFeedbackWidget.classList.add('hidden')
}

const openFormContainer = (containerToOpen, containerToClose, radioToCheck, radioToUncheck) => {
  feedbackForm.reset()
  document.getElementById(containerToOpen).classList.remove('hidden')
  document.getElementById(containerToClose).classList.add('hidden')
  document.getElementById(radioToCheck).setAttribute('checked', '')
  document.getElementById(radioToUncheck).removeAttribute('checked')
  overlay.classList.add('open')
}

const showPositiveFeedbackForm = () => {
  openFormContainer(
    'positive-feedback-form-container',
    'negative-feedback-form-container',
    'yes',
    'no'
  )
}

const showNegativeFeedbackForm = () => {
  openFormContainer(
    'negative-feedback-form-container',
    'positive-feedback-form-container',
    'no',
    'yes'
  )
}

const changeFeedbackAdditionalTextPlacement = (event) => {
  // eslint-disable-next-line no-undef
  const formData = new FormData(feedbackForm)
  const feedbackValue = formData.get('feedback')
  const selectedRadioButton = document.querySelector(`[value="${feedbackValue}"]`)
  selectedRadioButton.parentNode.insertAdjacentElement('afterend', additionalTextualFeedback)
}

const closeOverlay = () => {
  feedbackForm.reset()
  overlay.classList.remove('open')
}

feedbackForm.addEventListener('submit', handleSubmit)
feedbackForm.addEventListener('change', changeFeedbackAdditionalTextPlacement)
document.getElementById('close-feedback-overlay').addEventListener('click', closeOverlay)
document.getElementById('positive-feedback-starter').addEventListener('click', showPositiveFeedbackForm)
document.getElementById('negative-feedback-starter').addEventListener('click', showNegativeFeedbackForm)
