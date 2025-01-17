/* === Config  === */
const FETCH_SCRIPT_URL = "https://terry-su.github.io/CDN/utils/fetch.js"
const CODE_VIEWER_IFRAME_URL = "https://terry-su.github.io/CDN/CodeViewer/index.html"
/* === Config === */


const HTML_URL = "./template.html"
const CSS_URL = "./index.css"
const JAVASCRIPT_URL = "./index.js"


init()

/* Bussiness Logic */
function init() {
  const styleText = getStyleText()
  applyStyle( styleText )
  loadScript( FETCH_SCRIPT_URL, main )
}

function main() {
  iframe = addIframe()
}


function addIframe() {
  const iframe = document.createElement( "iframe" )
  iframe.src = CODE_VIEWER_IFRAME_URL + location.search
  iframe.setAttribute( "frameBorder", 0 )
  iframe.onload = onIframeLoad
  document.body.appendChild( iframe )

  function onIframeLoad() {
    fetchHtml()
      .then( fetchCss )
      .catch( fetchCss )
      .then( fetchJavascript )
      .catch( fetchJavascript )
      .then( postMessage )

    function fetchHtml() {
      return fetchText( HTML_URL ).then( function( html ) {
        tsHtml = html
        return
      } )
    }
    function fetchCss() {
      return fetchText( CSS_URL ).then( function( css ) {
        tsCss = css
        return
      } )
    }
    function fetchJavascript() {
      return fetchText( JAVASCRIPT_URL ).then( function( javascript ) {
        tsJavascript = javascript
        return
      } )
    }
    function postMessage() {
      const data = {
        tsHtml,
        tsCss,
        tsJavascript,
      }
      iframe.contentWindow.postMessage( data, "*" )
    }
  }
}

function getStyleText() {
  let { width , height } = getUrlParameters()
  width = notNil( width ) ? width : '100%'
  height = notNil( height ) ? height : '100%'
  return `html,body{ width:${width};height:${ height };margin:0;padding:0;} iframe{display:block;width:100%;height:100%;}`
}

function getUrlParameters() {
  return {
    width : getUrlSearchParamsValue( 'width' ),    
    height: getUrlSearchParamsValue( 'height' ),    
  }
}


/* Utils */
function fetchText( url ) {
  return fetch( url ).then( function( response ) {
    try {
      const status = response.status
      return status === 200 ? response.text() : null
    } catch ( e ) {
      return null
    }
  } ).catch( function( e ) {
    return null
  } )
}

function loadScript( src, callback ) {
  const script = document.createElement( "script" )
  script.src = src
  script.onload = callback || function() {}
  document.head.appendChild( script )
}

function applyStyle( styleText ) {
  const style = document.createElement( "style" )
  style.type = "text/css"
  style.appendChild( document.createTextNode( styleText ) )
  document.head.appendChild( style )
}

function getUrlSearchParamsValue( key ) {
  const url = new URL( location.href )
  if ( url && url.searchParams ) {
    return url.searchParams.get( key )
  }
}


function isNil( value ) {
  return value === null || typeof value === 'undefined'
}

function notNil( value ) {
  return !isNil( value )
}