import React, { Component } from "react"
import mapStateStyle from "../../utils/mapStateStyle";
import BasicComponent from "../BasicComponent";
import { NAV_HEIGHT } from "../../constants/numbers";
import AceEditor from "./AceEditor";

export default mapStateStyle({
  container: {
    boxSizing: 'border-box',
    height: '100%',
    padding: '10px 10px',
    background: 'white',
    fontSize: '16px!important',
  },
})(
  class CodeBox extends BasicComponent {
    render() {
      const { c } = this
      return <div className={ c.container }>
        <AceEditor { ...this.props }/>
      </div>
    }
  }
)
