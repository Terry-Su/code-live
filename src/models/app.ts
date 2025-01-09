import { MODES } from "../constants/types"

export default {
  namespace: "app",
  state    : {
    mode: "html",

    visibleRight: true,

    html       : "",
    css        : "",
    javascript : "",
    defaultHTML: "",
    defaultCSS : "",
    defaultJS  : "",



    /**
     * Switch boolean symbol to reload iframe in result box 
     */
    reloadIframeSymbol: true,


    aceLoaded: false,

    // # data
    urlParams: {},

    // # dialog
    visibleDialogUseLink: false,
  },
  reducers: {
    UPDATE_MODE          : ( state, { mode } ) => ( { ...state, mode } ),
    TOOGLE_VISIABLE_RIGHT: state => ( { ...state, visibleRight: !state.visibleRight } ),
    SHOW_VISIABLE_RIGHT  : state => ( { ...state, visibleRight: true } ),
    HIDE_VISIABLE_RIGHT  : state => ( { ...state, visibleRight: false } ),
    UPDATE_HTML          : ( state, { html } ) => ( { ...state, html } ),
    UPDATE_CSS           : ( state, { css } ) => ( { ...state, css } ),
    UPDATE_JAVASCRIPT    : ( state, { javascript } ) => ( { ...state, javascript } ),
    UPDATE_DEFAULT_HTML  : ( state, { defaultHTML } ) => ( { ...state, defaultHTML } ),
    UPDATE_DEFAULT_CSS   : ( state, { defaultCSS } ) => ( { ...state, defaultCSS } ),
    UPDATE_DEFAULT_JS    : ( state, { defaultJS } ) => ( { ...state, defaultJS } ),
    REFRESH_IFRAME_SYMBOL: state => ( { ...state, reloadIframeSymbol: !state.reloadIframeSymbol } ),
    ACE_LOADED           : state => ( { ...state, aceLoaded: true } ),
    // # data
    UPDATE_URL_PARAMS    : ( state, { urlParams } ) => ( { ...state, urlParams } ),
    // ## import data
    IMPORT_DATA          : ( state, { data = {} } ) => ( {
      ...state,
      ...data,
    } ),

    // # dialog
    SHOW_DIALOG_USE_LINK: state => ( { ...state, visibleDialogUseLink: true } ),
    HIDE_DIALOG_USE_LINK: state => ( { ...state, visibleDialogUseLink: false } ),
  },
  effects: {}
}
