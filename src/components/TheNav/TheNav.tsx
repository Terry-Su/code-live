import React from "react"
import mapStateStyle from "../../utils/mapStateStyle";
import BasicComponent from "../BasicComponent";
import Button from "./Button";
import { isHTMLMode, isCSSMode, isJavaScriptMode, isResultMode } from "../../appUtils/getters";
import { modes } from "../../constants/types";
import { NAV_HEIGHT } from "../../constants/numbers";

export default mapStateStyle({
  container: {
    display: 'flex',
    alignItems: 'center',
    height: `${ NAV_HEIGHT }px`
  }
})(
  class TheNav extends BasicComponent {
    updateMode( mode ) {
      this.dispatch( { type: 'app/UPDATE_MODE', mode } )
    }
    render() {
      const { c, mode, updateMode } = this
      return <div className={ c.container }>
        <Button active={ isHTMLMode( mode ) } onClick={ () => this.updateMode( modes.HTML ) }>HTML</Button>
        <Button active={ isCSSMode( mode ) } onClick={ () => this.updateMode( modes.CSS ) }>CSS</Button>
        <Button active={ isJavaScriptMode( mode ) } onClick={ () => this.updateMode( modes.JAVASCRIPT ) }>JavaScript</Button>
        <Button active={ isResultMode( mode ) } onClick={ () => this.updateMode( modes.RESULT ) }>Result</Button>
      </div>
    }
  }
)
