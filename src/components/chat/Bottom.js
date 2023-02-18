import React from 'react'
import send from './../../assets/images/send-message.png'

function Bottom() {
  return (
    <div className='bottomBar'>
        <input type="text"/>
        <img src={send} style={{width:20, cursor:'pointer'}} alt="" />
    </div>
  )
}

export default Bottom
