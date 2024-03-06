import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../Logo.png"
import GameCard from './GameCard'

function BestSellers({ gameData }) {
    const navigate = useNavigate();
    const [selectedGame, setSelectedGame] = useState(null);

    function handleClick() {
        navigate('/')
    }

    function handleGameClick(gameId) {
        setSelectedGame(gameId);
    }

    return (
        <div>
            <header style={styles.header}>
                <nav className="navbar">
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <h1 style={{ color: "black" }}>Controller In hand</h1>
                        <img
                            onClick={handleClick}
                            src={logo}
                            alt="Controller in Hand"
                            width={80}
                            height={"auto"}
                            style={{ cursor: "pointer" }}
                        />
                    </div>
                    <ul>
                        <li><a href="/BestSellers">BestSellers </a></li>
                        <li><a href="/forums">Forums </a></li>
                        <li><a href="/oldSchool">Old School</a></li>
                        <li><a href="/Genre">Genre</a></li>
                        <li><a href="/UpcomingReleases">Upcoming Release</a></li>
                        <li><a href="/Login">Login</a></li>
                        <li><a href="/Register">Register</a></li>
                    </ul>
                </nav>
                <p style={styles.quote}>Find the right game for you.</p>
            </header>
            <div className="card-container">
                {gameData.map(game => <GameCard key={game.id} game={game} /> )}
            </div>
         </div>
    )
}

export default BestSellers;

const styles = {
    header: {
        textAlign: 'center',
        marginBottom: '20px',
        position: 'relative',
    },
    h1: {
        fontSize: '2em',
        margin: 0,
        fontFamily: 'Comic Sans MS'
    },
    navigation: {
        position: 'absolute',
        top: '20px',
        right: '20px',
    },
    ul: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
        justifyContent: 'space-between',
    },
    li: {
        display: 'flex',
        marginRight: '10px',
        fontSize: '1.3em',
        color: '#FFFFFF',
    },
    a: {
        textDecoration: 'none',
        borderBottom: 'none',
        background: 'none',
        outline: 'none',
    }
}
