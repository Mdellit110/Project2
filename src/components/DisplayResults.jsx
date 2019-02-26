import React from 'react'

const DisplayResults = (props) => (
<div className='DisplayResults'>
  <div>It's a {props.state.duration} {props.props.moveType} to {props.state.to} from my house in bellmore if you leave now</div>
</div>
)

export default DisplayResults
