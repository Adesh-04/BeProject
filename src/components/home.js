import React from "react";
import iot from './../assets/images/iot.jpg';

export const Home = () =>{
    
    return(
        // <div className="Container">
        //     {/* Homepage */}
            

        //     {/* <a className="btn btn-primary" href='/home' >Home</a> */}
        //     <a className="btn btn-primary left-btn" href='/form' >Login</a>

        //     {/* <div className="wrapper mt-5">
        //         <div >
        //             <h3> Welcome </h3>
        //             <p>
                        
        //             </p>
        //         </div>
        //         <div className="img-side mt-4">
        //             <img alt="image" src={iot}  />
        //         </div>
        //     </div> */}

        // </div>
        <div className="formContainer">
            <div className="formWrapper">
                <h1>Welcome!</h1>
                {/* <a href="/form" >▶</a> */}
                <a href='/form' >Get Started!</a>
            </div>
        </div>
    )
}
