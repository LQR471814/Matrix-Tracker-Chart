import React from 'react'

interface IProps {
  children: React.ReactElement[]
}

class ResizeContainer extends React.Component<IProps> {
  render() {
    return (
      <div>
        { this.props.children &&
          this.props.children.map((child) => {
            return (
              <div>
                {child}
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default ResizeContainer
