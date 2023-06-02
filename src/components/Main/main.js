import React from 'react';
import { db, real } from './../../firebase'
import { collection, getDocs } from 'firebase/firestore'
import { ref, onValue } from "firebase/database";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Main = () => {

    const navigate = useNavigate();

    // Storing patient data locally
    const [patient, setPatient] = useState([])
    const [realData, setReal] = useState([])

    // Reference to the patient_data collection in firestore database
    const patientRef = collection(db, 'patient_data')

    // Reference to the Pulse reading from the real-time database
    const realRef = ref(real, '/users');


    useEffect(() => {
        // This will run everytime page loads

        const getData = async () => {
            // Waits until all the patient data is fetched
            const data = await getDocs(patientRef);
            // Stores the data locally
            setPatient(data.docs.map((doc) => ({
                ...doc.data()
            })))
        }

        const getReal = async () => {
            // Fetching the snapshot of the data from the reference
            onValue(realRef, (snapshot) => {
                // taking the value 
                const data = snapshot.val();
                var arr = Object.keys(data)

                var values = [];

                arr.map((id, i) => {
                    values.push([data[id].Pulse, data[id].SpO2])
                })

                setReal( values.map((data,index) =>({
                    ...data, id: arr[index]
                })))
            })
        }

        // Calling both the functions
        getData();
        getReal();
    }, [])

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
        console.log(id)
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
        <div className='Wrapper-page'>

            {/* NAVBAR */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <p className="navbar-brand">City Hospital</p>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item mx-2">
                                <a className="nav-link active" aria-current="page" href="/add">Add New Patient</a>
                            </li>
                        </ul>
                    </div>
                    <button onClick={()=>{navigate('/home')}} className="btn btn-primary right-btn">Log Out</button>

                </div>
            </nav>

            <div className=' Header py-3'>

                <p className='text-center h1 mt-3' > Health Monitoring System  </p>
            </div>

            <div className='Main mt-2'>

                <div className='Content '>
                    <table className='table table-bordered table-hover '>
                        <thead className='thead text-center'>
                            <tr>
                                <th> Sr.No. </th>
                                <th> Name </th>
                                <th> Address </th>
                                <th> Age </th>
                                <th> Pulse </th>
                                <th> Oxygen Rate </th>
                                <th> Disease </th>
                                <th> Predicted </th>
                                <th> View </th>
                            </tr>
                        </thead>

                        <tbody className='tbody text-center'>
                            {/* Retriving patients data, Map function is used for simple loop */}
                            {patient.map((item, i) => (

                                // console.log(item)

                                <tr key={item.id}>
                                    <td> {i + 1} </td>
                                    <td> {item.Name} </td>
                                    <td> {item.Address} </td>
                                    <td> {getAge(item.Date)} </td>
                                    <td> {getPulse(item.id)} </td>
                                    <td> {getSpO2(item.id)} </td>
                                    <td> {item.Disease ? item.Disease : 'None'} </td>
                                    <td> {item.Predicted ? item.Predicted : 'None'} </td>
                                    <td> <a href={'/patient=' + item.id}   >link...</a></td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
