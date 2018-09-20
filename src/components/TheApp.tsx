import React, { Component } from "react"
import TheLeft from "./TheLeft"
import TheRight from "./TheRight"
import mapStateStyle from "../utils/mapStateStyle"
import "../styles/global.css"
import BasicComponent from "./BasicComponent"
import TheFoldButton from "./TheFoldButton"
import {
  FOLD_BUTTON_WIDTH,
  FOLD_BUTTON_HEIGHT,
  NAV_HEIGHT
} from "../constants/numbers"
import TheNav from "./TheNav/TheNav"
import { notNil, isNil } from "../utils/lodash"
import {
  isResultMode,
  isModeValid,
  getStyleDisplayObject,
  getTextUrlPromiseSingleArray
} from "../appUtils/getters"
import {
  BASIC_IFRAME_CUSTOM_EVENT,
  BASIC_IFRAME_UPDATE_DATA_FN
} from "../constants/names"
import { getUrlSearchParamsValue, loadScript } from "../utils/js"
import { MODES } from "../constants/types"
import { BORDER_RADIUS } from "../constants/values"
import Display from "./tool/Display"
import { fetchText } from "../utils/fetchData"
import { DEFAULT_DATA_CALLBACK_NAME } from "../constants/default";
import fetchCrossDomainData from "../utils/fetchCrossDomainData";

