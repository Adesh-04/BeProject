import React from 'react'; 
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import './app.css'
import { Details } from './components/more-details';
import { Ho } from './components/ho';
import { Home } from './components/home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './components/login/login'


function App() {

  return (
    <div className="App ">
      <Router>
          <Routes>
            <Route exact path="/" element={<Ho/>}/>
            <Route exact path="/home" element={<Home/>}/>
            <Route exact path="/form" element={<Login/>}/>
            <Route exact path={'/patient=:userId'} element={<Details  />}/>
          </Routes>
      </Router>



    </div>
  );
}

export default App;
