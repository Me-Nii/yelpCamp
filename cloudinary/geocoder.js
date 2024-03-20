// geocoder.js

// Define a function to perform geocoding using OpenStreetMap Nominatim
async function geocodeAddress(address) {
  try {
    // Dynamically import node-fetch
    const fetch = await import("node-fetch");

    // Construct the URL for the OpenStreetMap Nominatim API request
    var apiUrl =
      "https://nominatim.openstreetmap.org/search?format=json&q=" +
      encodeURIComponent(address);

    // Make an HTTP request to the OpenStreetMap Nominatim API
    const response = await fetch.default(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch geocode data");
    }
    // Parse the JSON response
    const data = await response.json();
    // Check if results are returned
    if (data.length > 0) {
      // Extract the latitude and longitude from the response
      const latitude = data[0].lat;
      const longitude = data[0].lon;

      // Create a GeoJSON object
      const geojson = {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [parseFloat(latitude), parseFloat(longitude)],
        },
        // properties: {
        //   address: address,
        // },
      };

      return { latitude, longitude, geojson };
    } else {
      throw new Error("No results found");
    }
  } catch (error) {
    throw new Error("Error performing geocoding: " + error.message);
  }
}

// Export the geocodeAddress function for use in other files
module.exports = {
  geocodeAddress,
};
