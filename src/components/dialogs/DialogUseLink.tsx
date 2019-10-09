import React from "react"
import mapStateStyle from "../../utils/mapStateStyle";
import BasicComponent from "../BasicComponent";
import Dialog from "../Dialog";
import composeExportImportData from "../../utils/businessLogic/composeExportImportData";

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
      return `${window.location.origin}?${searchStr}`
    }
    handleCloseDialog = () => {
        this.dispatch({type: `app/HIDE_DIALOG_USE_LINK`})
    }
    render() {
      const { c } = this
      return <Dialog visible={this.app.visibleDialogUseLink} onClose={this.handleCloseDialog}>
          <h2>Link Url</h2>
          <textarea
            style={{
              width: '80%',
              height: '100px'
            }}
            value={this.linkUrl}
          />
      </Dialog>
    }
  }
)
