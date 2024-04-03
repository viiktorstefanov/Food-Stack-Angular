const experiencesController = require('express').Router();

const { getAll, deleteById, addExperience, getById, editExperience, getRecentExperiences } = require('../services/experiencesService');
const { parseError } = require('../utils/parseError');

experiencesController.get('/all', async (req, res) => {
    res.json(await getAll());
    console.log('All experiences were sent.');
});

experiencesController.get('/recent', async (req, res) => {
    const recentExperiences = await getRecentExperiences();
    res.json(recentExperiences);
    console.log('Recent experiences were sent.');
});

experiencesController.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const experience = await getById(id);   
        res.json(experience).end();
            console.log('single experience send')
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

experiencesController.post('/add', async (req, res) => {
    try {
            const user = JSON.parse(req.headers.user);
            const experience = req.body;
            if(!req.body || req.body.length <= 0) {
                throw new Error('Please, enter your new experience');
            };
            const newExperience = await addExperience(experience, user._id);
            console.log('new experience added');
            res.status(204).end();
        
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

experiencesController.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const experience = await getById(id);
        const user = JSON.parse(req.headers.user);
        if (user._id == experience.ownerId) {
            await deleteById(id);
            console.log('experience deleted')
            res.status(204).end();
        }else {
            throw new Error('Not a owner');
        }
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

experiencesController.put('/:id', async (req, res) => {
    try {
        const experienceId = req.params.id;
        if(!req.body || req.body.length <= 0) {
            throw new Error('Missing info about experience');
        };
        const editedExperience = req.body;
        const updatedExperience = await editExperience(experienceId, editedExperience);
        res.status(204).end();
        console.log(`experience edited`);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    };
});

module.exports = experiencesController;