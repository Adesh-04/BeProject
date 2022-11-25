import './login.css';
import {v4 as uuid} from 'uuid'
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect} from 'react';
import { db } from './../../firebase';
import {collection, getDocs, addDoc} from 'firebase/firestore'

export const Login = () => {

    const navigate = useNavigate()
    const [login, setLogin] = useState([])
    var usrs = []
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
        e.preventDefault();

        var usr = e.target.username.value
        var pwd = e.target.Password.value
        
        if (login.length !=0){
            login.map( (item, i)=> (
                usrs.push(item.userid)
            ) )
        }

        if (usrs.includes(usr)){
            var count = usrs.indexOf(usr)
            if (login[count].password == pwd){
                navigate('/home')
            }else{
                alert("Invalid Credentials")
            }
        }else{
            alert("Invalid Credentials")
        }
    }


    return (
        <div className="App ">
            <br/><br/><br/>
            {/* body */}
            <div className="mt-3">
                <h1 className='mt-5 '>PHR Login</h1>
                <form className='header mt-5 my-3' onSubmit={(e)=>{validate(e)}}>
                    <label htmlFor="username">Username: </label>
                    <input type="text" name="username" id="username" />

                    <label htmlFor="Password">Password: </label>
                    <input type="password" name="Password" id="password" />

                    <button type="submit" className="mt-2 btn btn-success btn-sm">Login</button>
                </form>
                <button className="btn mt-3" ><a className='btn btn-primary' href='/signup'> Signup </a> </button>

            </div>

            {/* footer */}
            <div className="footer">
                <p>All rights reserved</p>
            </div>
        </div>
    )
}

export const Signup = () => {

    var newId = uuid().split('-')
    newId = newId.join('')
    newId = newId.slice(0,20)

    const navigate = useNavigate()
    var usrs = []
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
        e.preventDefault();

        var usr = e.target.username.value
        var pwd = e.target.password.value

        usr && pwd ?
            usr.length >= 5 ?
                pwd.length >= 8 ?
                    validate2(usr, pwd)
                : alert("Password Should be 8 Character Minimum")
            : alert("Name Too Short")
        : alert("Enter Something")
    }

    const validate2 = (usr, pwd) =>{

        if (login.length !=0){
            login.map( (item, i)=> (
                usrs.push(item.userid)
            ) )
        }

        if (usrs.includes(usr)){
            alert("User Already Exists")
        }
        else{
            sendData({userid: usr, password: pwd, id: newId})
        }

        // login.forEach((data)=>{
        //     usr == data.userid ?
        //         alert('Already Registered')
        //     : sendData( {userid : usr, password: pwd, id: newId} )
        // })
        // login.map( (item, i)=> (
        //     usr == item.userid ?
        //         alert('Already Registered')
        //     : sendData( {userid : usr, password: pwd, id: newId} ) 
        // ) )
    }

    const sendData = async(data)=>{
        
        await addDoc(loginRef, data);
        alert("Signed UP")
        navigate('/form')
    }

    return(
        <div>
            <h1>Signup</h1>
            <form className='header mt-5 my-3' onSubmit={(e)=>{validate(e)}}>
                <label htmlFor="username">Username: </label>
                <input type="text" name="username" id="username" />

                <label htmlFor="Password">Password: </label>
                <input type="password" name="Password" id="password" />

                <button type="submit" className="mt-2 btn btn-success btn-sm">Signup</button>
            </form>
        </div>
    )
}
