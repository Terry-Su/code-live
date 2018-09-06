import React, { Component } from "react"
import mapStateStyle from "../../utils/mapStateStyle";
import CodeBox from "./CodeBox";
import BasicComponent from "../BasicComponent";

export default mapStateStyle()(
  class TheJavaScriptBox extends BasicComponent {
    onChange = ( event ) => {
      const { value: javascript } = event.target
      this.dispatch( { type: 'app/UPDATE_JAVASCRIPT', javascript } )
      this.REFRESH_IFRAME_SYMBOL()
    }
    render() {
      const { javascript } = this
      return <CodeBox value={ javascript } onChange={ this.onChange }></CodeBox>
    }
  }
)
