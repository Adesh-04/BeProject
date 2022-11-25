import React from 'react'; 
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import './app.css'
import { Home } from './components/home';
import { Login, Signup} from './components/login/login'
import { AddForm} from './components/Main/form'
import { Main } from './components/Main/main';
import { Details } from './components/Main/more-details';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


function App() {

  return (
    <div className="App ">
      <Router>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/form" element={<Login/>}/>
            <Route exact path="/signup" element={<Signup/>}/>
            <Route exact path="/add" element={<AddForm/>}/>
            <Route exact path="/home" element={<Main/>}/>
            <Route exact path={'/patient=:userId'} element={<Details  />}/>
          </Routes>
      </Router>



    </div>
  );
}

export default App;
