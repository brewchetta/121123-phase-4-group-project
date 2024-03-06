import {useState} from "react";


function NewGameForm({setGameData, gameData, updateGames}) {
    const [formValues, setFormValues] = useState({
        name: "",
        genre: "",
        image_url: "",
        release_date: "",
        platform: "",
        description: "",
        price: ""
    })

    function handleSubmit(e) {
        e.preventDefault();
        setGameData([...gameData, formValues]);
        setFormValues({
            name: "",
            genre: "",
            image_url: "",
            release_date: "",
            platform: "",
            description: "",
            price: ""
        })

        fetch("/NewGameForm", {
            method:"POST",
            headers: {
                "content-type": "Application/json",
            },
            body: JSON.stringify(formValues),
        })
        .then((res) => {
            if (res.ok) {
                window.location.href = "/";
            } else {
                throw new Error('Failed to submit the form')
            }
        })
        .catch(error => {
            console.error('Error', error);
        })
    }

    return (
        <div className="new-game-form">
            <h2>New Game</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    name="name"
                    placeholder="Game Title"
                    value={formValues.name}
                    onChange={(e) => 
                        setFormValues({...formValues, name: e.target.value})
                    }
                />
                <input
                    type="text"
                    name="image"
                    placeholder="Game Pic"
                    value={formValues.image_url}
                    onChange={(e) => 
                        setFormValues({...formValues, image_url: e.target.value})
                }
                />
                <input
                    type="text"
                    name="genre"
                    placeholder="Genre"
                    value={formValues.genre}
                    onChange={(e) => 
                        setFormValues({...formValues, genre: e.target.value})
                }
                />
                <input
                    type="text"
                    name="platform"
                    placeholder="Platform"
                    value={formValues.platform}
                    onChange={(e) => 
                        setFormValues({...formValues, platform: e.target.value})
                }
                />
                <input
                    type="text"
                    name="date"
                    placeholder="Release Date"
                    value={formValues.release_date}
                    onChange={(e) => 
                        setFormValues({...formValues, release_date: e.target.value})
                }
                />
                <input
                    type="text"
                    name="price"
                    placeholder="Price"
                    value={formValues.price}
                    onChange={(e) => 
                        setFormValues({...formValues, price: e.target.value})
                }
                />
                <textarea
                    type="text"
                    name="description"
                    placeholder="Description"
                    
                    value={formValues.description}
                    onChange={(e) => 
                        setFormValues({...formValues, description: e.target.value})
                }
                />
                <button id="create" type="submit">Add Game</button>
            </form>
        </div>
    )

}

export default NewGameForm