import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import {Route, Routes, useParams} from "react-router-dom";
import OldSchool from './components/OldSchool'; 
import BestSellers from './components/BestSellers';
import Register from './components/Register';
import UpcomingReleases from './components/UpComingReleases'
import Forums from './components/Forums'
import GameDetails from './components/GameDetails'

import './index.css';
import LoginPage from './components/LoginPage';


function App() {
 
  const [gameData, setGameData] = useState([])

  
  

  const baseURL = "/games"


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
              <Route path="/BestSellers" element={<BestSellers gameData={gameData}/>} />
              <Route path="/Forums" element={<Forums/>} />
              <Route path="/OldSchool" element={<OldSchool/>} />
              <Route path="/Genre" element={<OldSchool/>} />
              <Route path="/Register" element={<Register/>} />
              <Route path="/UpcomingReleases" element={<UpcomingReleases/>} />
              <Route path="/GameDetails/:gameId" element = {<GameDetails/> } />
      </Routes>     
   </div> 
  )
}

export default App;
