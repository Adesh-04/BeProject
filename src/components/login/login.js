import './login.css';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect} from 'react';
import { db } from './../../firebase';
import {collection, getDocs} from 'firebase/firestore'

export const Login = () => {

    const navigate = useNavigate()
    const [login, setLogin] = useState([])
    const loginRef = collection(db, 'login')

    useEffect(()=>{

        const getData = async() =>{
            const data = await getDocs(loginRef);
            setLogin(data.docs.map((doc) => ({
                ...doc.data(), id : doc.id
            })))
        }

        getData();
    }, [])


    const validate = (e) =>{
        e.preventDefault()
        var usr = e.target.username.value
        var pwd = e.target.Password.value
        
        login.map( (item, i) => (

            usr && pwd  ? 
                usr == login[i].userid ?
                    pwd == login[i].password ?
                        navigate('/welcome')
                    : console.log("Password Wrong")
                : console.log("username Wrong") 
            : console.log('Enter')
                
            
        ))
    }


    return (
        <div className="App ">
            <button className="btn left-btn" ><a className='btn btn-primary' href='/signup'> Signup </a> </button>
            <br/><br/><br/>
            {/* body */}
            <div className="mt-3">
                <h1 className='mt-5 '>PHR Login</h1>
                <form className='header mt-5' onSubmit={(e)=>{validate(e)}}>
                    <label htmlFor="username">Username: </label>
                    <input type="text" name="username" id="username" />

                    <label htmlFor="Password">Password: </label>
                    <input type="password" name="Password" id="password" />

                    <button type="submit" className="mt-2 btn btn-success btn-sm">Login</button>
                </form>
            </div>

            {/* footer */}
            <div className="footer">
                <p>All rights reserved</p>
            </div>
        </div>
    )
}

export const Signup = () => {
    return(
        <div>
            <h1>Signup</h1>
        </div>
    )
}
