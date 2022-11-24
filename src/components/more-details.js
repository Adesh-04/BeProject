import React from 'react';
import './details.css';
import all from './DATA/DATA.json'

export const Details = (props) =>{
    let city = window.location.pathname
    const Pref = city.slice(-1)
    return(
        <div>
            <a className='btn btn-secondary left-btn' href='/home'> Home </a>
            <div className='wrapper-detail'>

                <h1 className='mt-5 mb-4'> {all[Pref].Name} </h1>
                <div className='wrapper'>
                    <div>
                        <p className='btn info-btn mt-4'>Address :  {all[Pref].Address} </p>
                    </div>
                    <div className="mt-4" id='Info'>
                        
                        <p className='btn info-btn'>Age :  {all[Pref].Age} </p>
                        <p className='btn info-btn'>Gender :  {all[Pref].Gender} </p>
                        <p className='btn info-btn'>Height :  {all[Pref].Height} </p>
                        <p className='btn info-btn'>Weight :  {all[Pref].Weight} </p>
                        <p className='btn info-btn'>Blood Group :  {all[Pref].Blood_G} </p>
                        <p className='btn info-btn'>BP :  {all[Pref].BP} </p>
                        <p className='btn info-btn'>Pulse :  {all[Pref].Pulse} </p>
                        <p className='btn info-btn'>Disease :  {all[Pref].Disease} </p>
                        <p className='btn info-btn'>Condition :  {all[Pref].Condition} </p>

                    </div>
                </div>
                <div className='more-info'>
                    <div className='past-info m-3'>
                        <h2> Symptoms </h2>
                        <ol>
                        {
                            Object.keys(all[Pref].Sympt).map( (item, i) =>(
                                    <li key={i}>{all[Pref].Sympt[item]}</li>
                            ) )
                        }
                        </ol>
                        
                    </div>

                    <div className='past-info m-3'>
                        <h2> Current Medications </h2>
                        <ol>
                        {
                            Object.keys(all[Pref].Curr_Med).map( (item, i) =>(
                                    <li key={i}>{all[Pref].Curr_Med[item]}</li>
                            ) )
                        }
                        </ol>
                    </div>
                    
                    <div className='past-info m-3'>
                        <h2> Past Medications </h2>
                        <ol>
                        {
                            Object.keys(all[Pref].Past_Med).map( (item, i) =>(
                                    <li key={i}>{all[Pref].Past_Med[item]}</li>
                            ) )
                        }
                        </ol>
                    </div>

                    <div className='past-info m-3'>
                        <h2> Genetic or Heredetory Diseases </h2>
                        <ol>
                        {
                            Object.keys(all[Pref].Gen_D).map( (item, i) =>(
                                    <li key={i}>{all[Pref].Gen_D[item]}</li>
                            ) )
                        }
                        </ol>
                    </div>
                    
                    <div className='past-info m-3'>
                        <h2> Allergies </h2>
                        <ol>
                        {
                            Object.keys(all[Pref].Allergy).map( (item, i) =>(
                                    <li key={i}>{all[Pref].Allergy[item]}</li>
                            ) )
                        }
                        </ol>
                    </div>
                </div>    

                

            </div>
            
        </div>
    )
}