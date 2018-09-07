import React, { Component } from "react"
import mapStateStyle from "../../utils/mapStateStyle";
import AceEditor from "./AceEditor";
import BasicComponent from "../BasicComponent";
import { JAVASCRIPT } from "../../constants/names";
import { MODES } from "../../constants/types";

export default mapStateStyle()(
  class TheJavaScriptBox extends BasicComponent {
    onChange = ( javascript ) => {
      this.dispatch( { type: 'app/UPDATE_JAVASCRIPT', javascript } )
      this.REFRESH_IFRAME_SYMBOL()
    }
    render() {
      const { javascript } = this
      return <AceEditor 
      value={ javascript }
      mode={ MODES.JAVASCRIPT }
      onChange={ this.onChange }></AceEditor>
    }
  }
)
