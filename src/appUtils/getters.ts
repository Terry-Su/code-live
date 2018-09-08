import { MODES } from "../constants/types"
import { values, notNil } from "../utils/lodash"
import { DISPLAY_NONE_OBECT } from "../constants/css"
import { fetchText } from "../utils/fetchData"

export const isHTMLMode = mode => mode === MODES.HTML
export const isCSSMode = mode => mode === MODES.CSS
export const isJavaScriptMode = mode => mode === MODES.JAVASCRIPT
export const isResultMode = mode => mode === MODES.RESULT

// Check whether mode is valid
export const isModeValid = mode =>
  values( MODES ).some( theMode => theMode === mode )

export const getStyleDisplayObject = ( show: boolean ) =>
  show ? {} : DISPLAY_NONE_OBECT

export const getTextUrlPromise = ( textUrl: string ) =>
  new Promise( ( resolve, reject ) => {
    fetchText( textUrl )
      .then( text => resolve( text ) )
      .catch( e => reject( e ) )
  } )

export const getTextUrlPromiseSingleArray = ( textUrl: string ) =>
  notNil( textUrl ) ? [ getTextUrlPromise( textUrl ) ] : []
