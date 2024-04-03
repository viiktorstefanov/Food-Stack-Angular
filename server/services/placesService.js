const Places = require('../models/places');

async function getAll() {
   return await Places.find({});
};

async function getById(id) {
    return await Places.findById(id);
};

async function deleteById(id) {
    return await Places.findByIdAndDelete(id);
};

async function addPlace(place, ownerId) {
    const newPlace = await Places.create({
       title: place.title,
       city: place.city,
       street: place.street,
       description: place.description,
       ownerId,
    }); 
    return newPlace; 
};

async function editPlace(placeId, editedPlace) {

    const updatedPlace = await Places.findOneAndUpdate(
        { _id: placeId },
        editedPlace, 
        { new: true } 
    );

    return updatedPlace;
};

async function getRecentPlaces() {
    return await Places.find()
    .sort({ createdAt: -1 })
    .limit(3)
    .then(places => {
        return places;
    })
    .catch(err => {
        console.error(err);
    });
};

module.exports = {
    getAll,
    deleteById,
    getById,
    addPlace,
    editPlace,
    getRecentPlaces
}