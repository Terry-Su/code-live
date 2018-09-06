import React, { Component } from "react"
import mapStateStyle from "../../utils/mapStateStyle";
import CodeBox from "./CodeBox";
import BasicComponent from "../BasicComponent";

export default mapStateStyle()(
  class TheCSSBox extends BasicComponent {
    onChange = ( event ) => {
      const { value: css } = event.target
      this.dispatch( { type: 'app/UPDATE_CSS', css } )
      this.REFRESH_IFRAME_SYMBOL()
    }
    render() {
      const { css } = this
      return <CodeBox value={ css } onChange={ this.onChange }></CodeBox>
    }
  }
)
