;(function () {
  'use strict'

  const getOnCopySuccess = (copyButton) => () => {
    /* Chrome doesn't seem to blur automatically,
              leaving the button in a focused state. */
    copyButton.blur()
    copyButton.dataset.title = 'Copied ✓'
    setTimeout(function () {
      copyButton.dataset.title = 'Copy'
    }, 2000)
  }

  const getOnCopyError = (copyButton) => () => {
    copyButton.dataset.title = 'Error'
  }

  const normalizeBashCode = (code) => {
    /* Multiline code samples with annotations
                have extra spaces at the end of lines, which break samples on copy. */
    return code.replace(/\\\s+$/gm, '\\')
  }

  document.querySelectorAll('pre > code').forEach(function (codeBlock) {
    var sourceTypeBox = document.createElement('div')
    sourceTypeBox.className = 'source-type-box'
    var copyButton = document.createElement('a')
    copyButton.className = 'copy-code-button'
    copyButton.dataset.title = 'Copy'
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

    copyButton.addEventListener('click', function (e) {
      // NOTE: ignore event on pseudo-element
      if (e.currentTarget === e.target) return
      var bashText = normalizeBashCode(codeBlock.innerText)
      // remove '$' from copy to code functionality in code block console
      var check = bashText.charAt(0)
      if (check === '$') {
        var spliceData = bashText.substring(2)
        navigator.clipboard.writeText(spliceData).then(
          getOnCopySuccess(copyButton),
          getOnCopyError(copyButton)
        )
      } else {
        navigator.clipboard.writeText(bashText).then(
          getOnCopySuccess(copyButton),
          getOnCopyError(copyButton)
        )
      }
    })
    var pre = codeBlock.parentNode
    pre.appendChild(sourceTypeBox)
    sourceTypeBox.appendChild(dataSource)
    sourceTypeBox.appendChild(copyButton)
    pre.appendChild(fadeShadow)
  })
})()
