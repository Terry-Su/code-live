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
const CLASS_ACTIVE = 'active'
const CLASS_EMPTY = 'empty'


function StateConroller() {
  this.state = {
    active: ACTIVE_STATUS_RESULT
  }

  this.tabButtons = [ htmlBtn, cssBtn, javascriptBtn, resultBtn ]

  this.editAreas = [ html, css, javascript ]

  this.tabButtonEditAreaMap = [
    {
      editArea: html,
      button: htmlBtn
    },
    {
      editArea: css,
      button: cssBtn
    },
    {
      editArea: javascript,
      button: javascriptBtn
    },
  ]
}


StateConroller.prototype.activateHtml = function() {
  this.state.active = ACTIVE_STATUS_HTML

  onlyShowEditAreaElement(html)
  this.activateTabButtonStyle(htmlBtn)
}
StateConroller.prototype.activateCss = function() {
  this.state.active = ACTIVE_STATUS_CSS

  onlyShowEditAreaElement(css)
  this.activateTabButtonStyle(cssBtn)
}
StateConroller.prototype.activateJavascript = function() {
  this.state.active = ACTIVE_STATUS_JAVASCRIPT

  onlyShowEditAreaElement(javascript)
  this.activateTabButtonStyle(javascriptBtn)
}
StateConroller.prototype.activateResult = function() {
  this.state.active = ACTIVE_STATUS_RESULT
  this.activateTabButtonStyle( resultBtn )
  onlyShowResult()
}

StateConroller.prototype.activateTabButtonStyle = function( element ) {
  this.tabButtons.map( button => {
    removeClass( button, CLASS_ACTIVE )
    cancelBoldElement( button )
  } )
  boldElement( element )
  addClass( element, CLASS_ACTIVE )
}

StateConroller.prototype.emptyTabButtonStyle = function( element ) {
  addClass( element, CLASS_EMPTY )
}

StateConroller.prototype.cancelEmptyTabButtonStyle = function( element ) {
  removeClass( element, CLASS_EMPTY )
}

StateConroller.prototype.emptyEmptyEditAreaTabButtonStyle = function( element ) {
  const self = this
  this.tabButtonEditAreaMap.map( ( { editArea, button } ) => {
    if ( editArea.value === '' ) {
      self.emptyTabButtonStyle( button )
    } else {
      self.cancelEmptyTabButtonStyle( button )
    }
  } )
}


const stateController = new StateConroller()

init()
bindTabButtonsEvents()
bindTextareasEvents()
onlyShowEditAreaElement(html)

stateController.emptyEmptyEditAreaTabButtonStyle()
stateController.activateHtml()
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
    stateController.emptyEmptyEditAreaTabButtonStyle()
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
  percent50( viewerBox )
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

function percent100( element ) {
  element.style.width = '100%'
}


function percent50( element ) {
  element.style.width = '50%'
}

function addClass( element, className ) {
  const name = element.getAttribute('class')
  const string =  name + ' ' + className
  element.setAttribute('class', string)
}

function removeClass( element, className ) {
  const name = element.getAttribute('class')
  const r1 = new RegExp( '^' + className + '$', 'g' )
  const r2 = new RegExp( '^' + className + ' ', 'g' )
  const r3 = new RegExp( ' ' + className + '$', 'g' )
  const r4 = new RegExp( ' ' + className + ' ', 'g' )
  const string = name.replace( r1, '' ).replace(r2, ' ').replace(r3, ' ').replace(r4, ' ')
  element.setAttribute('class', string)
}

function boldElement( element ) {
  element.style.fontWeight = 'bold'
}

function cancelBoldElement( element ) {
  element.style.fontWeight = 'normal'
}