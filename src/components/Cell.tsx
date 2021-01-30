import React from 'react'
import '../css/Cell.css'

interface IProps {
  id: string
}

class Cell extends React.Component<IProps> {
  render() {
    return (
      <div className="Cell">
        <p>{this.props.id}</p>
      </div>
    )
  }
}

export default Cell;
