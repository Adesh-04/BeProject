import React, { useState, useEffect } from 'react';
import './form.css'
import { v4 as uuid } from 'uuid'
import { db } from './../../firebase';
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';


export const AddForm = () => {

    // Refers to the login collection in firestore database
    const dataRef = collection(db, 'patient_data')

    const [idList, setIdList] = useState([])

    useEffect(() => {
        // This will run everytime the page loads
        const getData = async () => {
            // Waiting to get data from the firebase
            const data = await getDocs(dataRef);
            // Storing data locally
            for (let i = 0; i < data.docs.length; i++) {
                setIdList(arr => [...arr, data.docs[i].data().id])
            }
        }
        // Calling the function
        getData();
    }, [])

    // for redirecting to other pages
    const navigate = useNavigate()
    // Creating 20 letter unique Id
    var id = uuid().split('-')
    id = id.join('')
    id = id.slice(0, 20)
    // Console.log for testing
    console.log(id)

    var data = {
        // This is the skeleton for the data document which will be sent over to database
        id: '', Address: '', Age: '', BP: '', BloodGroup: '',
        Condition: '', Disease: '', Gender: '', Height: '', Weight: '',
        Name: '', Pulse: '',
        Symptoms: { 0: '' },
        Curr_Med: { 0: '' },
        Allergy: { 0: '' },
        Past_Med: { 0: '' }
    }

    var loginData = {
        id: '', Username: '', Password: '', Email: ''
    }

    const validate = (e) => {
        // This function validates the form entries
        // Below method stops page from reloading
        e.preventDefault();

        var tar = e.target
        var id = tar.id.value
        var name = tar.name.value
        var address = tar.address.value
        var height = tar.height.value
        var weight = tar.weight.value
        var age = tar.age.value

        // checking if id
        id ?
            name && address && height && weight && age ?
                // validation length
                id.length === 20 ?
                    !idList.includes(id) ?
                        name.length >= 6 ?
                            address.length >= 10 ?
                                height >= 70 && height <= 300 ?
                                    weight >= 20 && weight <= 300 ?
                                        age >= 10 && age <= 140 ?
                                            updateData(e)
                                            : alert('Enter correct Age')
                                        : alert('Enter correct Weight')
                                    : alert('Enter Correct Height')
                                : alert('Address must have minimum Road, City and State')
                            : alert('Fullname should be minimum 6 alphabet long')
                        : alert('Data already Exists')
                    : alert('Enter Correct Id')
                : alert('Enter Data')
            : alert('Enter Id')

        // // Checking if the id length is valid
        // if (tar.id.value.length != 20) {
        //     alert("Enter Correct Id")
        // }else{
        //     // Checking other non optional data 
        //     tar.name.value && tar.address.value && tar.height.value && tar.weight.value && tar.age.value ?
        //         updateData(e)
        //         : alert("Enter credentials")

        // }




    }

    const updateData = (e) => {
        // Updating the validated information in the {data} object
        data.id = e.target.id.value
        data.Address = e.target.address.value
        data.Age = e.target.age.value
        data.Name = e.target.name.value

        data.Height = e.target.height.value + ' cms'
        data.Weight = e.target.weight.value + ' Kg'

        data.BloodGroup = e.target.blood.value
        e.target.disease.value ?
            data.Disease = e.target.disease.value
            : data.Disease = 'None'
        e.target.condition.value ?
            data.Condition = e.target.condition.value
            : data.Condition = 'Healthy'

        loginData.id = e.target.id.value
        loginData.Username = e.target.name.value

        // Sending the data
        sendData(data, loginData)
    }

    const sendData = async (data, loginData) => {
        // send Data to patient_data collection with data.id as a _id with data
        await setDoc(doc(db, 'patient_data', data.id), data)
        await setDoc(doc(db, 'patient_login', loginData.id), loginData)
        // await setDoc(patientLoginRef, loginData)
        alert("Data is Added to the System")
        // Redirect to the Table Page
        navigate('/home')
    }

    return (
        <div>

            <button className="btn left-btn" ><a className='btn btn-primary' href='/home'>Home </a> </button>
            <h3 className='m-3'>Add Patient Data</h3>
            <form className='form mt-5' onSubmit={(e) => { validate(e) }} autoComplete={'off'}>
                <div className='main'>
                    <fieldset>
                        <label htmlFor='id'> Device Id  :  </label>
                        <input type="text" id='id' pattern="^[a-z0-9]{20}$" title='Device Id' name="id" />

                        <label htmlFor='name'> Name  :  </label>
                        <input type="text" pattern="[A-Za-z ]+" name="name" title='Fullname should be minimum 6 alphabet long' required />

                        <label htmlFor='address'> Address  :  </label>
                        <input type="text" pattern="[A-Za-z0-9 \s,'.-]+" name="address" title='Address must have minimum Road, City and State' required />

                        <label htmlFor='age'> Age  :  </label>
                        <input type="number" name="age" title='Enter Age' required />
                    </fieldset>
                    <fieldset>
                        <label htmlFor='height'> Height  :  </label>
                        <input type="number" placeholder='in cms' name="height" title='Height in cms' required />

                        <label htmlFor='weight'> Weight  :  </label>
                        <input type="number" placeholder='in kilo' name="weight" title='Weight in kilo' required />

                        <label htmlFor='blood'> Blood Group  :  </label>
                        <input type="text" pattern="^(A|B|AB|O)[+-]$" name="blood" required />

                        <label htmlFor='disease'> Disease  :  </label>
                        <input type="text" name="disease" />

                        <label htmlFor='condition'> Condition  :  </label>
                        <input type="text" name="condition" />
                    </fieldset>
                </div>

                <button type="submit" className="mt-2 btn btn-success btn-sm">Add</button>

            </form>
        </div>
    )
}

export const UpdateForm = () => {
    // Not required NOW
    return (
        <div>
            <form>Adada</form>
        </div>
    )
}