import React, { Component } from "react"
import mapStateStyle from "../utils/mapStateStyle";
import BasicComponent from "./BasicComponent";
import { FOLD_BUTTON_WIDTH, FOLD_BUTTON_HEIGHT, FOLD_BUTTON_IMAGE_WIDTH, FOLD_BUTTON_IMAGE_HEIGHT } from "../constants/numbers";
import { FOLD_TO_RIGHT } from "../constants/urls";
import { MAIN_BLUE } from "../constants/colors";

export default mapStateStyle( {
  container: {
    boxSizing: 'border-box',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: `${FOLD_BUTTON_WIDTH}px`,
    height: `${FOLD_BUTTON_HEIGHT}px`,
    cursor: 'pointer',
    borderRadius: `${ FOLD_BUTTON_WIDTH }px`,
    border: `1px solid ${MAIN_BLUE}`,
    background: '#fff',
  },
  image: {
    width: `${FOLD_BUTTON_IMAGE_WIDTH}px`,
    height: `${FOLD_BUTTON_IMAGE_HEIGHT}px`,
  }
} )(
  class TheFoldButton extends BasicComponent {
    onClick = () => {
      this.dispatch( { type: 'app/TOOGLE_VISIABLE_RIGHT' } )
    }

    render() {
      const { c, visibleRight } = this
      const styles = {
        image: {
          transform: visibleRight ?  'unset': 'rotate(180deg)'
        }
      }
      return <span className={c.container} onClick={ this.onClick }>
        <img className={c.image} style={ styles.image } src={ FOLD_TO_RIGHT } alt="Fold"/>
      </span>
    }
  }
)
