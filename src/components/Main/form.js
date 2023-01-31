import React, {useState} from 'react';
import './form.css'
import { v4 as uuid } from 'uuid'
import { db } from './../../firebase';
import { collection, getDocs, addDocs, addDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';


export const AddForm = () =>{

    const navigate = useNavigate()
    var id = uuid().split('-')
    id = id.join('')
    id = id.slice(0,20)
    console.log(id)

    const [sympt, setSympt] = useState([])
    const [curr, setCurr] = useState([])
    const [past, setPast] = useState([])
    const [gen, setGen] = useState([])
    const [allergy, setAllergy] = useState([])

    const patientRef = collection(db, "patient_data")

    var data = {
        id : '', Address : '', Age: '', BP: '', BloodGroup: '',
        Condition: '', Disease: '', Gender: '', Height: '', Weight: '',
        Name: '', Pulse: '', 
        Symptoms: {0 :''},
        Curr_Med: {0 : ''},
        Allergy: {0 : ''},
        Past_Med: {0: ''}
    }

    const validate = (e) =>{
        e.preventDefault();
        var tar = e.target
        
        if (tar.id.value.length != 20){
            alert("Enter Correct Id")
        }else{ 
            tar.name.value && tar.address.value && tar.height.value && tar.weight.value && tar.age.value?
                updateData(e)
            : alert("Enter credentials")
            
        }
    }

    const updateData = (e) =>{
        data.id = e.target.id.value
        data.Address = e.target.address.value
        data.Age = e.target.age.value
        data.Name = e.target.name.value
        data.Height = e.target.height.value
        data.Weight = e.target.weight.value
        data.BloodGroup = e.target.blood.value
        data.Disease = e.target.disease.value
        data.Condition = e.target.disease.value

        sendData(data)
    }

    const sendData = async(data) =>{
        await addDoc(patientRef, data)
        alert("Data is Added to the System")
        navigate('/home')
    }
    
    return(
        <div>

            <button className="btn left-btn" ><a className='btn btn-primary' href='/home'>Home </a> </button>
            <h3 className='m-3'>Add Patient Data</h3> 
            <form className='form mt-5' onSubmit={(e)=>{validate(e)}} autoComplete={'off'}>
                <div className='main'>
                    <fieldset>
                        <label htmlFor='id'> Device Id  :  </label>
                        <input type="text" id='id' pattern="^[a-z0-9]{20}$" title='Id is Invalid' name="id" /> 
                        
                        <label htmlFor='name'> Name  :  </label>
                        <input type="text" name="name" />
                        
                        <label htmlFor='address'> Address  :  </label>
                        <input type="text" name="address" />

                        <label htmlFor='age'> Age  :  </label>
                        <input type="text" name="age" />
                    </fieldset>
                    <fieldset>                    
                        <label htmlFor='height'> Height  :  </label>
                        <input type="text" name="height" />                        

                        <label htmlFor='weight'> Weight  :  </label>
                        <input type="text" name="weight" />                        

                        <label htmlFor='blood'> Blood Group  :  </label>
                        <input type="text" name="blood" />                        
                        
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

export const UpdateForm = () =>{
    return(
        <div>
            <form>Adada</form>
        </div>
    )
}