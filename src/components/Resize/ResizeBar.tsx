import React from 'react'
import '../../css/Resize.css'
import { ReactComponent as Arrow } from '../../css/assets/arrow.svg'

interface IProps {
  orientation: "horizontal" | "vertical"
  length: string
}

class ResizeBar extends React.Component<IProps> {
  public activationRef = React.createRef<HTMLDivElement>()
  private barRef = React.createRef<HTMLDivElement>()
  private arrowLeftRef = React.createRef<SVGSVGElement>()
  private arrowRightRef = React.createRef<SVGSVGElement>()

  private width = "2px"
  private expandedWidth = "4px"
  private clickedBarWidth = "4.5px"

  private default = "100%"
  private expanded = "400%"
  private clicked = "200%"

  private activationWidth = "1000%"

  private mouseIsDown = false

  onMouseDown = () => {
    document.addEventListener("mouseup", this.onMouseUp)

    this.mouseIsDown = true

    this.barRef.current!.style.backgroundColor = "#ffffff"

    if (this.props.orientation === "horizontal") {
      this.barRef.current!.style.height = this.clickedBarWidth

      this.arrowLeftRef.current!.style.top = this.clicked
      this.arrowRightRef.current!.style.bottom = this.clicked
    } else {
      this.barRef.current!.style.width = this.clickedBarWidth

      this.arrowLeftRef.current!.style.right = this.clicked
      this.arrowRightRef.current!.style.left = this.clicked
    }
  }

  onMouseUp = () => {
    document.removeEventListener("mouseup", this.onMouseUp)

    this.mouseIsDown = false

    this.barRef.current!.style.backgroundColor = "#ffffffbb"

    if (this.props.orientation === "horizontal") {
      this.barRef.current!.style.height = this.expandedWidth

      this.arrowLeftRef.current!.style.top = this.expanded
      this.arrowRightRef.current!.style.bottom = this.expanded
    } else {
      this.barRef.current!.style.width = this.expandedWidth

      this.arrowLeftRef.current!.style.right = this.expanded
      this.arrowRightRef.current!.style.left = this.expanded
    }
  }

  onHover = () => {
    if (this.mouseIsDown === false) {
      this.barRef.current!.style.backgroundColor = "#ffffffbb"

      if (this.props.orientation === "horizontal") {
        this.barRef.current!.style.width = this.props.length
        this.barRef.current!.style.height = this.expandedWidth

        this.arrowLeftRef.current!.style.top = this.expanded
        this.arrowRightRef.current!.style.bottom = this.expanded
      } else {
        this.barRef.current!.style.width = this.expandedWidth

        this.arrowLeftRef.current!.style.right = this.expanded
        this.arrowRightRef.current!.style.left = this.expanded
      }

      this.arrowLeftRef.current!.style.opacity = "1"
      this.arrowRightRef.current!.style.opacity = "1"
    }
  }

  onExit = () => {
    if (this.mouseIsDown === false) {
      if (this.props.orientation === "horizontal") {
        this.barRef.current!.style.width = this.props.length
        this.barRef.current!.style.height = this.width

        this.arrowLeftRef.current!.style.top = this.default
        this.arrowRightRef.current!.style.bottom = this.default
      } else {
        this.barRef.current!.style.width = this.width

        this.arrowLeftRef.current!.style.right = this.default
        this.arrowRightRef.current!.style.left = this.default
      }

      this.arrowLeftRef.current!.style.opacity = "0"
      this.arrowRightRef.current!.style.opacity = "0"
    }
  }

  checkX = (attr: "right" | "left") => { //? Assigned to right and left
    if (this.props.orientation === "horizontal" && attr === "left") { //? The first 2 checks are for horizontal orientations since if you define left: 50% but not right: 50% they'll end up in two different locations and if you define them both it will break the centering on the vertical orientation
      return ""
    } else if (this.props.orientation === "horizontal" && attr === "right") { //? Ensures css property used will always be "right" (To center arrows in horizontal orientation)
      return "50%"
    } else if (attr === "left") {
      return ""
    } else if (attr === "right") { //? Ensures css property used will always be "right"
      return this.default
    }
  }

  checkY = (attr: "top" | "bottom") => { //? Assigned to top and bottom
    if (this.props.orientation === "horizontal" && attr === "top") { //? The first 2 checks are for horizontal orientations since if you define left: 50% but not right: 50% they'll end up in two different locations and if you define them both it will break the centering on the vertical orientation
      return ""
    } else if (this.props.orientation === "horizontal" && attr === "bottom") { //? Ensures css property used will always be "bottom"
      return this.default
    } else if (attr === "top") {
      return ""
    } else if (attr === "bottom") { //? Ensures css property used will always be "bottom" in vertical orientation
      return "50%"
    }
  }

  render() {
    var barWidth = this.width
    var barHeight = this.props.length

    var arrowTransform = "translateY(-50%) rotate(-90deg)"

    var activationX = this.activationWidth
    var activationY = this.props.length

    if (this.props.orientation === "horizontal") {
      barWidth = this.props.length
      barHeight = this.width

      arrowTransform = "translateX(-50%) rotate(-180deg)"

      activationX = this.props.length
      activationY = this.activationWidth
    }

    return (
      <div
        style={{
          position: "absolute",
          width: barWidth,
          height: barHeight,
          top: "0%",
          left: "0%"
        }}
      >
        <div
          className="Bar"
          ref={this.barRef}
          style={{
            borderRadius: this.width,
            width: barWidth,
            height: barHeight,
          }} />

        <div
          ref={this.activationRef}
          onMouseEnter={this.onHover}
          onMouseLeave={this.onExit}
          onMouseDown={this.onMouseDown}
          className="Activation"
          style={{
            width: activationX,
            height: activationY,
          }} />

        <Arrow
          ref={this.arrowLeftRef}
          className="Arrow"
          style={{
            top: this.checkY("top"),
            bottom: this.checkY("bottom"),
            left: this.checkX("left"),
            right: this.checkX("right"),
            transform: arrowTransform.replace("-90deg", "90deg").replace("-180deg", "0deg"),
          }} />
        <Arrow
          ref={this.arrowRightRef}
          className="Arrow"
          style={{
            top: this.checkY("top"),
            bottom: this.checkY("bottom"),
            left: this.checkX("left"),
            right: this.checkX("right"),
            transform: arrowTransform,
          }} />
      </div>
    )
  }
}

export default ResizeBar
