import React from 'react'

const DisplayResults = (props) => {
  return(
    <div className='both-results'>
      <h1>{props.moveType.toUpperCase()}</h1>
      <p>{props.state.duration}</p>
    </div>
  )
}

export default DisplayResults
