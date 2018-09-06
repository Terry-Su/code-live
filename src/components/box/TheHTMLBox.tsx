import React, { Component } from "react"
import mapStateStyle from "../../utils/mapStateStyle";
import CodeBox from "./CodeBox";
import BasicComponent from "../BasicComponent";

export default mapStateStyle()(
  class TheHTMLBox extends BasicComponent {
    onChange = ( event ) => {
      const { value: html } = event.target
      this.dispatch( { type: 'app/UPDATE_HTML', html } )
      this.REFRESH_IFRAME_SYMBOL()
    }
    render() {
      const { html } = this.props.app
      return <CodeBox value={ html } onChange={ this.onChange }></CodeBox>
    }
  }
)
