const placesController = require('express').Router();

const { getAll, deleteById, addPlace, getById, editPlace, getRecentPlaces } = require('../services/placesService');
const { parseError } = require('../utils/parseError');

placesController.get('/all', async (req, res) => {
    res.json(await getAll());
    console.log('All places were sent.');
});

placesController.get('/recent', async (req, res) => {
    const recentPlaces = await getRecentPlaces();
    res.json(recentPlaces);
    console.log('Recent places were sent.');
});

placesController.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const place = await getById(id);   
        res.json(place).end();
            console.log('single place send')
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

placesController.post('/add', async (req, res) => {
    try {
            const user = JSON.parse(req.headers.user);  
            const place = req.body;
            if(!req.body || req.body.length <= 0) {
                throw new Error('Please, enter your new place');
            };
            const newPlace = await addPlace(place, user._id);
            console.log('new place added');
            res.status(204).end();

    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

placesController.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const place = await getById(id);
        const user = JSON.parse(req.headers.user);
        if (user._id == place.ownerId) {
            await deleteById(id);
            console.log('place deleted')
            res.status(204).end();
        } else {
            throw new Error('Not a owner');
        }
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

placesController.put('/:id', async (req, res) => {
    try {
        const placeId = req.params.id;
        if(!req.body || req.body.length <= 0) {
            throw new Error('Missing information about place');
        };
        const editedPlace = req.body;  
        const updatedPlace = await editPlace(placeId, editedPlace);
        res.status(204).end();
        console.log(`place edited`);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    };
});

module.exports = placesController;