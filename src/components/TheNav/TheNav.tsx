import React from "react"
import mapStateStyle from "../../utils/mapStateStyle";
import BasicComponent from "../BasicComponent";
import Button from "./Button";
import { isHTMLMode, isCSSMode, isJavaScriptMode, isResultMode } from "../../appUtils/getters";
import { modes } from "../../constants/types";
import { NAV_HEIGHT } from "../../constants/numbers";

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
      this.updateMode( modes.RESULT )
    }
    render() {
      const { c, mode, updateMode } = this
      return <div className={ c.container }>
        <Button active={ isHTMLMode( mode ) } onClick={ () => this.updateMode( modes.HTML ) }>HTML</Button>
        <Button active={ isCSSMode( mode ) } onClick={ () => this.updateMode( modes.CSS ) }>CSS</Button>
        <Button active={ isJavaScriptMode( mode ) } onClick={ () => this.updateMode( modes.JAVASCRIPT ) }>JavaScript</Button>
        <Button active={ isResultMode( mode ) } onClick={ this.onResultClick }>Result</Button>
      </div>
    }
  }
)
