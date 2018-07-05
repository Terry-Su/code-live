const viewerBox = document.getElementById('viewerBox')
const iframeDomString = '<iframe id="iframe" src="./basicIframe.html" frameborder="0"></iframe>'

/**
 * // Textarea
 */
const html = document.getElementById('html')
const css = document.getElementById('css')
const javascript = document.getElementById('javascript')
const editAreaContainer = document.getElementById('editAreaContainer')



/**
 * // Tab buttons
 */
const htmlBtn = document.getElementById('htmlBtn')
const cssBtn = document.getElementById('cssBtn')
const javascriptBtn = document.getElementById('javascriptBtn')
const resultBtn = document.getElementById('resultBtn')

/**
 * // constants
 */
const ACTIVE_STATUS_HTML = 'ACTIVE_STATUS_HTML'
const ACTIVE_STATUS_CSS = 'ACTIVE_STATUS_CSS'
const ACTIVE_STATUS_JAVASCRIPT = 'ACTIVE_STATUS_JAVASCRIPT'
const ACTIVE_STATUS_RESULT = 'ACTIVE_STATUS_RESULT'

const stateController = new StateConroller()

init()
bindTabButtonsEvents()
bindTextareasEvents()
onlyShowEditAreaElement(html)

refreshIframe()

function init() {

  window.addEventListener("message", receiveMessage);

  function receiveMessage(event) {
    const { tsHtml, tsCss, tsJavascript } = event.data || {}
    if ( tsHtml !== undefined ) {
      html.value = tsHtml
    }
    if ( tsCss !== undefined ) {
      css.value = tsCss
    }
    if ( tsJavascript !== undefined ) {
      javascript.value = tsJavascript
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
    stateController.activateHtml()
  }

  function onCssBtnClick() {
    stateController.activateCss()
  }

  function onJavascriptBtnClick() {
    stateController.activateJavascript()
  }

  function onResultBtnClick() {
    stateController.activateResult()
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

function onlyShowEditAreaElement(element) {
  hideAllEditArea()
  showElement( editAreaContainer )
  showElement( element )
}

function onlyShowResult() {
  percent100( viewerBox )
  hideElement(editAreaContainer)
}

function hideAllEditArea() {
  editAreaContainer.style.display = 'none';
  html.style.display = 'none';
  css.style.display = 'none';
  javascript.style.display = 'none';
}

function StateConroller() {
  this.state = {
    active: ACTIVE_STATUS_RESULT
  }

}

function percent100( element ) {
  element.style.width = '100%'
}


function percent50( element ) {
  element.style.width = '50%'
}


StateConroller.prototype.activateHtml = function() {
  this.state.active = ACTIVE_STATUS_HTML

  onlyShowEditAreaElement(html)
}
StateConroller.prototype.activateCss = function() {
  this.state.active = ACTIVE_STATUS_CSS

  onlyShowEditAreaElement(css)
}
StateConroller.prototype.activateJavascript = function() {
  this.state.active = ACTIVE_STATUS_JAVASCRIPT

  onlyShowEditAreaElement(javascript)
}
StateConroller.prototype.activateResult = function() {
  this.state.active = ACTIVE_STATUS_RESULT
  onlyShowResult()
}