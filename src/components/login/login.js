import './styles.css';
import {v4 as uuid} from 'uuid'
import { redirect, useNavigate } from 'react-router-dom';
import React, { useState, useEffect} from 'react';
import { db } from './../../firebase';
import {collection, getDocs, addDoc} from 'firebase/firestore'
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";


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
        usr = usr.toLowerCase()
        var pwd = e.target.password.value
        
        if (login.length !=0){
            if (usr.includes('@') ){
                login.map( (item, i)=> (
                    usrs.push(item.email)
                ) )
            }
            else{
                login.map( (item, i)=> (
                    usrs.push(item.userid)
                ) )
            }
        }

        if (usrs.includes(usr)){
            var count = usrs.indexOf(usr)
            if (login[count].password == pwd){
                navigate('/home')
            }else{
                alert("Invalid Credentials")
            }
        }else{
            alert("Data not found")
        }
    }


    return (
        <div className="App ">

            <br/><br/><br/>
            <div className="row">
                <div className="col-md-12">
                    <form className='login-form' onSubmit={(e)=>{validate(e)}} autoComplete={'off'}>
                        <h1> Login </h1><bt/>
                        <fieldset>
                    
                            <label for="name">Username</label>
                            <input type="text" id="username" name="username"/>
                        
                            <label for="password">Password</label>
                            <input type="password" id="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"  name="password"/>

                            <button className='login-button' type="submit">Login</button>

                        </fieldset>
                        <fieldset>
                            <p className='signup-text'>Don't Have an account 
                                <button className="btn">
                                    <a className='btn btn-primary' href='/signup'>Signup</a>
                                </button>
                            </p>
                        </fieldset>
                    </form>
                </div>
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
    var nums = []
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
        usr = usr.toLowerCase()
        var mail = e.target.email.value
        mail = mail.toLowerCase()
        var num = e.target.number.value
        var pwd = e.target.password.value

        usr && pwd?
            usr.length >= 5 ?
                pwd.length >= 8 ?
                    validate2(usr, pwd, mail, num)
                : alert("Password Should be 8 Character Minimum")
            : alert("Name Too Short")
        : alert("Enter Something")
    }

    const validate2 = (usr, pwd, mail, num) =>{

        if (login.length !=0){
            login.map( (item, i)=> (
                usrs.push(item.email) && nums.push(item.mobile)
            ) )
        }

        if (usrs.includes(mail) || nums.includes(num)){
            alert("User Already Exists")
        }
        else{
            sendData({userid: usr, password: pwd,mobile: num, email: mail, id: newId})
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
            <div className="row">
                <div className="col-md-12">

                    <form className='signup-form' onSubmit={(e)=>{validate(e)}} autoComplete={'off'}>
                        <h1> Signup </h1>
                        
                        <fieldset>

                            <label htmlFor="username">Name:</label>
                            <input type="text" id="username" name="username"/>
                            
                            <label htmlFor="name">Email:</label>
                            <input type="email" id="email" name="email"/>

                            <label htmlFor="name">Mobile Number:</label>
                            <input type="text" id='number' name="number" pattern="[7-9]{1}[0-9]{9}"/>

                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" name="password"/>

                            <button className='signup-button' type="submit">Sign In</button>

                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    )
}
