import React from 'react';
import all from "./DATA/DATA.json";
import { db } from './../firebase'
import {collection, getDocs} from 'firebase/firestore'
import { useEffect, useState } from 'react';

export const Home = () => {

    const [patient, setPatient] = useState([])
    const patientRef = collection(db, 'patient_data')

    useEffect(()=>{

        const getData = async() =>{
            const data = await getDocs(patientRef);
            console.log(data)
            setPatient(data.docs.map((doc) => ({
                ...doc.data(), id : doc.id
            })))
        }

        getData();
    }, [])

    return (
        <div className='Wrapper-page'>
            <div className=' Header py-3'>
                {/* <p>AppLogo</p> */}
                <div></div>
                <p className='text-center h1' > Health Monitoring System  </p>
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
                                         <td> {item.BP} </td>
                                         <td> {item.Pulse} </td>
                                         <td> {item.Disease} </td>
                                         <td> {item.Condition} </td>
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
