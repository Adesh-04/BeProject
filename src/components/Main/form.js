import React from 'react';
import './form.css'
import { v4 as uuid } from 'uuid'
import { db } from './../../firebase';
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';


export const AddForm = () =>{
    // for redirecting to other pages
    const navigate = useNavigate()
    // Creating 20 letter unique Id
    var id = uuid().split('-')
    id = id.join('')
    id = id.slice(0,20)
    // Console.log for testing
    console.log(id)

    // Reference to the patient_data collection in firestore database
    // const patientRef = collection(db, "patient_data")

    var data = {
        // This is the skeleton for the data document which will be sent over to database
        id : '', Address : '', Age: '', BP: '', BloodGroup: '',
        Condition: '', Disease: '', Gender: '', Height: '', Weight: '',
        Name: '', Pulse: '', 
        Symptoms: {0 :''},
        Curr_Med: {0 : ''},
        Allergy: {0 : ''},
        Past_Med: {0: ''}
    }

    const validate = (e) =>{
        // This function validates the form entries
        // Below method stops page from reloading
        e.preventDefault();

        var tar = e.target
        
        // Checking if the id length is valid
        if (tar.id.value.length != 20){
            alert("Enter Correct Id")
        }else{ 
            // Checking other non optional data 
            tar.name.value && tar.address.value && tar.height.value && tar.weight.value && tar.age.value?
                updateData(e)
            : alert("Enter credentials")
            
        }
    }

    const updateData = (e) =>{
        // Updating the validated information in the {data} object
        data.id = e.target.id.value
        data.Address = e.target.address.value
        data.Age = e.target.age.value
        data.Name = e.target.name.value
        data.Height = e.target.height.value
        data.Weight = e.target.weight.value
        data.BloodGroup = e.target.blood.value
        data.Disease = e.target.disease.value
        data.Condition = e.target.disease.value

        // Sending the data
        sendData(data)
        console.log('Ok')
    }

    const sendData = async(data) =>{
        // Wait until data is sent
        await setDoc(doc(db, "patient_data", data.id),data)
        alert("Data is Added to the System")
        // Redirect to the Table Page
        navigate('/home')
    }
    
    return(
        // <div>

        //     <button className="btn left-btn" ><a className='btn btn-primary' href='/home'>Home </a> </button>
        //     <h3 className='m-3'>Add Patient Data</h3> 
        //     <form className='form mt-5' onSubmit={(e)=>{validate(e)}} autoComplete={'off'}>
        //         <div className='main'>
        //             <fieldset>
        //                 <label htmlFor='id'> Device Id  :  </label>
        //                 <input type="text" id='id' pattern="^[a-z0-9]{20}$" title='Id is Invalid' name="id" /> 
                        
        //                 <label htmlFor='name'> Name  :  </label>
        //                 <input type="text" name="name" />
                        
        //                 <label htmlFor='address'> Address  :  </label>
        //                 <input type="text" name="address" />

        //                 <label htmlFor='age'> Age  :  </label>
        //                 <input type="text" name="age" />
        //             </fieldset>
        //             <fieldset>                    
        //                 <label htmlFor='height'> Height  :  </label>
        //                 <input type="text" name="height" />                        

        //                 <label htmlFor='weight'> Weight  :  </label>
        //                 <input type="text" name="weight" />                        

        //                 <label htmlFor='blood'> Blood Group  :  </label>
        //                 <input type="text" name="blood" />                        
                        
        //                 <label htmlFor='disease'> Disease  :  </label>
        //                 <input type="text" name="disease" />                        

        //                 <label htmlFor='condition'> Condition  :  </label>
        //                 <input type="text" name="condition" />                   
        //             </fieldset>
        //         </div>
                
        //         <button type="submit" className="mt-2 btn btn-success btn-sm">Add</button>

        //     </form>
        // </div>
        <div className="formContainer">
            <div className="formWrapper">
                <span className="heading">Add Patient</span>
                <form action="" onSubmit={(e)=>{validate(e)}} autoComplete={'off'}>
                    <input type="text" placeholder='Device ID' id='id' pattern="^[a-z0-9]{20}$" title='Id is Invalid' name="id" />
                    <input type="text" placeholder= 'Patient Name' name="name" />
                    <input type="text" placeholder= 'Address' name="address" />
                    <input type="text" placeholder= 'Age' name="age" />
                    <input type="text" placeholder= 'Height in cms' name="height" />
                    <input type="text" placeholder= 'Weight in kg' name="weight" />
                    <input type="text" placeholder= 'Blood Group' name="blood" />
                    <input type="text" placeholder= 'Disease' name="disease" />
                    <input type="text" placeholder= 'Condition' name="condition" />
                    <button type='submit'>Add</button>
                </form>
            </div>
        </div>
    )
}

export const UpdateForm = () =>{
    // Not required NOW
    return(
        <div className='formContainer'>
            <div className="formWrapper">
                <form>Adada</form>
            </div>
        </div>
    )
}