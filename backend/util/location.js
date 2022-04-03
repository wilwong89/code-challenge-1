const axios = require("axios");

const HttpError = require("../models/http-error");

const API_KEY = "<GOOGLE_API_TOKEN>";

async function getCoordsForAddress(address) {
  // return {
  //   lat: number
  //   lng: number
  // };
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );

  const data = response.data;
  console.log("what is this response:", response);

  if (!data || data.status === "ZERO_RESULTS") {
    const error = new HttpError(
      "Could not find location for the specified address.",
      422
    );
    throw error;
  }
  console.log("what is this:", data.results);
  const coordinates = data.results[0].geometry.location;

  return coordinates;
}

module.exports = getCoordsForAddress;
