import React, { Component } from "react"
import mapStateStyle from "../../utils/mapStateStyle";
import BasicComponent from "../BasicComponent";
import { NAV_HEIGHT } from "../../constants/numbers";
import AceEditor from "./AceEditor";

export default mapStateStyle({
  container: {
    height: '100%',
  },
})(
  class CodeBox extends BasicComponent {
    render() {
      const { c } = this
      const { value, onChange } = this.props
      return <div className={ c.container }>
        <AceEditor onChange={ onChange } value={ value }/>
      </div>
    }
  }
)
