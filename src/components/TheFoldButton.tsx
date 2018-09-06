import React, { Component } from "react"
import mapStateStyle from "../utils/mapStateStyle";
import BasicComponent from "./BasicComponent";
import { FOLD_BUTTON_WIDTH, FOLD_BUTTON_HEIGHT } from "../constants/numbers";

export default mapStateStyle( {
  container: {
    width: `${FOLD_BUTTON_WIDTH}px`,
    height: `${FOLD_BUTTON_HEIGHT}px`,
  }
} )(
  class TheFoldButton extends BasicComponent {
    onClick = () => {
      this.dispatch( { type: 'app/TOOGLE_VISIABLE_RIGHT' } )
    }

    render() {
      const { c } = this
      return <button className={c.container} onClick={ this.onClick }>Fold</button>
    }
  }
)
