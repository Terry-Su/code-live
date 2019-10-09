import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

interface Props {
  visible: boolean;
  visibleCloseButton?: boolean;
  onClose?: () => void;
}

export default class Dialog extends Component<Props> {
  render() {
    const {
      visible,
      visibleCloseButton = true,
      onClose,
      children,
    } = this.props
    return (
      visible &&
      ReactDOM.createPortal(
        <StyledModalRoot>
          <div className="box">
            {children}
            {visibleCloseButton && (
              <>
                <br />
                <button onClick={() => onClose && onClose()}>Close</button>
              </>
            )}
          </div>
        </StyledModalRoot>,
        document.body
      )
    )
  }
}

const StyledModalRoot = (styled as any).div`
  position: fixed;
  z-index: 1001;
  left: 0;
  top: 0;
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);

  > .box {
    position: relative;
    display: grid;
    place-items: center;
    width: 80%;
    height: 80%;
    background: white;
    border-radius: 10px;
    box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
      0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12);
  }
`
