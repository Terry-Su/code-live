import React, { Component } from "react"
import mapStateStyle from "../../utils/mapStateStyle";
import AceEditor from "./AceEditor";
import BasicComponent from "../BasicComponent";
import { MODES } from "../../constants/types";

export default mapStateStyle()(
  class TheCSSBox extends BasicComponent {
    onChange = ( css ) => {
      console.log( css )
      this.dispatch( { type: 'app/UPDATE_CSS', css } )
      this.REFRESH_IFRAME_SYMBOL()
    }
    render() {
      const { css } = this
      return <AceEditor 
      value={ css } mode={ MODES.CSS } onChange={ this.onChange }></AceEditor>
    }
  }
)
