import React, { Component } from "react"
import mapStateStyle from "../../utils/mapStateStyle";
import CodeBox from "./CodeBox";
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
      return <CodeBox 
      value={ javascript }
      mode={ MODES.JAVASCRIPT }
      onChange={ this.onChange }></CodeBox>
    }
  }
)
