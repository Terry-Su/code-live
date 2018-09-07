import React, { Component } from "react"
import mapStateStyle from "../../utils/mapStateStyle"
import BasicComponent from "../BasicComponent"
import { BASIC_IFRAME_URL } from "../../constants/urls"

export default mapStateStyle({
  container: {
    height: "100%",
    background: '#fff'
  },
  iframe: {
    display: 'block',
    width: '100%',
    height: '100%',
  },
})(
  class TheResultBox extends BasicComponent {
    render() {
      const { c, reloadIframeSymbol } = this
      return (
        <div
          className={c.container}
          dangerouslySetInnerHTML={{
            __html: `<iframe src="${BASIC_IFRAME_URL}" class=${ c.iframe } frameBorder="0"></iframe><span style="display: none;">${ reloadIframeSymbol }</span>`
          }}
        />
      )
    }
  }
)
