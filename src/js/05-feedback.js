const handleSubmit = (event) => {
  event.preventDefault()

  const myForm = event.target
  console.log('myForm', myForm)
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
};

document.getElementById('feedback-form').addEventListener('submit', handleSubmit)
