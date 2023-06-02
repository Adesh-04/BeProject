import React, { useState } from 'react';
import './form.css'
import { v4 as uuidv4 } from 'uuid'
import { db } from '../../firebase';
import { collection, setDoc, getDocs, doc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

export const AddForm = () => {

    const navigate = useNavigate();

    const [details, setDetails] = useState({
        Address: '',
        Date: '',
        Allergy: {},
        BloodGroup: '',
        Predicted: '',
        Phone: '',
        Curr_Med: {},
        Disease: '',
        Gender: '',
        Height: '',
        Name: '',
        Past_Med: {},
        Weight: '',
        id: ''
    })

    const [idCount, setIDcount] = useState(0);

    if (idCount === 0){
        const uuid = uuidv4()
        const id = uuid.replace(/-/g, '').substring(0, 20);
        console.log(id);
        setIDcount(1);
    }
    

    let idList = []

    async function fetchData() {
        let ref = collection(db, 'patient_data')
        let totalColl = await getDocs(ref)
        let allEntries = totalColl.docs.map((doc) => ({
            ...doc.data(), id: doc.id
        }))
        for (let i in allEntries) {
            idList.push(allEntries[i].id)
        }
    }
    fetchData()

    const handleAddress = (e) =>{
        let city = e.City.value
        let state = e.State.value
        let country = e.Country.value

        city && state && country ?
            combine(city, state, country)
        : alert("Enter Address")
    }

    const combine = (q,w,e) =>{
        let val = ''
        val = val + q + ', ' + w + ', ' + e
        details.Address = val
    }

    const handleChange = (e) => {
        let { name, value } = e.target;
        if (name === 'Allergy' || name === 'Past_Med' || name === 'Symptoms' || name === 'Curr_Med') {
            if (value !== 'NA'){
                let valueArr = value.split(',');
                var a = valueArr.map((e) => {
                    e = e.trim()
                    e = e.charAt(0).toUpperCase() + e.slice(1)
                    return e
                })
            }   
            value = Object.assign({}, a)
        }
        setDetails(details => ({
            ...details, [name]: value
        }))
    }

    const validate = (e) => {
        let exp = false
        var id = e.id
        var name = e.Name
        var address = e.Address
        var phone = e.Phone
        var height = e.Height
        var weight = e.Weight

        id ?
            name && height && weight && phone  ?
                // validation length
                id.length === 20 ?
                    !idList.includes(id) ?
                        name.length >= 6 ?
                            address.length >= 10 ?
                                height >= 70 && height <= 300 ?
                                    weight >= 20 && weight <= 300 ?
                                        exp = true
                                    : alert('Enter correct Weight')
                                : alert('Enter Correct Height')
                            : alert('Enter correct Address Details')
                        : alert('Fullname should be minimum 6 alphabet long')
                    : alert('Data already Exists')
                : alert('Enter Correct Id')
            : alert('Enter Data')
        : alert('Enter Id')
        return exp
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log("ok")

        handleAddress(e.target);
        details.Gender = e.target.Gender.value
        details.Date = e.target.Birth.value

        if (validate(details)) {
            // write adding data code.
            await setDoc(doc(db, 'patient_data' , details.id), details)
            alert('Data added successfully!')

            navigate('/')
        }
    }

    return (
        <div className='form-wrapper'>
            <button className="btn left-btn" ><a className='btn btn-primary' href='/'>Back </a> </button>
            <h3 className='form-header'>Register Patient Data</h3>
            <form className='main-form' onSubmit={handleSubmit} autoComplete='off'>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='form-device'>
                            <span className='form-span'> Device Id: </span>
                            <input onChange={handleChange} className='form-input' type='text' id="id" name='id' title='Device Id' required />
                        </div>

                        <div className='form-address'>
                            <p className='form-label'>Address  </p>
                            <div className='form-flex'>
                                <div className='form-address-wrapper'>
                                    <p className='form-p'> City:  </p>
                                    <p className='form-p'> State:  </p>
                                    <p className='form-p'> Country:  </p>
                                </div>
                                <div className='form-address-wrapper'>
                                    <input className='form-input' type='text' id='City' name='City' title='Address should be minimum 6 alphabet long' required /><br/>
                                    <input className='form-input' type='text' id='State' name='State' title='Address should be minimum 6 alphabet long' required /><br/>
                                    <input className='form-input' type='text' id='Country' name='Country' title='Address should be minimum 6 alphabet long' required /><br/>
                                </div>
                                
                            </div>
                        </div>

                        <div className='form-phone'>
                            <span className='form-label'> Phone number: </span>
                            <input onChange={handleChange} className='form-input' type="text" pattern="[7-9]{1}[0-9]{9}" name="Phone" required />
                        </div>

                        <div className='form-height'>
                            <span className='form-label'> Height: </span>
                            <input onChange={handleChange} className='form-input' type='number' id='Height' name='Height' title='Height in cms' required />
                        </div>

                                                
                    </div>

                    <div className='col-md-6'>
                        <div className='form-name'>
                            <span className='form-label'> Name: </span>
                            <input onChange={handleChange} className='form-input' type='text' id='Name' name='Name' title='Name should be minimum 6 alphabet long' required />
                        </div>

                        <div className='form-birth'>
                            <span className='form-label'> Birthdate </span>
                            <input className='form-input' type='date' id='Birth' name='Birth' title='Birthdate' required />
                        </div>

                        <div className='form-blood'>
                            <span className='form-label'> BloodGroup: </span>
                            <input onChange={handleChange} className='form-input' type="text" pattern="^(A|B|AB|O)[+-]$" name="BloodGroup" required />
                        </div>

                        <div className='form-weight'>
                            <span className='form-label'> Weight: </span>
                            <input onChange={handleChange} className='form-input' type='number' id='Weight' name='Weight' title='Weight in kilo' required />
                        </div>

                        <div className='form-gender'>
                            <p className='form-label'> Gender </p>
                            <div className='form-flex'>
                                <div>
                                    <span className='form-span'> Male  </span>
                                    <input className='form-input' type='radio' name='Gender' value='male' required />
                                </div>
                                <div>
                                    <span className='form-span'> Female  </span>
                                    <input className='form-input' type='radio' name='Gender' value='female' required />
                                </div>
                                <div>
                                    <span className='form-span'> Other  </span>
                                    <input className='form-input' type='radio' name='Gender' value='other' required />
                                </div> 
                            </div>                         
                        </div>
                    </div>
                </div><hr/>

                <div className='row'>
                    <div className='col-md-6'>
                        <div className='form-allergy'>
                            <p className='form-label'> Allergies {'(comma separated)'}  :  </p>
                            <input onChange={handleChange} className='form-input' type="text" pattern="[A-Za-z0-9 \s,'.-]+" name="Allergy" title='Enter Comma Seperated' required />
                        </div>

                        <div className='form-disease'>
                            <span className='form-label'> Disease  :  </span>
                            <input onChange={handleChange} className='form-input' type="text" title="Enter NA if not applicable" name="Disease" />
                        </div>
                    </div>

                    <div className='col-md-6'>
                        <div className='form-curr'>
                            <p className='form-label'> Current Meds {'(comma separated)'}  :  </p>
                            <input onChange={handleChange} className='form-input' type="text" pattern="[A-Za-z0-9 \s,'.-]+" name="Curr_Med" title='Enter Comma Seperated' required />
                        </div>
                
                        <div className='form-past'>
                            <p className='form-label'> Past Meds {'(comma separated)'}  :  </p>
                            <input onChange={handleChange} className='form-input' type="text" pattern="[A-Za-z0-9 \s,'.-]+" name="Past_Med" title='Enter Comma Seperated' required />
                        </div>
                    </div>
                </div>

                <div className='text-center'>
                    <button type="submit" className="mt-2 pe-5 ps-5 btn btn-success btn-lg">Register</button>
                </div>
            </form>
        </div>
    )
}