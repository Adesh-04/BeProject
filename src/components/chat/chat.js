import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Bottom from './Bottom.js'
import Middle from './Middle.js'
import './../details.css'
import chaticon from './../../assets/images/chat.png'
import close from './../../assets/images/close.png' 
import minimize from './../../assets/images/minimize.png' 
import send from './../../assets/images/send-message.png'


function Chat() {
    const [showVal, showBox1] = useState('none')
    const navigate = useNavigate()

    function showBox(){
        if(showVal=='block'){
            showBox1('none');
        }
        if(showVal=='none'){
            showBox1('block');
        }
    }
    function showMini(){
        if(showVal=='block'){
            showBox1('none');
        }
        if(showVal=='none'){
            showBox1('block');
        }

    }

  return (
    <div className="">
        <div className='chatIcon'>
            <a href="https://api.whatsapp.com/send?phone=9860828432" target="_blank" rel="noopener noreferrer" ><img src={chaticon}  alt="chat" /></a>
        </div>
        <div className="chatBox">
            <div className="chat" style={{display:showVal}}>
{/* Top Bar */}
                <div className='topBar'>
                    <div className="" style={{padding:10, marginTop: '1rem'}}><p>Connecting...</p></div>
                    <div className="" style={{padding:5}}>
                        <img src={minimize} onClick={showMini} style={{width:30, padding:5, cursor:'pointer'}} alt="" />
                        <img src={close} onClick={showBox} style={{width:20, padding:5, cursor:'pointer'}} alt="" />
                    </div>
                </div>
{/* Top Bar end */}

                <div className="middle">
                    <Middle></Middle>
                    <Middle></Middle>
                    <Middle></Middle>
                    <Middle></Middle>
                </div>

{/* Bottom Bar  */}
                <div className='bottomBar'>
                    <input type="text"/>
                    <img src={send} style={{width:20, cursor:'pointer'}} alt="" />
                </div>
{/* Bottom Bar end */}

            </div>
        </div>
    </div>
  )
}

export default Chat
