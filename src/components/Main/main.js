import React from 'react';
import { db, real } from './../../firebase'
import { collection, getDocs } from 'firebase/firestore'
import { ref, onValue } from "firebase/database";
import { useEffect, useState } from 'react';

export const Main = () => {

    // Storing patient data locally
    const [patient, setPatient] = useState([])

    // Reference to the patient_data collection in firestore database
    const patientRef = collection(db, 'patient_data')

    // Reference to the Pulse reading from the real-time database
    const pulseRef = ref(real, '/Pulse');


    useEffect(() => {
        // This will run everytime page loads

        const getData = async () => {
            // Waits until all the patient data is fetched
            const data = await getDocs(patientRef);
            // Stores the data locally
            setPatient(data.docs.map((doc) => ({
                ...doc.data(), id: doc.id
            })))
        }

        const getPulse = async () => {
            // Fetching the snapshot of the data from the reference
            onValue(pulseRef, (snapshot) => {
                // taking the value 
                const data = snapshot.val();
                console.log(data)
            })
        }
        // Calling both the functions
        getData();
        getPulse();
    }, [])


    return (
        <div className='Wrapper-page'>
            <button className="btn left-btn" ><a className='btn btn-primary' href='/home'>Home </a> </button>



            {/* NAVBAR */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">City Hospital</a>
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
                                <th> BP </th>
                                <th> Pulse </th>
                                <th> Disease </th>
                                <th> Condition </th>
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
                                    <td> {item.Age} </td>
                                    <td> {item.BP} </td>
                                    <td> {item.Pulse} </td>
                                    <td> {item.Disease ? item.Disease : 'None'} </td>
                                    <td> {item.Condition ? item.Condition : 'None'} </td>
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
