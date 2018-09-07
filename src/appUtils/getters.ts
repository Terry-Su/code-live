import { MODES } from "../constants/types"
import { values } from "../utils/lodash"

export const isHTMLMode = mode => mode === MODES.HTML
export const isCSSMode = mode => mode === MODES.CSS
export const isJavaScriptMode = mode => mode === MODES.JAVASCRIPT
export const isResultMode = mode => mode === MODES.RESULT


// Check whether mode is valid
export const isModeValid = mode => values( MODES ).some( theMode => theMode === mode )