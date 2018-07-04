const viewerBox = document.getElementById( 'viewerBox' )
const iframeDomString = '<iframe id="iframe" src="./iframe.html" frameborder="0"></iframe>'

/**
 * // Textarea
 */
const html = document.getElementById( 'html' )
const css = document.getElementById( 'css' )
const javascript = document.getElementById( 'javascript' )

/**
 * // Tab buttons
 */
const htmlBtn = document.getElementById( 'htmlBtn' )
const cssBtn = document.getElementById( 'cssBtn' )
const javascriptBtn = document.getElementById( 'javascriptBtn' )
const resultBtn = document.getElementById( 'resultBtn' )

bindTabButtonsEvents()
bindTextareasEvents()
refreshIframe()

hideAll()
showElement( html )


function bindTabButtonsEvents() {
  htmlBtn.onclick = onHtmlBtnClick
  cssBtn.onclick = onCSSBtnClick
  javascriptBtn.onclick = onJavascriptBtnClick
  resultBtn.onclick = onResultBtnClick

  function onHtmlBtnClick() {
    hideAll()
    toggleDisplayElement( html )
  }

  function onCSSBtnClick() {
    hideAll()
    toggleDisplayElement( css )
  }

  function onJavascriptBtnClick() {
    hideAll()
    toggleDisplayElement( javascript )
  }

  function onResultBtnClick() {
    hideAll()
  }

  
}

function bindTextareasEvents() {
  html.addEventListener( 'input', onChangeListener)
  html.addEventListener( 'onpropertychange', onChangeListener)
  css.addEventListener( 'input', onChangeListener)
  css.addEventListener( 'onpropertychange', onChangeListener)
  javascript.addEventListener( 'input', onChangeListener)
  javascript.addEventListener( 'onpropertychange', onChangeListener)

  function onChangeListener() {
    refreshIframe()
  }
}

function refreshIframe() {
  unloadIframe()
  loadIframe()
}


function loadIframe() {

  viewerBox.innerHTML = iframeDomString

  window.removeEventListener('myEvent', communicationLister)
  window.addEventListener('myEvent', communicationLister)

  function communicationLister(e) {
    const { updateHtmlFn, updateCSSFn, updateJavascriptFn } = e.detail

      updateHtmlFn( html.value )  
      updateCSSFn( css.value )  
      updateJavascriptFn( javascript.value )  
  }
}

function unloadIframe() {
  viewerBox.innerHTML = ''
}



/**
 * // Style
 */
function showElement( element ) {
  element.style.display = 'block'
}
function hideElement( element ) {
  element.style.display = 'none'
}
function toggleDisplayElement( element ) {
  if ( element.style.display === 'none' ) {
    return showElement( element ) 
  } 
  hideElement( element )
}

function hideAll() {
  html.style.display = 'none';
  css.style.display = 'none';
  javascript.style.display = 'none';
}