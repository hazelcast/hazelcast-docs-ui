;(function () {
  'use strict'

  const showCopyToast = () => {
    const toast = document.createElement('div')
    toast.className = 'copy-toast'
    toast.innerHTML = 'Copied to clipboard ✓'
    document.body.appendChild(toast)

    setTimeout(() => {
      toast.classList.add('show')
    }, 100)

    setTimeout(() => {
      toast.classList.remove('show')
      setTimeout(() => {
        document.body.removeChild(toast)
      }, 300)
    }, 2500)
  }

  const getOnCopySuccess = (copyButton) => () => {
    /* Chrome doesn't seem to blur automatically,
              leaving the button in a focused state. */
    copyButton.blur()
    showCopyToast()
  }

  const getOnCopyError = (copyButton) => () => {
    copyButton.dataset.title = 'Error'
  }

  const normalizeBashCode = (code) => {
    /* Multiline code samples with annotations
                have extra spaces at the end of lines, which break samples on copy. */
    return code.replace(/\\\s+$/gm, '\\')
  }

  const trimCode = (code) => {
  /* remove '$' from copy to code functionality in code block console */
    return code.replace(/^\$\s/gm, '')
  }

  document.querySelectorAll('pre > code').forEach(function (codeBlock) {
    var sourceTypeBox = document.createElement('div')
    sourceTypeBox.className = 'source-type-box'
    var copyButton = document.createElement('a')
    copyButton.className = 'copy-code-button'
    copyButton.dataset.title = 'Copy'
    copyButton.innerText = 'Copy'
    copyButton.appendChild(document.createElement('i')).className = 'fa-regular fa-copy'
    var dataSource = document.createElement('span')
    dataSource.className = 'data-source'
    if (codeBlock.dataset.lang) {
      dataSource.innerHTML += codeBlock.dataset.lang
    } else {
      dataSource.innerHTML += ' '
    }
    var fadeShadow = document.createElement('span')
    fadeShadow.className = 'fade-shadow'

    codeBlock.parentNode.addEventListener('click', function () {
      let codeString = normalizeBashCode(codeBlock.innerText)
      if (codeString.charAt(0) === '$') {
        codeString = trimCode(codeString)
      }
      navigator.clipboard.writeText(codeString).then(
        getOnCopySuccess(copyButton),
        getOnCopyError(copyButton)
      )
    })
    var pre = codeBlock.parentNode
    pre.appendChild(sourceTypeBox)
    sourceTypeBox.appendChild(dataSource)
    sourceTypeBox.appendChild(copyButton)
    pre.appendChild(fadeShadow)
  })
})()
