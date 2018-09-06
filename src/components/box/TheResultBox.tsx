import React, { Component } from "react"
import mapStateStyle from "../../utils/mapStateStyle"
import BasicComponent from "../BasicComponent"
import { BASIC_IFRAME_URL } from "../../constants/urls"

export default mapStateStyle({
  container: {
    height: "100%",
    background: '#fff'
  }
})(
  class TheResultBox extends BasicComponent {
    shouldComponentUpdate(nextProps): boolean {
      const { reloadIframeSymbol  } = nextProps.app
      return this.reloadIframeSymbol !== reloadIframeSymbol 
    }
    render() {
      const { c, reloadIframeSymbol } = this
      return (
        <div
          className={c.container}
          dangerouslySetInnerHTML={{
            __html: `<iframe src="${BASIC_IFRAME_URL}" frameBorder="0" width="100%" height="100%"></iframe><span style="display: none;">${ reloadIframeSymbol }</span>`
          }}
        />
      )
    }
  }
)
