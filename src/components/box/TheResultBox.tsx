import React, { Component } from "react"
import mapStateStyle from "../../utils/mapStateStyle"
import BasicComponent from "../BasicComponent"
import { BASIC_IFRAME_URL } from "../../constants/urls"
import { BORDER_RADIUS } from "../../constants/values";

export default mapStateStyle({
  container: {
    height: "100%",
    background: '#fff',
    borderTopRightRadius: `${ BORDER_RADIUS }`,
    borderBottomRightRadius: `${ BORDER_RADIUS }`,
  },
  iframe: {
    display: 'block',
    width: '100%',
    height: '100%',
    borderTopRightRadius: `${ BORDER_RADIUS }`,
    borderBottomRightRadius: `${ BORDER_RADIUS }`,
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
