import React from "react";
import iot from './../assets/images/iot.jpg';

export const Home = () =>{
    return(
        <div >
            {/* Homepage */}
            

            {/* <a className="btn btn-primary" href='/home' >Home</a> */}
            <a className="btn btn-primary left-btn" href='/form' >Login</a>

            <div className="wrapper mt-5">
                <div >
                    <h3> Welcome </h3>
                    <p>
                        
                    </p>
                </div>
                <div className="img-side mt-4">
                    <img alt="image" src={iot}  />
                </div>
            </div>

        </div>
    )
}
