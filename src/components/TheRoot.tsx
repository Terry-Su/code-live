import React, { Component } from "react"
import TheApp from "./TheApp";
import TheNav from "./TheNav/TheNav";

/**
 * This component can be used to 
 * present either app component or
 * single test component 
 */
export default class TheRoot extends Component {
  render() {
    return <TheApp />
  }
}