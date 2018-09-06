import React, { Component } from "react"
import mapStateStyle from "../utils/mapStateStyle";
import TheResultBox from "./box/TheResultBox";
import BasicComponent from "./BasicComponent";

export default mapStateStyle({
  container: {
    height: '100%'
  }
})(
  class TheRight extends BasicComponent {
    render() {
      const { c } = this
      return <div className={ c.container }>
        <TheResultBox />
      </div>
    }
  }
)
