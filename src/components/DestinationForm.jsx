import React from 'react'

const DestinationForm = (props) => {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <input
          placeholder="Where to?"
          name="destination"
          value={props.destination}
          onChange={props.handleChange}/>
          <button>go</button>
      </form>
    </div>
  )
}

export default DestinationForm
