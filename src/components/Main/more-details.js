import React, {useEffect, useState} from 'react';
import './../details.css';
import { db } from './../../firebase';
import {collection, getDocs} from 'firebase/firestore';
import Chat from '../chat/Chat'

export const Details = (props) =>{
    // taking address path
    let path = window.location.pathname
    const arr = path.split('=')
    const ID = arr[1]    
    
    // Storing the patient data
    const [patient, setPatient] = useState([])

    // Reference for the patient_data in the database
    const patientRef = collection(db, 'patient_data')

    useEffect(()=>{
        // This will run everytime the page loads

        const getData = async() =>{
            // Wait until the data is retreived
            const data = await getDocs(patientRef);

            // Storing the data locally
            setPatient(data.docs.map((doc) => ({
                ...doc.data(), id : doc.id
            })))
        }
        // Calling the function
        getData();
    }, [])

    // Verifing if patient id exists in the {patient} list
    for (var item in patient){
        if (patient[item].id == ID){
            setPatient(patient[item])
        }
    }

    // Variables for all list type data
    const Symp = patient.Sympt
    const Curr = patient.Curr_Med
    const Past = patient.Past_Med
    const Gen = patient.Gen_D
    const Alle = patient.Allergy


    return(
        <div>
            <a className='btn btn-secondary left-btn' href='/home'> Home </a>
            {/* <button className='btn btn-primary'>Chat</button> */}
            <Chat></Chat>
            <div className='wrapper-detail'>

                <h1 className='mt-5 mb-4'> {patient.Name} </h1>
                <div className='wrapper'>
                    <div>
                        <p className='btn info-btn mt-4'>Address :  {patient.Address} </p>
                    </div>
                    <div className="mt-4" id='Info'>
                        
                        <p className='btn info-btn'>Age :  {patient.Age} </p>
                        <p className='btn info-btn'>Gender :  {patient.Gender} </p>
                        <p className='btn info-btn'>Height :  {patient.Height} </p>
                        <p className='btn info-btn'>Weight :  {patient.Weight} </p>
                        <p className='btn info-btn'>Blood Group :  {patient.Blood_G} </p>
                        <p className='btn info-btn'>BP :  {patient.BP} </p>
                        <p className='btn info-btn'>Pulse :  {patient.Pulse} </p>
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
                            Object.keys(patient.Sympt).map( (item, i) =>(
                                <li key={i}>{patient.Sympt[item]}</li>
                            ) )
                            : console.log('Not Reachable')
                            
                        }
                        </ol>
                        
                    </div>
 
                    <div className='past-info m-3'>
                        <h2> Current Medications </h2>
                        <ol>
                        {
                            Curr ?
                            Object.keys(patient.Curr_Med).map( (item, i) =>(
                                <li key={i}>{patient.Curr_Med[item]}</li>
                            ) )
                            : console.log('Not Reachable')
                        }
                        </ol>
                    </div>
                    
                    <div className='past-info m-3'>
                        <h2> Past Medications </h2>
                        <ol>
                        {
                            Past ?
                            Object.keys(patient.Past_Med).map( (item, i) =>(
                                <li key={i}>{patient.Past_Med[item]}</li>
                            ) )
                            : console.log('Not Reachable')
                        }
                        </ol>
                    </div>

                    <div className='past-info m-3'>
                        <h2> Genetic or Heredetory Diseases </h2>
                        <ol>
                        {
                            Gen ?
                            Object.keys(patient.Gen_D).map( (item, i) =>(
                                <li key={i}>{patient.Gen_D[item]}</li>
                            ) )
                            : console.log('Not Reachable')
                        }
                        </ol>
                    </div>
                    
                    <div className='past-info m-3'>
                        <h2> Allergies </h2>
                        <ol>
                        {
                            Alle ?
                            Object.keys(patient.Allergy).map( (item, i) =>(
                                <li key={i}>{patient.Allergy[item]}</li>
                            ) )
                            : console.log('Not Reachable')
                        }
                        </ol>
                    </div>
                </div>    

                

            </div>
            
        </div>
    )
}