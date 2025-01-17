const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const path = require('path');

// Configure CORS
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Configure Express
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Configure headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/api', async (req, res) => {
    const { query } = req.query;
    
    // Validate query length
    if (!query || query.length > 100) {
        return res.status(400).send("Query is too long or empty");
    }

    try {
        const response = await axios.get(`https://swapi.dev/api/people/?search=${encodeURIComponent(query)}`);
        const characters = await Promise.all(response.data.results.map(async (character) => {
            const homeworldResponse = await axios.get(character.homeworld)
            const homeworld = homeworldResponse.data.name;
            const films = await Promise.all(character.films.map(async (url) => {
                const filmResponse = await axios.get(url);
                return filmResponse.data.title
            }));
            return {
                name: character.name,
                homeworld: homeworld,
                films: films,
            }
        }))
        res.json(characters);
    } catch (error) {
        res.status(500).send("Failed to get character")
    }
});

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.listen(3001, () => console.log('Server running'))
