;(function () {
  function push (event, params) {
    if (window.UTILS && typeof window.UTILS.pushDataLayer === 'function') {
      window.UTILS.pushDataLayer(event, params)
    } else {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push(Object.assign({ event: event }, params || {}))
    }
  }

  if (!window.Kapa) return

  window.Kapa('onModalOpen', function () {
    push('kapa_modal_open', { search_provider: 'kapa' })
  })

  window.Kapa('onAskAIQuerySubmit', function (data) {
    push('kapa_question_submitted', {
      search_provider: 'kapa',
      question: (data && data.question) || '',
    })
  })

  window.Kapa('onAskAIAnswerCompleted', function (data) {
    push('kapa_answer_completed', {
      search_provider: 'kapa',
      question: (data && data.question) || '',
      kapa_thread_id: (data && data.threadId) || '',
      kapa_qa_id: (data && data.questionAnswerId) || '',
    })
  })

  window.Kapa('onAskAILinkClick', function (data) {
    push('kapa_link_click', {
      search_provider: 'kapa',
      link_url: (data && data.href) || '',
      kapa_thread_id: (data && data.threadId) || '',
      kapa_qa_id: (data && data.questionAnswerId) || '',
    })
  })

  window.Kapa('onAskAISourceClick', function (data) {
    const source = (data && data.source) || {}
    push('kapa_source_click', {
      search_provider: 'kapa',
      link_url: source.url || '',
      link_title: source.title || '',
      kapa_thread_id: (data && data.threadId) || '',
      kapa_qa_id: (data && data.questionAnswerId) || '',
    })
  })
})()
