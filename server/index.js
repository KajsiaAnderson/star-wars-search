const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const path = require('path');

app.use(express.json())
app.use(cors());



app.get('/api/people', async (req, res) => {
    const { query } = req.query;
    try {
        const response = await axios.get(`https://swapi.dev/api/people/?search=${query}`);
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

app.listen(3000, () => console.log('Server running'))