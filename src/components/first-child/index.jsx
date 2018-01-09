import React from 'react'

export default props => {
  const childrenArray = React.Children.toArray(props.children)
  return childrenArray[0] || null
}
