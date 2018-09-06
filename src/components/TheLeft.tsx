import React, { Component } from "react"
import mapStateStyle from "../utils/mapStateStyle";
import { isHTMLMode, isCSSMode, isJavaScriptMode } from "../appUtils/getters";
import TheHTMLBox from "./box/TheHTMLBox";
import TheCSSBox from "./box/TheCSSBox";
import TheJavaScriptBox from "./box/TheJavaScriptBox";
import BasicComponent from "./BasicComponent";

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
          isHTMLMode( mode ) && <TheHTMLBox />
        }
        {
          isCSSMode( mode ) && <TheCSSBox />
        }
        {
          isJavaScriptMode( mode ) && <TheJavaScriptBox />
        }
      </div>
    }
  }
)
