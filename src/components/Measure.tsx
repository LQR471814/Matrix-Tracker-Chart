import React from 'react'
import '../css/Measure.css'

interface IProps {
  id: string
  width: string
  height: string
  padding: string
  margin: string
}

class Measure extends React.Component<IProps> {
  render() {
    return (
      <div
        className="Measure"
        style={{
          width: this.props.width,
          height: this.props.height,
          padding: this.props.padding,
          margin: this.props.margin,
          flexGrow: 1,
          flexShrink: 1
        }}
      >
        <p className="Title">{this.props.id}</p>
      </div>
    )
  }
}

export default Measure;
