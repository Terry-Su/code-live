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
import { notNil } from "../utils/lodash"
import { isResultMode, isModeValid, getStyleDisplayObject } from "../appUtils/getters"
import {
  BASIC_IFRAME_CUSTOM_EVENT,
  BASIC_IFRAME_UPDATE_DATA_FN
} from "../constants/names"
import { getUrlSearchParamsValue, loadScript } from "../utils/js"
import { MODES } from "../constants/types"
import { BORDER_RADIUS } from "../constants/values"
import Display from "./tool/Display"

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
    height: '100%',
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
    componentDidMount() {
      const { dispatch } = this.props

      dispatch( {type: 'app/UPDATE_MODE', mode: MODES.HTML } )
      this.initializeByUrlParamaters()


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

    initializeByUrlParamaters() {
      const urlParameters: UrlParameters = {
        mode: getUrlSearchParamsValue("mode"),
        width: getUrlSearchParamsValue("width"),
        height: getUrlSearchParamsValue("height")
      }

      const { mode, width, height } = urlParameters
      notNil(mode) &&
        isModeValid(mode) &&
        this.dispatch({ type: "app/UPDATE_MODE", mode })
    }

    messageListener = ({ data = {} }: any) => {
      const { tsHtml: html, tsCss: css, tsJavascript: javascript } = data
      const { dispatch } = this

      notNil(html) && dispatch({ type: "app/UPDATE_HTML", html })
      notNil(css) && dispatch({ type: "app/UPDATE_CSS", css })
      notNil(javascript) &&
        dispatch({ type: "app/UPDATE_JAVASCRIPT", javascript })
      this.REFRESH_IFRAME_SYMBOL()
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
          ...getStyleDisplayObject( !isResultMode(mode) ),
        },
        right: {
          width: !isResultMode(mode) ? "50%" : "100%",
          ...getStyleDisplayObject( visibleRight || isResultMode(mode) ),
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
