const Experiences = require("../models/experiences");
const Places = require("../models/places");

async function findByQuery(query) {
  try {
    const regexPattern = query
      .split("")
      .map((char, index) => {
        const upper = char.toUpperCase();
        const lower = char.toLowerCase();
        return `[${upper}${lower}]`;
      })
      .join("");

    const experienceProjection = { _id: 1, service: 1, description: 1 };
    const placeProjection = { _id: 1, title: 1, city: 1, description: 1 };

    const experienceQuery = {
      $or: [{ service: { $regex: regexPattern, $options: "i" } }],
    };
    const placeQuery = {
      $or: [
        { title: { $regex: regexPattern, $options: "i" } },
        { city: { $regex: regexPattern, $options: "i" } },
      ],
    };

    const [experiencesResults, placesResults] = await Promise.all([
      Experiences.find(experienceQuery, experienceProjection),
      Places.find(placeQuery, placeProjection),
    ]);

    return {
      experiences: experiencesResults,
      places: placesResults,
    };
  } catch (error) {
    console.log(`Error finding by query: ${error}`);
    throw error;
  }
}

module.exports = {
  findByQuery,
};
