import './login.css'
import {v4 as uuid} from 'uuid'
import { redirect, useNavigate } from 'react-router-dom';
import React, { useState, useEffect} from 'react';
// db is the instance taken from firebase.js config file
import { db } from './../../firebase';
import {collection, getDocs, addDoc} from 'firebase/firestore'
import { Cookies } from 'react-cookie';


export const Login = () => {

    // Instance for naviagting to webpages
    const navigate = useNavigate()

    // Storing login data
    const [login, setLogin] = useState([])

    // Saving users data as such as email and userid for login
    var usrs = []

    // Reference to the login collection in database
    const loginRef = collection(db, 'login')

    useEffect(()=>{
        // This will run every time webpage loads
        const getData = async() =>{
            // waits until the total data in fetched
            const data = await getDocs(loginRef);

            // Stores all the data 
            setLogin(data.docs.map((doc) => ({
                ...doc.data(), id : doc.id
            })))
        }
        // Calling the function
        getData();

    }, [])
    function printCookie(ckie){
        console.log(ckie)
    }
    const validate = (e) =>{
        // This function will validate the entries from the form

        // Below method is used to not reload the webpage
        e.preventDefault();

        // Retrieving the data from the form
        var usr = e.target.username.value
        usr = usr.toLowerCase()
        var pwd = e.target.password.value
        
        // Checking if the database contains any login data
        if (login.length !=0){
            // The username field can contain userid or email
            // if email then push the email to the {usrs} list otherwise other
            if (usr.includes('@') ){
                // pushing all the data from the database using map function
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

        // Checking if the current input is in the {usrs} list 
        if (usrs.includes(usr)){
            // Fetching the index of the user
            var count = usrs.indexOf(usr)

            // Checking the password
            if (login[count].password == pwd){
                const cookie = new Cookies();
                cookie.set('loginToken', true, { path: '/' });
                console.log("cookie created and login token = "+cookie.get('loginToken')); 
                navigate('/home')
                printCookie(cookie);
            }else{
                alert("Invalid Credentials")
            }
        }else{
            alert("Data not found")
        }
    }


    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="heading">Welcome</span>
                <span className="heading">Login</span>
                <form onSubmit={(e)=>{validate(e)}} autoComplete={'off'}>
                    <input type="text" placeholder='Username' id="username" name="username" />
                    <input type="password" placeholder='Password' id="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"  name="password"/>
                    <button type='submit'>Login</button>
                </form>
                <p>Don't have an account? <a href="/signup">Register</a> here</p>
            </div>
        </div>
    )
}

export const Signup = () => {

    // Creating a new 20 character long id for the doctor signup
    var newId = uuid().split('-')
    newId = newId.join('')
    newId = newId.slice(0,20)

    // Creating instance for redirecting
    const navigate = useNavigate()

    // for verifing duplicate signup with same email and mobile number
    var usrs = []
    var nums = []

    // Stores all the data from the database
    const [login, setLogin] = useState([])

    // Refers to the login collection in firestore database
    const loginRef = collection(db, 'login')

    useEffect(()=>{
        // This will run everytime the page loads
        const getData = async() =>{
            // Waiting to get data from the firebase
            const data = await getDocs(loginRef);
            // Storing data locally
            setLogin(data.docs.map((doc) => ({
                ...doc.data(), id : doc.id
            })))
        }
        // Calling the function
        getData();
    }, [])

    const validate = (e) =>{
        // This function validates the signup information
        // Below method is used to stop reloading the page
        e.preventDefault();

        // Retriving all the information from the form
        var usr = e.target.username.value
        usr = usr.toLowerCase()
        var mail = e.target.email.value
        mail = mail.toLowerCase()
        var num = e.target.number.value
        var pwd = e.target.password.value

        // Checking if there is a input in the form
        usr && pwd?
            // validating the length of username
            usr.length >= 5 ?
                // validating the length of password
                pwd.length >= 8 ?
                    validate2(usr, pwd, mail, num)
                : alert("Password Should be 8 Character Minimum")
            : alert("Name Too Short")
        : alert("Enter Something")
    }

    const validate2 = (usr, pwd, mail, num) =>{
        // This function verifies the current information with the database

        // Checking if database contains any information
        if (login.length !=0){
            // pushing all the emails and mobile numbers into the {usrs} and {nums}
            login.map( (item, i)=> (
                usrs.push(item.email) && nums.push(item.mobile)
            ) )
        }
        // checking if the current email or the mobile number is already registred or not
        if (usrs.includes(mail) || nums.includes(num)){
            alert("User Already Exists")
        }
        else{
            sendData({userid: usr, password: pwd,mobile: num, email: mail, id: newId})
        }

        // Alternative methods {Don't change below comments}

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
        // This function sends the data to the database
        // addDoc method will wait until all the data is sent to the database
        await addDoc(loginRef, data);
        alert("Signed UP")
        // Navigate to the login page
        navigate('/form')
    }

    return(
        <div className="formContainer">
            <div className="formWrapper">
                <span className="heading">Register</span>
                <form action="" onSubmit={(e)=>{validate(e)}} autoComplete={'off'}>
                    <input type="text" placeholder='Username' id="username" name="username" />
                    <input type="email" placeholder='Enter email' id="email" name="email" />
                    <input type="text" placeholder='Mobile number' id='number' name="number" pattern="[7-9]{1}[0-9]{9}" />
                    <input type="password" placeholder='Password' id="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"  name="password"/>
                    <button type='submit'>Sign Up</button>
                </form>
            </div>
        </div>
    )
}
