const exerciseController = require('express').Router();

const { getExercises, addExercise, deleteExerciseById } = require('../services/exerciseService');
const { parseError } = require('../utils/parseError');

exerciseController.get("/", async (req, res) => {
    try {
        const exercises = await getExercises();
        res.json(exercises).end();
        console.log("All exercises were sent.");
    } catch (error) {
      const message = parseError(error);
      console.log(message);
      if (message.includes("\n")) {
        const errors = message.split("\n");
        return res.status(400).json({ message: errors }).end();
      }
      res.status(400).json({ message }).end();
    }
});

exerciseController.post('/add', async (req, res) => {
    try {
            const exercise = req.body;

            const newExercise = await addExercise(exercise.name, exercise.caloriesBurnedPerHour);
            console.log('new exercise added');
            res.status(204).end();
        
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

exerciseController.delete('/:id', async (req, res) => {
    try {
            const exerciseId = req.params.id;

            const deletedExercise = await deleteExerciseById(exerciseId);
        
            if (!deletedExercise) {
                throw new Error('Exercise not found');
            }

            console.log('exercise deleted');
            res.status(204).end();
        
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

module.exports = exerciseController;