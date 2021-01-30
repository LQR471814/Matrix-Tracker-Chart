import React from 'react'
import Cell from './Cell'

interface IProps {
  measures: number
  size: string
}

class Grid extends React.Component<IProps> {
  render() {
    let cells = []
    for (let i = 0; i < this.props.measures; i++) {
      cells.push(<Cell id={i.toString()} />)
    }

    return (
      <div
        style={{
          display: "grid",
          gap: "8px",
          gridTemplateColumns: `repeat(auto-fit, ${this.props.size})`,
          gridTemplateRows: `repeat(auto-fit, ${this.props.size})`
          // gridTemplateColumns: `repeat(minmax(${this.props.size}, ${this.props.size}), ${this.props.columns})`,
          // gridTemplateRows: `repeat(minmax(${this.props.size}, ${this.props.size}), ${this.props.rows})`
        }}>
        {cells}

      </div>
    )
  }
}

export default Grid;
