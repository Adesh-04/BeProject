import React, { useState, useEffect } from 'react';
import './form.css'
import { v4 as uuid } from 'uuid'
import { db } from './../../firebase';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';


export const AddForm = () => {
    
    const [details, setDetails] = useState({
        Address:'',
        Age:'',
        Allergy:{},
        BP:'',
        BloodGroup:'',
        Condition:'',
        Curr_Med:{},
        Disease:'',
        Gender:'',
        Height:'',
        Name:'',
        Past_Med:{},
        Pulse:'',
        Symptoms:{},
        Weight:'',
        id:''
    })

    //     const validate = (e) => {
    //     // This function validates the form entries
    //     // Below method stops page from reloading
    //     e.preventDefault();

    //     var tar = e.target
    //     var id = tar.id.value
    //     var name = tar.name.value
    //     var address = tar.address.value
    //     var height = tar.height.value
    //     var weight = tar.weight.value
    //     var age = tar.age.value

    //     // checking if id
    //     id ?
    //         name && address && height && weight && age ?
    //             // validation length
    //             id.length === 20 ?
    //                 !idList.includes(id) ?
    //                     name.length >= 6 ?
    //                         address.length >= 10 ?
    //                             height >= 70 && height <= 300 ?
    //                                 weight >= 20 && weight <= 300 ?
    //                                     age >= 10 && age <= 140 ?
    //                                         updateData(e)
    //                                         : alert('Enter correct Age')
    //                                     : alert('Enter correct Weight')
    //                                 : alert('Enter Correct Height')
    //                             : alert('Address must have minimum Road, City and State')
    //                         : alert('Fullname should be minimum 6 alphabet long')
    //                     : alert('Data already Exists')
    //                 : alert('Enter Correct Id')
    //             : alert('Enter Data')
    //         : alert('Enter Id')

    //     // // Checking if the id length is valid
    //     // if (tar.id.value.length != 20) {
    //     //     alert("Enter Correct Id")
    //     // }else{
    //     //     // Checking other non optional data 
    //     //     tar.name.value && tar.address.value && tar.height.value && tar.weight.value && tar.age.value ?
    //     //         updateData(e)
    //     //         : alert("Enter credentials")
    //     // }
    // }

    let idList = []
    console.log(idList)
    async function fetchData(){
        let ref = collection(db, 'patient_data')
        let totalColl = await getDocs(ref)
        let allEntries = totalColl.docs.map((doc)=>({
            ...doc.data(), id:doc.id
        }))
        for(let i in allEntries){
            idList.push(allEntries[i].id)
        }
    }
    fetchData()

    const handleChange = (e)=>{
        let {name, value} = e.target;
        if(name === 'Allergy' || name === 'Past_Med' || name === 'Symptoms' || name === 'Curr_Med'){
            let valueArr = value.split(',');
            let a = valueArr.map((e)=>{
                e = e.trim()
                e = e.charAt(0).toUpperCase() + e.slice(1)
                return e
            })
            value = Object.assign({},a)
        }
        setDetails(details => ({
            ...details, [name]: value
        }))
    }

    const validate = (e)=>{
        let exp = false
        var id = e.id
        var name = e.Name
        var address = e.Address
        var height = e.Height
        var weight = e.Weight
        var age = e.Age

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
                                        exp = true
                                        : alert('Enter correct Age')
                                    : alert('Enter correct Weight')
                                : alert('Enter Correct Height')
                            : alert('Address must have minimum Road, City and State')
                        : alert('Fullname should be minimum 6 alphabet long')
                    : alert('Data already Exists')
                : alert('Enter Correct Id')
            : alert('Enter Data')
        : alert('Enter Id')
        return exp
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(validate(details)){
            console.log('details: ',details)
            console.log('idList: ',idList)
            // write adding data code.
            let ref = addDoc(collection(db, 'patient_data'),details)
            console.log('done feeding data')
            //data saved but not checked.
        }
    }

    return (
        <div>

            <button className="btn left-btn" ><a className='btn btn-primary' href='/home'>Home </a> </button>
            <h3 className='m-3'>Add Patient Data</h3>
            <form className='form mt-5' onSubmit={handleSubmit} autoComplete={'off'}>
                <div className='main'>
                    <fieldset>
                        <label htmlFor='id'> Device Id  :  </label>
                        <input onChange={handleChange} type="text" id='id' pattern="^[a-z0-9]{20}$" title='Device Id' name="id" />

                        <label htmlFor='Gender'> Gender  :  </label>
                        <input onChange={handleChange} type="text" id='gender'  title='Gender' name="Gender" />

                        <label htmlFor='Name'> Name  :  </label>
                        <input onChange={handleChange} type="text" pattern="[A-Za-z ]+" name="Name" title='Fullname should be minimum 6 alphabet long' required />

                        <label htmlFor='Address'> Address  :  </label>
                        <input onChange={handleChange} type="text" pattern="[A-Za-z0-9 \s,'.-]+" name="Address" title='Address must have minimum Road, City and State' required />

                        <label htmlFor='Age'> Age  :  </label>
                        <input onChange={handleChange} type="number" name="Age" title='Enter Age' required />

                        <label htmlFor='Height'> Height  :  </label>
                        <input onChange={handleChange} type="number" placeholder='in cms' name="Height" title='Height in cms' required />

                        <label htmlFor='Weight'> Weight  :  </label>
                        <input onChange={handleChange} type="number" placeholder='in kilo' name="Weight" title='Weight in kilo' required />

                        <label htmlFor='Pulse'> Pulse  :  </label>
                        <input onChange={handleChange} type="number" placeholder='' name="Pulse" title='Weight in kilo' required />

                        
                    </fieldset>
                    <fieldset>
                        
                        <label htmlFor='Allergy'> Allergies {'(comma separated)'}  :  </label>
                        <input onChange={handleChange} type="text" pattern="[A-Za-z0-9 \s,'.-]+" name="Allergy" title='Allergies, enter allergies separated by commas.' required />

                        <label htmlFor='Curr_Med'> Current Meds {'(comma separated)'}  :  </label>
                        <input onChange={handleChange} type="text" pattern="[A-Za-z0-9 \s,'.-]+" name="Curr_Med" title='Allergies, enter allergies separated by commas.' required />

                        <label htmlFor='Past_Med'> Past Meds {'(comma separated)'}  :  </label>
                        <input onChange={handleChange} type="text" pattern="[A-Za-z0-9 \s,'.-]+" name="Past_Med" title='Allergies, enter allergies separated by commas.' required />

                        <label htmlFor='Symptoms'> Symptoms {'(comma separated)'}  :  </label>
                        <input onChange={handleChange} type="text" pattern="[A-Za-z0-9 \s,'.-]+" name="Symptoms" title='Allergies, enter allergies separated by commas.' required />

                        <label htmlFor='BP'> BP  :  </label>
                        <input onChange={handleChange} type="number" placeholder='mm/hg' name="BP" title='Blood Pressure mm/hg' required />

                        <label htmlFor='BloodGroup'> Blood Group  :  </label>
                        <input onChange={handleChange} type="text" pattern="^(A|B|AB|O)[+-]$" name="BloodGroup" required />

                        <label htmlFor='Disease'> Disease  :  </label>
                        <input onChange={handleChange} type="text" name="Disease" />

                        <label htmlFor='Condition'> Condition  :  </label>
                        <input onChange={handleChange} type="text" name="Condition" />
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