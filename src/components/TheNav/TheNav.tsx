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
import { MAIN_BLUE } from "../../constants/colors";
import DialogUseLink from "../dialogs/DialogUseLink";
import composeExportImportData from "../../utils/businessLogic/composeExportImportData";

export default mapStateStyle({
  container: {
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: `${ NAV_HEIGHT }px`,
    background: 'white',
    border: '1px solid #ddd',
    borderBottom: 'none',
    borderTopLeftRadius: `${ BORDER_RADIUS }`,
    borderTopRightRadius: `${ BORDER_RADIUS }`,
  },
  importingInputLabel: {
    display: 'inline-flex',
    padding: '0px 10px',
    marginLeft: 'auto',
    color: '#666',
    cursor: 'pointer',
    '&:hover': {
      color: `${ MAIN_BLUE }!important`
    }
  },
  importingInput: {
    display: 'none'
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
      if ( fileName == null ) { return }
      
      // # compose data
      const data: ExportImportData = composeExportImportData( this.app )
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

    handleClickCopyLink = () => {
      this.dispatch({type: `app/SHOW_DIALOG_USE_LINK`})
    }

    render() {
      const { c, mode, updateMode, emptyHTML, emptyCSS, emptyJavaScript } = this
      return <div className={ c.container }>
        <Button active={ isHTMLMode( mode ) } empty={ emptyHTML } onClick={ () => this.updateMode( MODES.HTML ) }>HTML</Button>
        <Button active={ isCSSMode( mode ) } empty={ emptyCSS } onClick={ () => this.updateMode( MODES.CSS ) }>CSS</Button>
        <Button active={ isJavaScriptMode( mode ) } empty={ emptyJavaScript } onClick={ () => this.updateMode( MODES.JAVASCRIPT ) }>JS</Button>
        <Button active={ isResultMode( mode ) } onClick={ this.onResultClick }>Result</Button>
        <label className={c.importingInputLabel}>
          <input type="file"  className={c.importingInput} name="upload" onChange={ this.handleImportChange }/>
          Import
        </label>
        <Button onClick={ this.handleClickExport }>Export</Button>
        <Button onClick={ this.handleClickCopyLink }>Use Link</Button>
        <DialogUseLink />
      </div>
    }
  }
)
