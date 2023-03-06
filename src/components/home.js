import React from "react";

export const Home = () =>{
    console.log("ma cokie: "+document.cookie)
    return(
        <div className="formContainer">
            <div className="formWrapper">
                <h1>Welcome!</h1>
                <a href='/form' >Get Started!</a>
            </div>
        </div>
    )
}
