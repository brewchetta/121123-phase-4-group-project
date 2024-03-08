import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../Logo.png"
import GameCard from './GameCard'



function HomePage( { gameData, currentUser, setCurrentUser }) {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    console.log(currentUser)
   

   
       
    async function handleRegister(e) {
        e.preventDefault()
        const new_user = {username, password}
        const res = await fetch('/users', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify(new_user)
            })
            if (res.ok) {
              const data = await res.json()
              setCurrentUser(data)
            } else {
              alert('Invalid sign up')
            }
            console.log("posted" + new_user)
          }
          function handleLogout() {
        setCurrentUser(null)
        fetch('/logout', { method: 'DELETE' })
      }
          
        
       

    
    function handleClick() {
        navigate('/')
    }
     return(
        
        <div className="homepageContainer" style={styles.homepageContainer}>
            <p>Hello {currentUser?.username} </p>
            <button  onClick={handleLogout}>Logout</button>
        
            <header style={styles.header}>
        
    
    <nav className="navbar">
    <div style={{
              display: "flex", flexDirection: "row"
            }}>
                <h1 style={{color: "white"}}>Controller In hand</h1>
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
            <li><a href="/NewGameForm">Add New Game</a></li>
            <li><a href="/Login">Login</a></li>
            <li><a href="/Register">Register</a></li>
        </ul>
            </nav>
                <p style={styles.quote}>Find the right game for you.</p>
            </header>
        <div style={styles.container}>
            <div className="card-container">
                
                { gameData.slice(gameData.length-10, gameData.length).map(game => <GameCard key={game.id} game={game} /> )}
            
            </div>
            
            <div style={styles.formContainer}>
            
            <form onSubmit={handleRegister}>

            <p>Register here to make an account to have access to the entire website.
            You will be able  to comment, like, and rate games, speak with others about 
            games in the forums section as well
            </p>
                    
            <label style={styles.label}>
          Username:
          <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          style={styles.input} 
          />

        </label>
        <label style={styles.label}>
            Password:
          <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        style={styles.input} 
        required
        />
        </label>
        
     
        <button type='submit' style={styles.button}>Register</button>
            
        </form>
           </div> 
           <footer style={styles.footer}>
                <div style={styles.quote}>
                </div>
        </footer>   
        </div>
    </div>
    )
}





export default HomePage

const styles = {
    homepageContainer: {
        height: '100vh',
        margin: 'center',
        fontFamily: 'Arial, sans-serif',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    
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
        color: 'var(--text)',
    },
    
    quote: {
        fontSize: '25px',
        fontFamily: 'Comic Sans MS',
        color: '#FFFFFF'
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'top',
        justifyContent: 'space-between',
        height: '50vh',
        gridTemplateColumns: '1fr 1fr',
        
    },
      heading: {
        fontFamily: 'cursive',
        fontSize: '3em',
        color: '#FFF',
        marginBottom: '15px',
    },
      formContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '2px solid white',
        width: '300px',
        padding: '20px',
        borderRadius: '30px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        height: '480px', 
        color: 'white',
    },
      label: {
        display: 'block',
        margin: '15px 0',
        color: 'white', 
    },
      input: {
        width: '90%',
        padding: '12px',
        borderRadius: '5px',
        border: '1px solid #95A5A6', 
        marginBottom: '20px',
        fontSize: '1em',
    },
      button: {
        width: '100%',
        padding: '12px',
        borderRadius: '5px',
        background: '#FF6B6B',
        color: '#FFF', 
        cursor: 'pointer',
        fontSize: '1em',
    }
};