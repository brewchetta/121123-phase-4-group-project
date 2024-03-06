import React from 'react';
import { useState } from 'react';
import HomePage from './HomePage';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
} from "react-router-dom";




function LoginPage({currentUser, setCurrentUser}) {

    const navigate = useNavigate()

    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const { isAuthenticated, login } = useAuth();
    

    async function handleLogin(e) {
        e.preventDefault()
        const userInfo = {username, password}
        const res = await fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(userInfo)
        })
        if (res.ok) {
          const data = await res.json()
          setCurrentUser(data)
         navigate("/")
     
        } else {
          alert('Invalid log in')
        }
    
    }
    function handleLogout() {
        setCurrentUser(null)
        fetch('/logout', { method: 'DELETE' })
      }
        console.log("the current user is" + currentUser)



    return(
        <div>
        <button onClick={handleLogout}>Logout</button>
        <h2>Welcome {currentUser.username}!</h2>
        <form onSubmit={handleLogin}>
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
        <button type='submit' style={styles.button}>LogIn</button>
        </form>
        </div>
    )
}

export default LoginPage

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
        gridTemplateColumns: '1fr 1fr'
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
        width: '300px',
        padding: '20px',
        borderRadius: '30px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        height: '480px'
    },
      label: {
        display: 'block',
        margin: '15px 0',
        color: '#2C3A47', 
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