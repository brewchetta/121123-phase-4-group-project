import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import {Route, Routes, useParams} from "react-router-dom";
import OldSchool from './components/OldSchool'; 
import BestSellers from './components/BestSellers';
import Register from './components/Register';
import UpcomingReleases from './components/UpComingReleases'
import Forums from './components/Forums'
import GameDetails from './components/GameDetails'
import NewGameForm from './components/NewGameForm';

import './index.css';
import LoginPage from './components/LoginPage';


function App() {
 
  const [gameData, setGameData] = useState([])
  const [bestSellersData, setBestSellersData] = useState([])
  const [currentUser, setCurrentUser] = useState({})

  
  const baseURL = "/games"


  useEffect(() => {
    fetch(baseURL)
    .then(res => res.json())
    .then(data => setGameData(data))
  }, []);

  useEffect(() => {
    fetch('/check_session')
    .then(res => {
      if (res.ok) {
        res.json()
        .then( data => setCurrentUser(data) )
        }
      })
  }, [])
 


  function updateGames(newGame) {
    setGameData([...gameData, newGame])
  }

  return ( 
  <div>
        <Routes>
              <Route path="/" element={ <HomePage gameData={gameData} currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />
              <Route path="/Login" element={<LoginPage currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />
              <Route path="/BestSellers" element={<BestSellers bestSellersData={bestSellersData} gameData={gameData}/>} />
              <Route path="/Forums" element={<Forums/>} />
              <Route path="/OldSchool" element={<OldSchool/>} />
              <Route path="/Genre" element={<OldSchool/>} />
              <Route path="/Register" element={<Register currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />
              <Route path="/UpcomingReleases" element={<UpcomingReleases/>} />
              <Route path="/GameDetails/:gameId" element = {<GameDetails/> } />
              <Route path="/NewGameForm" element={ <NewGameForm gameData={gameData} setGameData={setGameData} updateGames={updateGames}/>} />
      </Routes>    
   </div>
  )
}

export default App;
