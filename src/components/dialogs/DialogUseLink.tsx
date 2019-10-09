import React from "react"
import mapStateStyle from "../../utils/mapStateStyle";
import BasicComponent from "../BasicComponent";
import Dialog from "../Dialog";
import composeExportImportData from "../../utils/businessLogic/composeExportImportData";
import Button from "../TheNav/Button";
import { getFormattedDateString } from "../../utils/time";
import download from '../../utils/download'
import styled from 'styled-components'

export default mapStateStyle({
  
})(
  class DialogUseLink extends BasicComponent {
    get linkUrl() {
      const { html = '', css = '', javascript = '', mode, urlParams } = this.app
      const combined = {
        ...urlParams,
        html, css, 
        js: javascript,
        mode,
      }
      let searchStr = ''
      let index = 0
      for ( let key in combined ) {
        if (index > 0) {
          searchStr = `${searchStr}&`
        }
        const value = combined[key]
        const valueStr = encodeURIComponent( value )
        searchStr = `${searchStr}${key}=${valueStr}`
        index++
      }
      return `${location.origin}${location.pathname === "/" ? "" : location.pathname}?${searchStr}`
    }

    get htmlWithEditorStr() {
      const { html = '', css = '', javascript = '', mode, urlParams } = this.app
      const combined = {
        ...urlParams,
        mode,
      }
      let searchStr = ''
      let index = 0
      for ( let key in combined ) {
        if (index > 0) {
          searchStr = `${searchStr}&`
        }
        const value = combined[key]
        const valueStr = encodeURIComponent( value )
        searchStr = `${searchStr}${key}=${valueStr}`
        index++
      }
      const iframeSrc = `${location.origin}${location.pathname === "/" ? "" : location.pathname}?${searchStr}`
      
      
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>html,body{width:100%;height:100%;padding:0;margin:0;}iframe{display:block;width:100%;height:100%;}</style>
</head>
<body>
  <iframe src="${iframeSrc}" frameborder="0" id="codeLiveIframe"></iframe>
</body>
<script>
var data = {
  tsHtml: "${encodeURIComponent(html)}",
  tsCss: "${encodeURIComponent(css)}",
  tsJavascript: "${encodeURIComponent(javascript)}",
  encoded: true,
}
var codeLiveIframe = document.getElementById("codeLiveIframe")
codeLiveIframe.onload = function() {
  codeLiveIframe.contentWindow.postMessage( data, "*" )
}
</script>
</html>
`
    }

    get htmlWithoutEditor() {
      const { html = '', css = '', javascript = '', mode, urlParams } = this.app
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>html,body{width:100%;height:100%;padding:0;margin:0;</style>
  <style>${css || ''}</style>
</head>
<body>
  ${html || ''}
</body>
<script>
${javascript || ''}
</script>
</html>
`
    }

    handleCloseDialog = () => {
        this.dispatch({type: `app/HIDE_DIALOG_USE_LINK`})
    }

    handleClickDownloadHtmlWithEditor = () => {
      const timeString = getFormattedDateString( new Date() )
      const defaultFileName = `code-live--${timeString}`
      const fileName = window.prompt( `File Name:`, defaultFileName )
      if ( fileName == null ) { return }
      
      download( this.htmlWithEditorStr, `${fileName}.html` )
    }

    handleClickDownloadHtmlWithoutEditor = () => {
      const timeString = getFormattedDateString( new Date() )
      const defaultFileName = `html--${timeString}`
      const fileName = window.prompt( `File Name:`, defaultFileName )
      if ( fileName == null ) { return }
      
      download( this.htmlWithoutEditor, `${fileName}.html` )
    }

    render() {
      const { c } = this
      return <Dialog visible={this.app.visibleDialogUseLink} onClose={this.handleCloseDialog}>
        <StyledRoot>
          <h2>Link Url</h2>
          <textarea
            style={{
              width: '80%',
              height: '100px'
            }}
            value={this.linkUrl}
          />
          <br />
          <div className="downloading-html-container">
            <div className="item">
              <div>
                <button onClick={this.handleClickDownloadHtmlWithEditor}>Download HTML with Editor</button>
              </div>
              <textarea
            value={this.htmlWithEditorStr}
          />
            </div>
            <div className="item">
              <div>
                <button onClick={this.handleClickDownloadHtmlWithoutEditor}>Download HTML without Editor</button>
              </div>
              <textarea value={this.htmlWithoutEditor}
          />
            </div>
          </div>
        </StyledRoot>
      </Dialog>
    }
  }
)

const StyledRoot = (styled as any).div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100%;

.downloading-html-container {
  display: flex;
  width: 80%;
  margin-top: 10px;

  >.item {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    textarea {
      box-sizing: border-box;
      width: 100%;
      height: 100px;
      padding: 6px;
      margin-top: 10px;
    }
  }
}

textarea {
  resize: none;
}
` 