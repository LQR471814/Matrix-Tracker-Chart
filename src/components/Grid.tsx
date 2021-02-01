import React from 'react'
import Measure from './Measure'
import DraggableCore from 'react-draggable'
import ResizeContainer from './Resize/ResizeContainer'
import type { DraggableEventHandler, DraggableEvent, DraggableData } from 'react-draggable'

import "../css/Grid.css"

interface IProps {
  measures: number
  measureWidth: string
  measureHeight: string
  pad: string
  gap: string
  title: string
}

class Grid extends React.Component<IProps> {
  private containerRef = React.createRef<HTMLDivElement>()
  private titleRef = React.createRef<HTMLDivElement>()

  private titleDown = false

  onDrag: DraggableEventHandler = (e: DraggableEvent, data: DraggableData) => {
    console.log("dragging")
    if (this.titleDown === false) {
      return false
    }
  }

  onTitleDown = () => {
    this.titleDown = true
  }

  onTitleUp = () => {
    this.titleDown = false
  }

  render() {
    let measures = []
    for (let i = 0; i < this.props.measures; i++) {
      measures.push(
        <Measure
          id={(i + 1).toString()}
          key={i}
          width={this.props.measureWidth}
          height={this.props.measureHeight}
          padding={this.props.pad}
          margin={this.props.gap}
        />
      )
    }

    return (
      <DraggableCore onDrag={this.onDrag} nodeRef={this.containerRef}>
        <div ref={this.containerRef}>
          <div
            className="Container Move"
            ref={this.titleRef}
            onMouseDown={this.onTitleDown}
            onMouseUp={this.onTitleUp}
            onTouchStart={this.onTitleDown}
            onTouchEnd={this.onTitleUp}
          >
            <p className="Title">{this.props.title}</p>
          </div>

          <div style={{ //? Gap
            height: "5px",
            width: "0px"
          }} />

          <div style={{
            position: "absolute",
            width: "50%"
          }}>
            <ResizeContainer margin="0.3em">
              <div className="Container Grid">
                {measures}
              </div>
            </ResizeContainer>
          </div>
        </div>
      </DraggableCore>
    )
  }
}

export default Grid
