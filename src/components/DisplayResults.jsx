import React from 'react'

const DisplayResults = (props) => {
  return(
    <div className='DisplayResults'>
      <p>It's a {props.state.duration} {props.moveType} to {props.state.to} from my house in bellmore if you leave now</p>
    </div>
  )
}

export default DisplayResults
