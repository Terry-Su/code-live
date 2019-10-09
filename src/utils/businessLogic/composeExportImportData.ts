export default function composeExportImportData( app ) {
    const { html, css, javascript, mode, urlParams } = this.app
    const data: ExportImportData = {
        ...urlParams,
        html, css, javascript, mode,
    }
    return data
}