import React from 'react';
import { db } from './../../firebase'
import {collection, getDocs} from 'firebase/firestore'
import { useEffect, useState } from 'react';

export const Main = () => {

    const [patient, setPatient] = useState([])
    const patientRef = collection(db, 'patient_data')

    useEffect(()=>{

        const getData = async() =>{
            const data = await getDocs(patientRef);
            setPatient(data.docs.map((doc) => ({
                ...doc.data(), id: doc.id
            })))
        }

        getData();
    }, [])


    return (
        <div className='Wrapper-page'>
            <button className="btn left-btn" ><a className='btn btn-primary' href='/home'>Home </a> </button>

            

            {/* NAVBAR */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">City Hospital</a>
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

                            {
                                patient.map((item, i) =>(

                                    
                                        // console.log(item)
                                    
                                    <tr key = {item.id}> 
                                        <td> {i+1} </td>
                                         <td> {item.Name} </td>
                                         <td> {item.Address} </td>
                                         <td> {item.Age} </td>
                                         <td> {item.BP } </td>
                                         <td> {item.Pulse} </td>
                                         <td> {item.Disease ? item.Disease : 'None'} </td>
                                         <td> {item.Condition ? item.Condition : 'None'} </td>
                                         <td> <a href={ '/patient='+ item.id }   >link...</a></td>
                                    </tr>
                                ) )
                            }

                            
                            
                        </tbody>
                    </table>
                </div>  
            </div>
        </div>
    )
}
