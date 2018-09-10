import React from "react"
import mapStateStyle from "../../utils/mapStateStyle"
import BasicComponent from "../BasicComponent"
import { notNil } from "../../utils/lodash"
import { MODES } from "../../constants/types";
import { BORDER_RADIUS } from "../../constants/values";

export default mapStateStyle({
  container: {
    boxSizing: "border-box",
    display: "block",
    width: "100%",
    height: "100%",
    border: "none",
    padding: `10px`,
    // borderTopLeftRadius: `${ BORDER_RADIUS }`,
    borderBottomLeftRadius: `${ BORDER_RADIUS }`,
  }
})(
  class AceEditor extends BasicComponent {
    aceRef: any
    editor: any

    props: Props

    // for updating value silently without
    // excuting main content in onChange event
    silent: boolean = false

    constructor(props) {
      super(props)

      this.aceRef = React.createRef()
    }

    get aceValue() {
      return this.editor.getValue()
    }

    get Mode(): any {
      const nameMap = {
        [ MODES.HTML ]: 'html',
        [ MODES.CSS ]: 'css',
        [ MODES.JAVASCRIPT ]: 'javascript',
      }
      const name = nameMap[ this.props.mode ]
      return notNil( name ) ? window['ace'].require(`ace/mode/${name}`).Mode: null    
    }

    componentDidMount() {
      const { current: aceDom } = this.aceRef

      this.editor = window["ace"].edit(aceDom)
      const { editor, onChange } = this
      // Event
      editor.session.off("change", onChange)
      editor.session.on("change", onChange)
      
      // Language Mode
      const { Mode } = this
      notNil(Mode) && editor.session.setMode(new Mode());

       // Theme
       editor.setTheme("ace/theme/chrome");

      /* Other Config */
      // Syntax validation
      editor.session.setOption("useWorker", false);

      // Line numbers bar
      editor.renderer.setShowGutter(false);


      editor.setShowPrintMargin(false)
      // editor.renderer.setOption('fixedWidthGutter', false);
      // editor.renderer.setOption('fixedWidthGutter', false);

    }

    componentDidUpdate() {
      const { value } = this.props
      const { aceValue } = this

      if (notNil( value ) && notNil( aceValue ) && aceValue !== value) {
        this.silent = true
        this.editor.setValue(value, 1)
        this.silent = false
      }
    }

    onChange = (event, session) => {
      if (this.silent) {
        return
      }

      const { aceValue } = this
      const { onChange } = this.props
      onChange && onChange(aceValue)
    }

    render() {
      const { c } = this
      return <div className={c.container} ref={this.aceRef} />
    }
  }
)

interface Props {
  value: string
  onChange: Function
  mode: string
}
