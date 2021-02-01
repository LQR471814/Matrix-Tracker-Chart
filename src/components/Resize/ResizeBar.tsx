import React from 'react'
import '../../css/ResizeBar.css'
import { ReactComponent as Arrow } from '../../css/assets/arrow.svg'

interface IProps {
  orientation: "horizontal" | "vertical"
  top: string
  left: string
  length: string
}

class ResizeBar extends React.Component<IProps> {
  private activationRef = React.createRef<HTMLDivElement>()
  private barRef = React.createRef<HTMLDivElement>()
  private arrowLeftRef = React.createRef<SVGSVGElement>()
  private arrowRightRef = React.createRef<SVGSVGElement>()

  private width = "2px"
  private expandedWidth = "4px"

  private default = "100%"
  private expanded = "400%"

  private activationWidth = "1000%"

  onHover = () => {
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

  onExit = () => {
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
          top: this.props.top,
          left: this.props.left
        }}
      >
        <div
          className="Bar"
          ref={this.barRef}
          style={{
            position: "relative",
            borderRadius: this.width,
            width: barWidth,
            height: barHeight,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }} />

        <div
        ref={this.activationRef}
          onMouseEnter={this.onHover}
          onMouseLeave={this.onExit}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: activationX,
            height: activationY,
            cursor: "grab"
          }} />

        <Arrow
          ref={this.arrowLeftRef}
          style={{
            position: "absolute",
            top: this.checkY("top"),
            bottom: this.checkY("bottom"),
            left: this.checkX("left"),
            right: this.checkX("right"),
            transform: arrowTransform.replace("-90deg", "90deg").replace("-180deg", "0deg"),
            opacity: "0",
            width: "0.75em",
            height: "0.75em",
            transition: "all ease-in-out 0.15s",
          }} />
        <Arrow
          ref={this.arrowRightRef}
          style={{
            position: "absolute",
            top: this.checkY("top"),
            bottom: this.checkY("bottom"),
            left: this.checkX("left"),
            right: this.checkX("right"),
            transform: arrowTransform,
            opacity: "0",
            width: "0.75em",
            height: "0.75em",
            transition: "all ease-in-out 0.15s",
          }} />
      </div>
    )
  }
}

export default ResizeBar
