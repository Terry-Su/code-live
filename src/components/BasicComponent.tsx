import React, { Component } from "react"

export default class BasicComponent extends Component<any, any> {
  mutations: any
  get c() {
    return this.props.classes
  }

  get dispatch() {
    return this.props.dispatch
  }

  get app() {
    return this.props.app
  }

  get mode() {
    return this.app.mode
  }

  get visibleRight() {
    return this.app.visibleRight
  }

  get html() {
    return this.app.html
  }

  get css() {
    return this.app.css
  }

  get javascript() {
    return this.app.javascript
  }

  get reloadIframeSymbol() {
    return this.app.reloadIframeSymbol
  }
 
  /* Mutations */
  REFRESH_IFRAME_SYMBOL() {
    this.dispatch( { type: 'app/REFRESH_IFRAME_SYMBOL' } )
  }
}
