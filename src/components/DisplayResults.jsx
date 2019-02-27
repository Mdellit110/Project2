import React from 'react'

const DisplayResults = (props) => {
  return(
    <div className={props.result}>
      <h2>{props.moveType.toUpperCase()}</h2>
      <p className=''>{props.state.duration}</p>
    </div>
  )
}

export default DisplayResults
