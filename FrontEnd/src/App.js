import React from 'react';
import './App.css';
import Form from './pages/Form';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Reservations from './pages/Reservations';
import ProfilePage from './pages/ProfilePage';
import Home from './pages/Home';

function App() {
  return (

    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/book" element={ <Form/>}></Route>
          <Route exact path="/" element={ <Home/>}></Route>
          <Route exact path="/view" element={ <Reservations/>}></Route>
          <Route exact path="/profile" element={<ProfilePage/>}></Route>
        </Routes>
      </Router>
     
    </div>
  );
}

export default App;
