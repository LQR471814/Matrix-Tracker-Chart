import React from 'react'
import ResizeBar from './ResizeBar'
import Draggable from 'react-draggable'
import type { DraggableEventHandler, DraggableEvent, DraggableData } from 'react-draggable'

import '../../css/Resize.css'

interface IProps {
  children: React.ReactElement,
  childRef: React.RefObject<any>,
  margin: string,
  resizeXCallback: (data: DraggableData) => void,
  resizeYCallback: (data: DraggableData) => void
}

class ResizeContainer extends React.Component<IProps> {
  public verticalBarRef = React.createRef<ResizeBar>()
  public horizontalBarRef = React.createRef<ResizeBar>()

  private verticalBarContainerRef = React.createRef<HTMLDivElement>()
  private horizontalBarContainerRef = React.createRef<HTMLDivElement>()

  private childContainerRef = React.createRef<HTMLDivElement>()

  onDragX: DraggableEventHandler = (e: DraggableEvent, data: DraggableData) => {
    this.childContainerRef.current!.style.width = window.getComputedStyle(this.props.childRef.current!).width
    this.props.resizeXCallback(data)
  }

  onDragY: DraggableEventHandler = (e: DraggableEvent, data: DraggableData) => {
    this.childContainerRef.current!.style.height = window.getComputedStyle(this.props.childRef.current!).height
    this.props.resizeYCallback(data)
  }

  render() {
    return (
      <div ref={this.childContainerRef} style={{ width: "100%", height: "100%" }}>
        {this.props.children}
        <Draggable axis="x" onDrag={this.onDragX} nodeRef={this.verticalBarContainerRef}>
          <div
            className="ResizeContainer"
            ref={this.verticalBarContainerRef}
            style={{
              left: `calc(${this.props.margin} + 100%)`,
            }}>
            <ResizeBar ref={this.verticalBarRef} orientation="vertical" length="100%" />
          </div>
        </Draggable>

        <Draggable axis="y" onDrag={this.onDragY} nodeRef={this.horizontalBarContainerRef}>
          <div
            className="ResizeContainer"
            ref={this.horizontalBarContainerRef}
            style={{
              top: `calc(${this.props.margin} + 100%)`,
            }}>
            <ResizeBar ref={this.horizontalBarRef} orientation="horizontal" length="100%" />
          </div>
        </Draggable>
      </div>
    )
  }
}

export default ResizeContainer
