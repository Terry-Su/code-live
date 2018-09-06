import React from "react"
import mapStateStyle from "../../utils/mapStateStyle";
import BasicComponent from "../BasicComponent";

export default mapStateStyle({
  container: {
    display: 'inline-flex',
    padding: '0px 10px',
    cursor: 'pointer',
    '&:hover': {
      color: '#4169e1!important'
    }
  }
})(
  class Button extends BasicComponent {
    render() {
      const { c } = this
      const { active=false, empty= true } = this.props
      const style = {
        color: active ?
         '#4169e1' : 
         (
          empty ?
          '#aaa':
          'unset'
         ),
      }
      return <span className={c.container} style={style} onClick={ this.props.onClick }>
          { this.props.children || 'Button' }
      </span>
    }
  }
)
