import React from "react";
import iot from './../assets/images/iot.jpg';
import "./home.css"

export const Home = () => {
    return (
        <div className="home-page">
            {/* Homepage */}

            <a className="btn btn-primary left-btn" href='/form' >Login</a>

            <div className="home-wrapper mt-5">
                <div >
                    <h3> Welcome </h3>
                    <p>

                    </p>
                </div>
                <div className="home-img-side mt-4">
                    <img alt="img" src={iot} />
                </div>
            </div>

        </div>
    )
}
