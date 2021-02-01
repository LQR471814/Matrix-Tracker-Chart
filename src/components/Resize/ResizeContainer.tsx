import React from 'react'
import ResizeBar from './ResizeBar'

type IProps = React.PropsWithChildren<{margin: string}>

class ResizeContainer extends React.Component<IProps> {
  private currentKey = -1

  uniqueKey() {
    this.currentKey++
    return this.currentKey
  }

  render() {
    var renderedChildren = Array(this.props.children)
    if (!Array.isArray(this.props.children)) {
      renderedChildren = [this.props.children]
    }

    return (
      <div>
        { renderedChildren &&
          renderedChildren.map((child: any) => {
            return (
              <div key={this.uniqueKey()}>
                {child}
                <ResizeBar orientation="vertical" top="0%" left={`calc(${this.props.margin} + 100%)`} length="100%" />
                <ResizeBar orientation="horizontal" top={`calc(${this.props.margin} + 100%)`} left="0%" length="100%" />
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default ResizeContainer
