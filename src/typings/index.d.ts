interface UrlParameters {
    html: string
    css: string
    js: string
    mode: any
    width: string
    height: string
    defaultHTMLUrl: string
    defaultCSSUrl: string
    defaultJSUrl: string
    defaultDataUrl: string
    defaultDataCallbackName: string
}


interface URLParameterDefaultData {
    html: string
    css: string
    js: string
}


interface ExportImportData extends UrlParameters {
    javascript: string
}

declare module "*.svg" {
    
}

declare const window: any