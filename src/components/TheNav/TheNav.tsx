import React from "react"
import mapStateStyle from "../../utils/mapStateStyle";
import BasicComponent from "../BasicComponent";
import Button from "./Button";
import { isHTMLMode, isCSSMode, isJavaScriptMode, isResultMode } from "../../appUtils/getters";
import { MODES } from "../../constants/types";
import { NAV_HEIGHT } from "../../constants/numbers";
import { loadScript } from "../../utils/js";
import { ACE_URL } from "../../constants/urls";

export default mapStateStyle({
  container: {
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: `${ NAV_HEIGHT }px`,
    background: 'white',
    border: '1px solid #ddd',
    borderBottom: 'none',
  }
})(
  class TheNav extends BasicComponent {
    updateMode( mode ) {
      this.dispatch( { type: 'app/UPDATE_MODE', mode } )
    }
    onResultClick = () => {
      this.REFRESH_IFRAME_SYMBOL()
      this.updateMode( MODES.RESULT )
    }
    render() {
      const { c, mode, updateMode } = this
      return <div className={ c.container }>
        <Button active={ isHTMLMode( mode ) } onClick={ () => this.updateMode( MODES.HTML ) }>HTML</Button>
        <Button active={ isCSSMode( mode ) } onClick={ () => this.updateMode( MODES.CSS ) }>CSS</Button>
        <Button active={ isJavaScriptMode( mode ) } onClick={ () => this.updateMode( MODES.JAVASCRIPT ) }>JS</Button>
        <Button active={ isResultMode( mode ) } onClick={ this.onResultClick }>Result</Button>
      </div>
    }
  }
)
