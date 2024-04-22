const Exercise = require('../models/exercise');

async function addExercise(name, caloriesBurnedPerHour) {

    const exercise = await Exercise.create({
        name,
        caloriesBurnedPerHour,
    });

    return exercise;
};

async function getExercises() {
    const exercises = await Exercise.find({});
    return exercises;
};

async function deleteExerciseById(exerciseId) {
    const exercise = await Exercise.findByIdAndDelete(exerciseId);

    return exercise;
};

module.exports = {
    addExercise,
    getExercises,
    deleteExerciseById,
};