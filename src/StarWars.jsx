import React, {useState} from 'react';
import axios from 'axios';
import Card from './components/Card';

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
        if(e.key !== 'Enter') {
            setError(null);
            setCharacters([]);
            setSelectedCharacter(null);
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
            const response = await axios.get(`/api?query=${query}`);
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
    <div className='flex flex-col justify-center items-center mt-6'>
        <div className='flex items-center border border-gray-300 rounded-md p-2 mt-8 focus-within:ring focus-within:ring-dark w-1/2'>
            <input
                type="text"
                placeholder="Search for character"
                className='flex-grow focus:outline-none'
                value={query}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            <button
            id='search'
            onClick={searchCharacters}
            className="ml-2 p-2 rounded-md"
          >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="dark" className="h-4 w-4">
                <path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
                </svg>
          </button>
        </div>

        {loading && <p className='text-dark'>Loading...</p>}
        {error && <p className='text-red-400'>{error}</p>}

        <div className='w-1/2'>
            <Card selectedCharacter={selectedCharacter} characters={characters} handleCharacter={handleCharacter} />
        </div>
        
   </div>
  )
};

export default StarWars
