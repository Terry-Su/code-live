import React, { Component } from "react"
import mapStateStyle from "../../utils/mapStateStyle";
import CodeBox from "./CodeBox";
import BasicComponent from "../BasicComponent";
import { MODES } from "../../constants/types";

export default mapStateStyle()(
  class TheCSSBox extends BasicComponent {
    onChange = ( css ) => {
      this.dispatch( { type: 'app/UPDATE_CSS', css } )
      this.REFRESH_IFRAME_SYMBOL()
    }
    render() {
      const { css } = this
      return <CodeBox 
      value={ css } mode={ MODES.CSS } onChange={ this.onChange }></CodeBox>
    }
  }
)
