import React from 'react'
import Measure from './Measure'
import ResizeContainer from './Resize/ResizeContainer'
import Draggable from 'react-draggable'

import "../css/Grid.css"

interface IProps {
  measures: number
  measureWidth: string
  pad: string
  gap: string
  title: string
}

class Grid extends React.Component<IProps> {
  private containerRef = React.createRef<HTMLDivElement>()
  private titleRef = React.createRef<HTMLDivElement>()
  private gridRef = React.createRef<HTMLDivElement>()

  render() {
    let measures = []
    for (let i = 0; i < this.props.measures; i++) {
      measures.push(
        <Measure
          id={(i + 1).toString()}
          key={i}
          width={this.props.measureWidth}
          padding={this.props.pad}
          margin={this.props.gap}
        />
      )
    }

    return (
      <Draggable handle="#GridDragHandle" nodeRef={this.containerRef}>
        <div ref={this.containerRef} style={{height: "100%"}}>
          <div
            className="Container Move"
            ref={this.titleRef}
            id="GridDragHandle"
          >
            <p className="GridTitle">{this.props.title}</p>
          </div>

          <div style={{ //? Gap
            height: "5px",
            width: "0px"
          }} />

          <div style={{
            position: "absolute"
          }}>
            <ResizeContainer
              margin="0.3em"
              childRef={this.gridRef}
              resizeXCallback={
                (data) => {
                  this.gridRef.current!.style.width = (parseInt(window.getComputedStyle(this.gridRef.current!).width, 10) + data.deltaX).toString() + "px"
                }
              }
              resizeYCallback={
                (data) => {
                  this.gridRef.current!.style.height = (parseInt(window.getComputedStyle(this.gridRef.current!).height, 10) + data.deltaY).toString() + "px"
                }
              }>

              <div ref={this.gridRef} className="Container Grid">
                {measures}
              </div>

            </ResizeContainer>
          </div>
        </div>
      </Draggable>
    )
  }
}

export default Grid
