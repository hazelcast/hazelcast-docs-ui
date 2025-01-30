const feedbackForm = document.getElementById('feedback-form')
const additionalTextualFeedback = document.getElementById('additional-textual-feedback')

const handleSubmit = (event) => {
  event.preventDefault()

  const myForm = event.target
  // eslint-disable-next-line no-undef
  const formData = new FormData(myForm)

  // eslint-disable-next-line no-undef
  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(formData).toString(),
  })
    // eslint-disable-next-line no-undef
    .then(() => alert('Thank you for your submission'))
    // eslint-disable-next-line no-undef
    .catch((error) => alert(error))
}

const openFormContainer = (containerToOpen, containerToClose, radioToCheck, radioToUncheck) => {
  feedbackForm.reset()
  document.getElementById(containerToOpen).classList.remove('hidden')
  document.getElementById(containerToClose).classList.add('hidden')
  document.getElementById(radioToCheck).setAttribute('checked', '')
  document.getElementById(radioToUncheck).removeAttribute('checked')
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

feedbackForm.addEventListener('submit', handleSubmit)
document.getElementById('positive-feedback-starter').addEventListener('click', showPositiveFeedbackForm)
document.getElementById('negative-feedback-starter').addEventListener('click', showNegativeFeedbackForm)
