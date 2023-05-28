import React, {useEffect, useState} from 'react';
import './../details.css';
import { db, real } from './../../firebase';
import { ref, onValue} from "firebase/database";
import {collection, getDocs} from 'firebase/firestore';
// import { useNavigate } from 'react-router-dom';
import Chat from '../chat/chat.js'

export const Details = (props) =>{
    // taking address path
    let path = window.location.pathname
    const arr = path.split('=')
    const ID = arr[1]    

    // const navigate = useNavigate()
    
    // Storing the patient data
    const [patient, setPatient] = useState([])
    const [temp, setTemp] = useState(0)

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
        onValue(TempRef, (snapshot) => {
            setTemp(snapshot.val());
        });
        // Calling the function
        getData();
    }, [])

    // Verifing if patient id exists in the {patient} list
    for (var item in patient){
        if (patient[item].id === ID){
            setPatient(patient[item])
        }        
    }
    

    // Variables for all list type data
    const Symp = patient.Sympt
    const Curr = patient.Curr_Med
    const Past = patient.Past_Med
    const Gen = patient.Gen_D
    const Alle = patient.Allergy
    var Pulse
    var O2

    // creating reference to the realtime database only if patient id exists
    // const PulseRef = ref(real, 'users/' + ID + '/Pulse/' );
    // const O2Ref = ref(real, 'users/' + ID + '/SpO2/' );
    const TempRef = ref(real, 'users/' + ID + '/Temp/' );
    


    return(
        <div>
            <h1>{patient.Name}</h1>
            <div className="Container" id='style-3'>
                <a className='btn btn-secondary left-btn' href='/home'> Home </a>
                <Chat></Chat>
                <div className="patient-details">
                    <p><b>Age             :</b>  {patient.Age} </p>
                    <p><b>Address         :</b>  {patient.Address} </p>
                    <p><b>Gender          :</b>  {patient.Gender} </p>
                    <p><b>Height          :</b>  {patient.Height} </p>
                    <p><b>Weight          :</b>  {patient.Weight} </p>
                    <p><b>Blood Group</b> :  {patient.Blood_G} </p>
                    <p><b>Pulse           :</b>  {Pulse} </p>
                    <p><b>Oxygen          :</b>  {O2} </p>
                    <p><b>Temperature     :</b>  {temp}</p>
                    <p><b>Disease         :</b>  {patient.Disease} </p>
                    <p><b>Condition       :</b>  {patient.Condition} </p>
                </div>
                <div className="patient-details-more">
                    <ul>
                        <li><span className='li-style'>Symptoms</span>
                        <ol>
                         {
                             Symp ?
                             Object.keys(patient.Curr_Med).map( (item, i) =>(
                                 <li key={i}>{patient.Curr_Med[item]}</li>
                             ) )
                             : console.log('Not Reachable')
                         }
                         </ol>
                        </li>
                        <li><span className='li-style'>Current Medications</span>
                        <ol>
                         {
                             Curr ?
                             Object.keys(patient.Curr_Med).map( (item, i) =>(
                                 <li key={i}>{patient.Curr_Med[item]}</li>
                             ) )
                             : console.log('Not Reachable')
                         }
                         </ol>
                        </li>
                        <li><span className='li-style'>Past Medications</span>
                        <ol>
                         {
                             Past ?
                             Object.keys(patient.Past_Med).map( (item, i) =>(
                                 <li key={i}>{patient.Past_Med[item]}</li>
                             ) )
                             : console.log('Not Reachable')
                         }
                         </ol>
                        </li>
                        <li><span className='li-style'>Genetic or Heredetory Diseases</span>
                        <ol>
                         {
                             Gen ?
                             Object.keys(patient.Gen_D).map( (item, i) =>(
                                 <li key={i}>{patient.Gen_D[item]}</li>
                             ) )
                             : console.log('Not Reachable')
                         }
                         </ol>
                        </li>
                        <li><span className='li-style'>Allergies</span>
                        <ol>
                         {
                             Alle ?
                             Object.keys(patient.Allergy).map( (item, i) =>(
                                 <li key={i}>{patient.Allergy[item]}</li>
                             ) )
                             : console.log('Not Reachable')
                         }
                         </ol>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}