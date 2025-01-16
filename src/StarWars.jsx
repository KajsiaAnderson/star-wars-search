import React, {useState} from 'react';
import axios from 'axios';

const StarWars = () => {
    const [query, setName] = useState('');
    const [characters, setCharacters] = useState([]);
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const handleChange = (e) => {
        setName(e.target.value);
    };

    const handleKeyDown = (e) => {
        if(e.key === 'Enter') {
            document.getElementById('search').click();
        }
    }

    const searchCharacters = async () => {
        if (!query) return;

        setError(null);
        setCharacters([]);
        setSelectedCharacter(null);
        
        const validName = /^[a-zA-Z0-9\s-]+$/;
        if (!validName.test(query)) {
            setError('Invalid name: No special characters.')
            return;
        }
        
        setLoading(true);
        
        try {
            const response = await axios.get(`/api/people?query=${query}`);
            if (response.data.length === 0) {
                setError('Character not found');
            }
            setCharacters(response.data);
        } catch (error) {
            setError("error");
        }
        setLoading(false);
    };

    const handleCharacter = (character) => {
        setSelectedCharacter(character);
    }

  return (
    <div className='flex flex-col justify-center items-center'>
        <div className='pb-6'>
            <input
                type="text"
                placeholder="Search for character"
                className='p-4 focus:outline-none'
                value={query}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            <button id='search' onClick={searchCharacters} disabled={!query.trim()} className='bg-black text-white p-4'>Search</button>
        </div>

        {loading && <p className='text-white'>Loading...</p>}
        {error && <p className='text-white'>{error}</p>}

        {selectedCharacter ? (
                <div className='text-white text-xl'>
                    <div className='p-4'><span className='font-bold'>Name:</span> {selectedCharacter.name}</div>
                    <div className='p-4'><span className='font-bold'>Planet:</span> {selectedCharacter.homeworld}</div>
                    <div className='p-4'><span className='font-bold'>Films:</span> {selectedCharacter.films.length > 0 ? (
                            selectedCharacter.films.map((film) => <li key={film}>{film}</li>)
                        ) : (
                            <li>no films</li>
                        )}
                    </div>
                </div>
            ) : (
                <div>
                {characters.length > 0 && (
                  <ul>
                    {characters.map((character) => (
                      <li className='cursor-pointer text-yellow text-xl p-4 hover:scale-110 transform transition duration-300' key={character.name} onClick={() => handleCharacter(character)}>
                        <p >{character.name}</p>
                      </li>
                    ))}
                  </ul>
                )} 
              </div>
            )
        }
        
   </div>
  )
};

export default StarWars