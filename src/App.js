import React, {useState} from 'react'; 
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import './App.css'
import { Home } from './components/home';
import { Login, Signup} from './components/login/login'
import { AddForm } from './components/form/form'
import { Main } from './components/Main/main';
import { Details } from './components/Main/more-details';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


function App() {
  const [signedIn, setSignedIn] = useState(false)

  return (
    <div className="App">
      <Router>
          {/* <Routes>
            
          </Routes> */}
          {signedIn ? 
            <Routes>
              <Route exact path="/add" element={<AddForm/>}/>
              <Route exact path="/" element={<Main/>}/>
              <Route exact path={'/patient=:userId'} element={<Details  />}/>
            </Routes>
            :
            <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route exact path="/form" element={<Login setSignedIn={setSignedIn}/>}/>
              <Route exact path="/signup" element={<Signup/>}/>
            </Routes>
          }
          
      </Router>



    </div>
  );
}

export default App;
