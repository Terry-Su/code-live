import React, { Component } from "react"
import mapStateStyle from "../../utils/mapStateStyle";
import BasicComponent from "../BasicComponent";
import { NAV_HEIGHT } from "../../constants/numbers";

export default mapStateStyle({
  container: {
    height: '100%',
  },
  textarea: {
    boxSizing: 'border-box',
    display: 'block',
    width: '100%',
    height: '100%',
    border: 'none',
    padding: `10px`,
    resize: 'none',
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
