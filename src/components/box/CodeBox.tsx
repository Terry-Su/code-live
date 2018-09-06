import React, { Component } from "react"
import mapStateStyle from "../../utils/mapStateStyle";
import BasicComponent from "../BasicComponent";
import { NAV_HEIGHT } from "../../constants/numbers";

export default mapStateStyle({
  container: {
    boxSizing: 'border-box',
    height: '100%',
    padding: `${ NAV_HEIGHT + 10}px 10px 10px 10px`
  },
  textarea: {
    width: '100%',
    height: '100%',
  }
})(
  class CodeBox extends BasicComponent {
    render() {
      const { c } = this
      const { value, onChange } = this.props
      return <div className={ c.container }>
        <textarea className={c.textarea} value={ value } onChange={ onChange }></textarea>
       
      </div>
    }
  }
)
