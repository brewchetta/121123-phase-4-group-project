import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import {Route, Routes} from "react-router-dom";
import OldSchool from './components/OldSchool'; 
import Platform from './components/Platform';
import Register from './components/Register';
import UpcomingReleases from './components/UpComingReleases'
import Forums from './components/Forums'

import './index.css';
import LoginPage from './components/LoginPage';

function App() {
 
  const [gameData, setGameData] = useState([])
  
  const baseURL = "http://localhost:8000/games"

  useEffect(() => {
    fetch(baseURL)
    .then(res => res.json())
    .then(data => setGameData(data))
  }, []);
 
 
  return ( 
  <div>
        <Routes>
              <Route path="/" element={ <HomePage gameData={gameData}/>} />
              <Route path="/Login" element={<LoginPage/>} />
              <Route path="/Platform" element={<Platform/>} />
              <Route path="/Forums" element={<Forums/>} />
              <Route path="/OldSchool" element={<OldSchool/>} />
              <Route path="/Genre" element={<OldSchool/>} />
              <Route path="/Register" element={<Register/>} />
              <Route path="/UpcomingReleases" element={<UpcomingReleases/>} />
      </Routes>    
   </div>
  )
}

export default App;
