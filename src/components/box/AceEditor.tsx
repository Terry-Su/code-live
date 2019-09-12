import React from "react"
import mapStateStyle from "../../utils/mapStateStyle"
import BasicComponent from "../BasicComponent"
import { notNil, debounce } from "../../utils/lodash"
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
      const debounced = debounce( onChange, 800 )
      editor.session.off("change", debounced)
      editor.session.on("change", debounce( debounced ))
      
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

      // Hide extra vertical line
      editor.setShowPrintMargin(false)

      // Enable word wrapping
      editor.getSession().setOption('indentedSoftWrap', false)
      editor.getSession().setUseWrapMode(true)

      // # highlight
      editor.setOption('highlightActiveLine', false)
      editor.setOption('highlightGutterLine', false)
      // editor.renderer.$cursorLayer.element.style.display = "none"
    }

    componentDidUpdate( prevProps ) {
      const { value } = this.props
      const { aceValue, editor } = this

      if (notNil( value ) && notNil( aceValue ) && aceValue !== value) {
        this.silent = true
        editor.setValue(value, 1)
        this.silent = false
      }

      // Watch the change of 'visibleRight'
      if ( prevProps.app.visibleRight !== this.visibleRight ) {
        editor.getSession().setUseWrapMode( false )
        editor.getSession().setUseWrapMode( true )
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
