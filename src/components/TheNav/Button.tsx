import React from "react"
import mapStateStyle from "../../utils/mapStateStyle";
import BasicComponent from "../BasicComponent";
import { MAIN_BLUE } from "../../constants/colors";

export default mapStateStyle({
  container: {
    display: 'inline-flex',
    padding: '0px 10px',
    cursor: 'pointer',
    '&:hover': {
      color: `${ MAIN_BLUE }!important`
    }
  }
})(
  class Button extends BasicComponent {
    props: Props

    render() {
      const { c } = this
      const { active=false, empty= false, onClick } = this.props
      const style = {
        color: active ?
         '#4169e1' : 
         (
          empty ?
          '#aaa':
          '#666'
         ),
      }
      return <span className={c.container} style={style} onClick={ onClick }>
          { this.props.children || 'Button' }
      </span>
    }
  }
)

interface Props {
  active: boolean,
  empty: boolean,
  children: any,

  onClick: any
}