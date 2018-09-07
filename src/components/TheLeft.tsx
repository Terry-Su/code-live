import React, { Component } from "react"
import mapStateStyle from "../utils/mapStateStyle";
import { isHTMLMode, isCSSMode, isJavaScriptMode } from "../appUtils/getters";
import TheHTMLBox from "./box/TheHTMLBox";
import TheCSSBox from "./box/TheCSSBox";
import TheJavaScriptBox from "./box/TheJavaScriptBox";
import BasicComponent from "./BasicComponent";
import Display from "./tool/Display";

export default mapStateStyle({
  container: {
    height: '100%',
  }
})(
  class TheLeft extends BasicComponent {
    render() {
      const { mode, c } = this
      return <div  className={c.container}>
        {
          <Display show={ isHTMLMode( mode ) }>
            <TheHTMLBox />
          </Display>
        }
        {
          <Display show={ isCSSMode( mode ) }>
            <TheCSSBox />
          </Display>
        }
        {
          <Display show={ isJavaScriptMode( mode ) }>
            <TheJavaScriptBox />
          </Display>
        }
      </div>
    }
  }
)
