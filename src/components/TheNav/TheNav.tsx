import React from "react"
import mapStateStyle from "../../utils/mapStateStyle";
import BasicComponent from "../BasicComponent";
import Button from "./Button";
import { isHTMLMode, isCSSMode, isJavaScriptMode, isResultMode } from "../../appUtils/getters";
import { MODES } from "../../constants/types";
import { NAV_HEIGHT } from "../../constants/numbers";
import { loadScript } from "../../utils/js";
import { BORDER_RADIUS } from "../../constants/values";
import { getFormattedDateString } from "../../utils/time";
import download from '../../utils/download'

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
    borderTopLeftRadius: `${ BORDER_RADIUS }`,
    borderTopRightRadius: `${ BORDER_RADIUS }`,
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

    handleClickExport = ( ) => {
      const timeString = getFormattedDateString( new Date() )
      const defaultFileName = `code-live--${timeString}`
      const fileName = window.prompt( `File Name:`, defaultFileName )
      
      // # compose data
      const { html, css, javascript, mode, urlParams } = this.app
      const data: ExportImportData = {
        ...urlParams,
        html, css, javascript, mode,
      }
      const dataString = JSON.stringify( data )
      download( dataString, `${fileName}.codelive` )
    }

    handleImportChange = ( event: any ) => {
      const fileInput = event.target
      try {
        const reader = new FileReader()

        reader.onload = ( event: any ) => {
          // Reset value so that uploading file which has 
          // the same name next time still triggers change event
          fileInput.value = ''

          const str = event.target.result
          this.importDataByDataStr( str )
        }
        reader.readAsText( event.target.files[ 0 ] )
      } catch ( e ) {}
    }

    importDataByDataStr = ( dataStr ) => {
      const data: ExportImportData = JSON.parse( dataStr )
      this.dispatch( { type: `app/IMPORT_DATA`, data } )
    }

    render() {
      const { c, mode, updateMode, emptyHTML, emptyCSS, emptyJavaScript } = this
      return <div className={ c.container }>
        <Button active={ isHTMLMode( mode ) } empty={ emptyHTML } onClick={ () => this.updateMode( MODES.HTML ) }>HTML</Button>
        <Button active={ isCSSMode( mode ) } empty={ emptyCSS } onClick={ () => this.updateMode( MODES.CSS ) }>CSS</Button>
        <Button active={ isJavaScriptMode( mode ) } empty={ emptyJavaScript } onClick={ () => this.updateMode( MODES.JAVASCRIPT ) }>JS</Button>
        <Button active={ isResultMode( mode ) } onClick={ this.onResultClick }>Result</Button>
        &nbsp;&nbsp;
        <label className="importInputLabel">
          <input type="file"  className="fileInput" name="upload" onChange={ this.handleImportChange }/>
          Import
        </label>
        <Button onClick={ this.handleClickExport }>Export</Button>
      </div>
    }
  }
)
