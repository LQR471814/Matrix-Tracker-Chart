import React from 'react'
import Measure from './Measure'

import "../css/Grid.css"

interface IProps {
  measures: number
  measureWidth: string
  measureHeight: string
  pad: string
  gap: string
}

class Grid extends React.Component<IProps> {
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
      <div className="Grid">
        {measures}
      </div>
    )
  }
}

export default Grid;