export default mapStateStyle({
  container: {
    boxSizing: "border-box",
    display: "flex",
    height: "100%",
    padding: `${NAV_HEIGHT}px 0 0 0`
  },
  nav: {
    position: "absolute",
    left: "0",
    top: "0"
    // width: '100%',
  },
  left: {
    boxSizing: "border-box",
    border: "1px solid #ddd",
    height: "100%",
    // borderTopLeftRadius: `${ BORDER_RADIUS }`,
    borderBottomLeftRadius: `${BORDER_RADIUS}`
  },
  right: {
    boxSizing: "border-box",
    width: "50%",
    border: "1px solid #ddd",
    borderTopRightRadius: `${BORDER_RADIUS}`,
    borderBottomRightRadius: `${BORDER_RADIUS}`
  },
  foldButton: {
    position: "absolute",
    top: "50%",
    zIndex: 10,
    marginTop: `-${(FOLD_BUTTON_HEIGHT - NAV_HEIGHT) / 2}px`
  }
})(
  class TheApp extends BasicComponent {
    async componentDidMount() {
      const { dispatch } = this.props

      const data = await this.initializeByUrlParamaters() || []
      isNil(this.mode) && dispatch({ type: "app/UPDATE_MODE", mode: MODES.HTML })

      

      const [defaultHTML, defaultCSS, defaultJS] = data

      notNil(defaultHTML) &&
        dispatch({ type: "app/UPDATE_DEFAULT_HTML", defaultHTML })
      notNil(defaultCSS) &&
        dispatch({ type: "app/UPDATE_DEFAULT_CSS", defaultCSS })
      notNil(defaultJS) &&
        dispatch({ type: "app/UPDATE_DEFAULT_JS", defaultJS })

      if (this.hasOneOfThree) {
        notNil(defaultHTML) &&
          dispatch({ type: "app/UPDATE_HTML", html: defaultHTML })
        notNil(defaultCSS) &&
          dispatch({ type: "app/UPDATE_CSS", css: defaultCSS })
        notNil(defaultJS) &&
          dispatch({ type: "app/UPDATE_JAVASCRIPT", javascript: defaultJS })

        // this.REFRESH_IFRAME_SYMBOL()
      }

      window.removeEventListener("message", this.messageListener)
      window.addEventListener("message", this.messageListener)

      window.removeEventListener(
        BASIC_IFRAME_CUSTOM_EVENT,
        this.basicIframeCustomEventListener
      )
      window.addEventListener(
        BASIC_IFRAME_CUSTOM_EVENT,
        this.basicIframeCustomEventListener
      )
    }

    async initializeByUrlParamaters() {
      const urlParameters: UrlParameters = {
        mode: getUrlSearchParamsValue("mode"),
        width: getUrlSearchParamsValue("width"),
        height: getUrlSearchParamsValue("height"),
        defaultHTMLUrl: getUrlSearchParamsValue("defaultHTMLUrl"),
        defaultCSSUrl: getUrlSearchParamsValue("defaultCSSUrl"),
        defaultJSUrl: getUrlSearchParamsValue("defaultJSUrl"),
        defaultDataUrl: getUrlSearchParamsValue("defaultDataUrl"),
        defaultDataCallbackName: getUrlSearchParamsValue("defaultDataCallbackName")
      }

      const {
        mode,
        width,
        height,
        defaultHTMLUrl,
        defaultCSSUrl,
        defaultJSUrl,
        defaultDataUrl,
        defaultDataCallbackName = DEFAULT_DATA_CALLBACK_NAME
      } = urlParameters

      notNil(mode) &&
        isModeValid(mode) &&
        this.dispatch({ type: "app/UPDATE_MODE", mode })

      if (notNil(defaultDataUrl)) {
        const callbackName = notNil( defaultDataCallbackName ) ? defaultDataCallbackName : DEFAULT_DATA_CALLBACK_NAME
        const data: URLParameterDefaultData = await fetchCrossDomainData( defaultDataUrl, callbackName )

        if ( ! data ) {
          return 
        }

        const { html, css, js } = data

        return [ html, css, js ]
      }

      if (isNil(defaultDataUrl)) {
        let promises: any = [
          ...getTextUrlPromiseSingleArray(defaultHTMLUrl),
          ...getTextUrlPromiseSingleArray(defaultCSSUrl),
          ...getTextUrlPromiseSingleArray(defaultJSUrl)
        ]
        return Promise.all(promises)
      }
    }

    messageListener = ({ data = {} }: any) => {
      let { tsHtml: html, tsCss: css, tsJavascript: javascript } = data
      const { dispatch, defaultHTML, defaultCSS, defaultJS } = this

      html = notNil( html ) ? html : ''
      css = notNil( css ) ? css : ''
      javascript = notNil( javascript ) ? javascript : ''

      isNil(defaultHTML) &&
        notNil(html) &&
        dispatch({ type: "app/UPDATE_HTML", html })
      isNil(defaultCSS) &&
        notNil(css) &&
        dispatch({ type: "app/UPDATE_CSS", css })
      isNil(defaultJS) &&
        notNil(javascript) &&
        dispatch({ type: "app/UPDATE_JAVASCRIPT", javascript })

      // this.REFRESH_IFRAME_SYMBOL()
    }

    basicIframeCustomEventListener = ({ detail }: any) => {
      const { html, css, javascript } = this
      const { [BASIC_IFRAME_UPDATE_DATA_FN]: updateData } = detail

      updateData({ html, css, javascript })
    }

    render() {
      const { c, visibleRight, mode } = this

      const styles = {
        left: {
          width: visibleRight ? "50%" : "100%",
          ...getStyleDisplayObject(!isResultMode(mode))
        },
        right: {
          width: !isResultMode(mode) ? "50%" : "100%",
          ...getStyleDisplayObject(visibleRight || isResultMode(mode))
        },
        foldButton: {
          left: visibleRight ? "50%" : "unset",
          right: visibleRight ? "unset" : "10px",
          marginLeft: visibleRight ? `-${FOLD_BUTTON_WIDTH / 2}px` : "unset"
        }
      }

      return (
        <div className={c.container}>
          <div className={c.nav}>
            <TheNav />
          </div>

          <div className={c.left} style={styles.left}>
            <TheLeft />
          </div>

          <div className={c.right} style={styles.right}>
            <TheRight />
          </div>

          {!isResultMode(mode) && (
            <span className={c.foldButton} style={styles.foldButton}>
              <TheFoldButton />
            </span>
          )}
        </div>
      )
    }
  }
)
