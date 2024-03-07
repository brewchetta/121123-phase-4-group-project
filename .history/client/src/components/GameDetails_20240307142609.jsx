import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import logo from "../Logo.png"
import { useNavigate } from 'react-router-dom';

function GameDetails( { currentUser}) {
    let { gameId } = useParams()
   

    const [game, setGame ] = useState([])
    const baseURL = `/games/${gameId}`
    const navigate = useNavigate(); 
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    console.log(comments)


    

    useEffect(() => {
        fetch(baseURL)
        .then(res => res.json())
        .then(data => setGame(data))
    }, []);
    console.log(comment)

    function handleClick() {
        navigate('/')
    }
    
    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    async function handleSubmit (event) {
        event.preventDefault()
        
         setComment('');
        const new_comment = { comment, game_id:gameId, user_id:currentUser.id } 
        const res = await fetch('/ratings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept' : 'application/json'
            }, 
        body: JSON.stringify(new_comment)
    })    
     if (res.ok) {
         const data = await res.json()
         setComments([...comments, data.comment]);
       } else {
         alert('Invalid comment')
       }

    };  

    return (
        <div>
            <header>
            <nav className="navbar">
    <div style={{
              display: "flex", flexDirection: "row"
            }}>
                <h1 style={{color: "black"}}>Controller In hand</h1>
                <img
                onClick={handleClick} 
                src={logo} 
                alt="Controller in Hand" 
                width={80}
                height={
                "auto"}
                style={{ cursor: "pointer"}}
                />
            </div>
        <ul>
            <li><a href="/BestSellers">BestSellers</a></li>
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
            
        <li className='ind-card'>
            <div>
                <img className="ind-card-image" src={game.image_url} alt={"Game Cover"} />
                <h2 className='name'>{game.name}</h2>
                <p>{game.release_date}</p>
                <p>{game.price}</p>
                <p>{game.platform}</p>
            </div> 
            
             <div>
                <p className='desc'>{game.description}</p>
                
                <form onSubmit={handleSubmit}>
                <textarea className='comment-section'
                value={comment}
                onChange={handleCommentChange}
                placeholder="Write your comment..."
                />
                <button type="submit">Add Comment</button>
            </form>
            <div>
                <h3>Comments</h3>
                    <ul>
                         {comments.map((comment, index) => (
                            <li key={index}>{comment}</li>
                        ))} 
                    </ul>
                </div> 
            </div>
        </li>
        </div>
    )
}


export default GameDetails


const styles  = {

}