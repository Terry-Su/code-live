import React, { Component } from "react"
import mapStateStyle from "../../utils/mapStateStyle";
import AceEditor from "./AceEditor";
import BasicComponent from "../BasicComponent";
import { MODES } from "../../constants/types";

export default mapStateStyle()(
  class TheHTMLBox extends BasicComponent {
    onChange = ( html ) => {
      this.dispatch( { type: 'app/UPDATE_HTML', html } )
      this.REFRESH_IFRAME_SYMBOL()
    }
    render() {
      const { html } = this.props.app
      return <AceEditor value={ html } mode={MODES.HTML} onChange={ this.onChange }></AceEditor>
    }
  }
)
