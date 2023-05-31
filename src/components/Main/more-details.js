import React, { useEffect, useState } from 'react';
import './details.css';
import { db, real } from './../../firebase';
import { ref, onValue } from "firebase/database";
import { collection, getDocs } from 'firebase/firestore';

export const Details = (props) => {
    // taking address path
    let path = window.location.pathname
    const arr = path.split('=')
    const ID = arr[1]

    // Storing the patient data
    const [patient, setPatient] = useState([])
    const [ids, setIds] = useState([])
    const [realData, setReal] = useState([])

    // Reference for the patient_data in the database
    const patientRef = collection(db, 'patient_data')

    // Reference for the patient_data in the realtime database
    const realRef = ref(real, '/users');

    useEffect(() => {
        // This will run everytime the page loads

        const getData = async () => {
            // Wait until the data is retreived
            const data = await getDocs(patientRef);

            // Storing the data locally
            setPatient(data.docs.map((doc) => ({
                ...doc.data(), id: doc.id
            })))
        }

        const getReal = async () => {
            // Fetching the snapshot of the data from the reference
            onValue(realRef, (snapshot) => {
                // taking the value 
                const data = snapshot.val();
                var arr = Object.keys(data)
                setIds(Object.keys(data))

                var values = [];

                arr.map((id, i) => {
                    values.push([data[id].Pulse, data[id].SpO2])
                })

                setReal( values.map((data,index) =>({
                    ...data, id: arr[index]
                })))
            })
        }

        // Calling the functions
        getData();
        getReal();
    }, [])

    // Verifing if patient id exists in the {patient} list
    for (var item in patient) {
        if (patient[item].id === ID) {
            setPatient(patient[item])
        }
    }

    // Variables for all list type data
    const Symp = patient.Sympt
    const Curr = patient.Curr_Med
    const Past = patient.Past_Med
    const Gen = patient.Gen_D
    const Alle = patient.Allergy

    const Phone = patient.Phone

    const Redirect = () => {
        let number = Phone;
        let url = "https://web.whatsapp.com/send?phone="
        url += number
        window.location.href = url
    }

    const getAge = (date) =>{
        const currentDate = new Date();
        const birthDate = new Date(date);
        const ageInMilliseconds = currentDate - birthDate;
        const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25;
        const ageInYears = Math.floor(ageInMilliseconds / millisecondsInYear);

        return ageInYears
    }

    const getPulse = (id) =>{
        const obj = realData.find(item => item.id === id);
        if (obj) {
            const value = obj[0];
            return value
        }
        return '??'
    }
    
    const getSpO2 = (id) =>{
        const obj = realData.find(item => item.id === id);
        if (obj) {
            const value = obj[1];
            return value
        }
        return '??'
    }

    return (
        <div className='details-page'>
            <a className='btn btn-secondary left-btn' href='/home'> Home </a>
            <button className='btn btn-primary' onClick={Redirect}>Chat</button>
            <div className='wrapper-detail'>

                <h1 className='mt-5 mb-4'> {patient.Name} </h1>
                <div className='wrapper'>
                    <div>
                        <p className='btn info-btn mt-4'>Address :  {patient.Address} </p>
                    </div>
                    <div className="mt-4" id='Info'>

                        <p className='btn info-btn'>Age :  {getAge(patient.Date)} </p>
                        <p className='btn info-btn'>Gender :  {patient.Gender} </p>
                        <p className='btn info-btn'>Height :  {patient.Height} </p>
                        <p className='btn info-btn'>Weight :  {patient.Weight} </p>
                        <p className='btn info-btn'>Blood Group :  {patient.BloodGroup} </p>
                        <p className='btn info-btn'>Pulse :  {getPulse(patient.id)} </p>
                        <p className='btn info-btn'>SpO2 :  {getSpO2(patient.id)} </p>
                        <p className='btn info-btn'>Disease :  {patient.Disease} </p>
                        <p className='btn info-btn'>Condition :  {patient.Condition} </p>

                    </div>
                </div>
                <div className='more-info'>
                    <div className='past-info m-3'>
                        <h2> Symptoms </h2>
                        <ol>

                            {
                                // Cheking if Symptom list is not valid i.e 0  same applies to all other
                                Symp ?
                                    // Mapping all the Symptoms in <li> tag same applies to all other
                                    Object.keys(patient.Sympt).map((item, i) => (
                                        <li key={i}>{patient.Sympt[item]}</li>
                                    ))
                                    : console.log()

                            }
                        </ol>

                    </div>

                    <div className='past-info m-3'>
                        <h2> Current Medications </h2>
                        <ol>
                            {
                                Curr ?
                                    Object.keys(patient.Curr_Med).map((item, i) => (
                                        <li key={i}>{patient.Curr_Med[item]}</li>
                                    ))
                                    : console.log()
                            }
                        </ol>
                    </div>

                    <div className='past-info m-3'>
                        <h2> Past Medications </h2>
                        <ol>
                            {
                                Past ?
                                    Object.keys(patient.Past_Med).map((item, i) => (
                                        <li key={i}>{patient.Past_Med[item]}</li>
                                    ))
                                    : console.log()
                            }
                        </ol>
                    </div>

                    <div className='past-info m-3'>
                        <h2> Genetic or Heredetory Diseases </h2>
                        <ol>
                            {
                                Gen ?
                                    Object.keys(patient.Gen_D).map((item, i) => (
                                        <li key={i}>{patient.Gen_D[item]}</li>
                                    ))
                                    : console.log()
                            }
                        </ol>
                    </div>

                    <div className='past-info m-3'>
                        <h2> Allergies </h2>
                        <ol>
                            {
                                Alle ?
                                    Object.keys(patient.Allergy).map((item, i) => (
                                        <li key={i}>{patient.Allergy[item]}</li>
                                    ))
                                    : console.log()
                            }
                        </ol>
                    </div>
                </div>



            </div>

        </div>
    )
}