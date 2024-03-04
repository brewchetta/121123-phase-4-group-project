import React from 'react';

function GameCard( { game }) {
    return (
        <li className='card'>
            <img className="card-image" src={game.image_URL} alt={"Game Cover"}/>
            <h2 className='name'>{game.name}</h2>
            <p>{game.release_date}</p>
            <p>{game.price}</p>
            <p>{game.platform}</p>
            {/* <p>{game.description}</p> */}
        </li>
    )
}

export default GameCard;