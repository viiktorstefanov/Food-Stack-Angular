const Experiences = require('../models/experiences');

async function getAll() {
    return await Experiences.find({}).select('service description _id');
};

async function getById(id) {
    return await Experiences.findById(id);
};

async function deleteById(id) {
    return await Experiences.findByIdAndDelete(id);
};

async function addExperience(experience, ownerId) {
    const newExperience = await Experiences.create({
        service: experience.service,
        person: experience.person,
        phoneNumber: experience.phoneNumber,
       description: experience.description,
       ownerId,
    }); 
    return newExperience; 
};

async function editExperience(experienceId, editedExperience) {
    const updatedExperience = await Experiences.findOneAndUpdate(
        { _id: experienceId },
        { $set: editedExperience }, 
    );

    return updatedExperience;
};

async function getRecentExperiences() {
    return await Experiences.find()
    .sort({ createdAt: -1 }) // Sort by createdAt in descending order
    .limit(3) // Limit to three documents
    .then(experiences => {
        return experiences;
        // Do something with the three most recent experiences
    })
    .catch(err => {
        console.error(err);
        // Handle error
    });
};

module.exports = {
    getAll,
    deleteById,
    getById,
    addExperience,
    editExperience,
    getRecentExperiences
}