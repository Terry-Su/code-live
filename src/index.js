const viewerBox = document.getElementById('viewerBox')
const iframeDomString = '<iframe id="iframe" src="./iframe.html" frameborder="0"></iframe>'

/**
 * // Textarea
 */
const html = document.getElementById('html')
const css = document.getElementById('css')
const javascript = document.getElementById('javascript')

/**
 * // Tab buttons
 */
const htmlBtn = document.getElementById('htmlBtn')
const cssBtn = document.getElementById('cssBtn')
const javascriptBtn = document.getElementById('javascriptBtn')
const resultBtn = document.getElementById('resultBtn')

init()
bindTabButtonsEvents()
bindTextareasEvents()
hideAll()
showElement(html)

refreshIframe()

function init() {

  window.addEventListener("message", receiveMessage);

  function receiveMessage(event) {
    const { tsHtml, tsCss, tsJavascript } = event.data || {}
    console.log( event.data )
    if ( tsHtml !== undefined ) {
      html.innerHTML = tsHtml
    }
    if ( tsCss !== undefined ) {
      css.innerHTML = tsCss
    }
    if ( tsJavascript !== undefined ) {
      html.innerHTML = tsJavascript
    }
    refreshIframe()
  }
}

function bindTabButtonsEvents() {
  htmlBtn.onclick = onHtmlBtnClick
  cssBtn.onclick = onCssBtnClick
  javascriptBtn.onclick = onJavascriptBtnClick
  resultBtn.onclick = onResultBtnClick

  function onHtmlBtnClick() {
    hideAll()
    toggleDisplayElement(html)
  }

  function onCssBtnClick() {
    hideAll()
    toggleDisplayElement(css)
  }

  function onJavascriptBtnClick() {
    hideAll()
    toggleDisplayElement(javascript)
  }

  function onResultBtnClick() {
    hideAll()
  }
}

function bindTextareasEvents() {
  html.addEventListener('input', onChangeListener)
  html.addEventListener('onpropertychange', onChangeListener)
  css.addEventListener('input', onChangeListener)
  css.addEventListener('onpropertychange', onChangeListener)
  javascript.addEventListener('input', onChangeListener)
  javascript.addEventListener('onpropertychange', onChangeListener)

  function onChangeListener() {
    refreshIframe()
  }
}

function refreshIframe() {
  unloadIframe()
  loadIframe()
}


function loadIframe() {


  window.removeEventListener('myEvent', communicationLister)
  window.addEventListener('myEvent', communicationLister)

  viewerBox.innerHTML = iframeDomString

  function communicationLister(e) {
    const {updateHtmlFn, updateCssFn, updateJavascriptFn} = e.detail

    updateHtmlFn(html.value)
    updateCssFn(css.value)
    updateJavascriptFn(javascript.value)
  }
}

function unloadIframe() {
  viewerBox.innerHTML = ''
}



/**
 * // Style
 */
function showElement(element) {
  element.style.display = 'block'
}
function hideElement(element) {
  element.style.display = 'none'
}
function toggleDisplayElement(element) {
  if (element.style.display === 'none') {
    return showElement(element)
  }
  hideElement(element)
}

function hideAll() {
  html.style.display = 'none';
  css.style.display = 'none';
  javascript.style.display = 'none';
}