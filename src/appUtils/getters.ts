import { modes } from "../constants/types"
import { values } from "../utils/lodash"

export const isHTMLMode = mode => mode === modes.HTML
export const isCSSMode = mode => mode === modes.CSS
export const isJavaScriptMode = mode => mode === modes.JAVASCRIPT
export const isResultMode = mode => mode === modes.RESULT


// Check whether mode is valid
export const isModeValid = mode => values( modes ).some( theMode => theMode === mode )