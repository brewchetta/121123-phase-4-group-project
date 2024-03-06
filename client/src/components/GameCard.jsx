import React from 'react';
import { useNavigate} from 'react-router-dom'

function GameCard( { game }) {
    const navigate = useNavigate();
    
    function handleClick() {
        navigate(`/GameDetails/${game.id}`)
    }

    return (
        <li className='card'>
            <img onClick={handleClick} className="card-image" src={game.image_url} alt={"Game Cover"} />
            <h2 className='name'>{game.name}</h2>
            <p>{game.release_date}</p>
            <p>{game.price}</p>
            <p>{game.platform}</p>
            {/* <p>{game.description}</p> */}
        </li>
    )
}

export default GameCard;