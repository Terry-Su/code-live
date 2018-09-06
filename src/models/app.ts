import { modes } from "../constants/types"

export default {
  namespace: "app",
  state    : {
    mode: modes.HTML,

    visibleRight: true,

    html      : '',
    css       : '',
    javascript: '',



    /**
     * Switch boolean symbol to reload iframe in result box 
     */
    reloadIframeSymbol: true,
  },
  reducers: {
    UPDATE_MODE          : ( state, { mode } ) => ( { ...state, mode } ),
    TOOGLE_VISIABLE_RIGHT: state => ( { ...state, visibleRight: !state.visibleRight } ),
    SHOW_VISIABLE_RIGHT  : state => ( { ...state, visibleRight: true } ),
    HIDE_VISIABLE_RIGHT  : state => ( { ...state, visibleRight: false } ),
    UPDATE_HTML          : ( state, { html } ) => ( { ...state, html } ),
    UPDATE_CSS           : ( state, { css } ) => ( { ...state, css } ),
    UPDATE_JAVASCRIPT    : ( state, { javascript } ) => ( { ...state, javascript } ),
    REFRESH_IFRAME_SYMBOL: state => ( { ...state, reloadIframeSymbol: !state.reloadIframeSymbol } )
  },
  effects: {}
}
