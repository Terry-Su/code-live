import React, { Component } from "react"

export default class Display extends Component<any, any> {
  props: Props

  get style() {
    return {
      width: "100%",
      height: "100%",
      ...(this.props.show ? {} : { display: "none" })
    }
  }

  render() {
    return <div style={this.style}>{this.props.children}</div>
  }
}

interface Props {
  show: boolean
  children: any
}
