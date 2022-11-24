import './login.css';
import React from 'react';


function Login() {
    
    return (
        <div className="App ">
            {/* NAVBAR */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">City Hospital</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">View Patients</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    More
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="#">Add New Patient</a></li>
                                    <li><a className="dropdown-item" href="#">Update patient record</a></li>
                                    <li><hr className="dropdown-divider"/></li>
                                    <li><a className="dropdown-item" href="#">Enter unique patient ID</a></li>
                                </ul>
                            </li>
                        </ul>
                        
                    </div>
                </div>
            </nav>

            {/* body */}
            <div className="">
                <h1 className='mt-5 '>PHR Login</h1>
                <form method='get' action='home' className='header mt-5'>
                    <label htmlFor="username">Username: </label>
                    <input type="text" name="username" id="username" />

                    <label htmlFor="password">Password: </label>
                    <input type="password" name="Password" id="password" />

                    <button type="submit" className="mt-2 btn btn-success btn-sm">Login</button>
                </form>
            </div>

            {/* footer */}
            <div className="footer">
                <p>All rights reserved</p>
            </div>
        </div>
    )
}
export default Login;
