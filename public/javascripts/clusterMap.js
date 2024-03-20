// Initialize Leaflet map
const map = L.map("map").setView([39.833333, -98.583333], 4);

// Add OpenStreetMap tiles as base layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

// Create a marker cluster group
const markerCluster = L.markerClusterGroup();

// Add markers to the marker cluster group
campgrounds.forEach((campground) => {
  const coordinates = campground.geometry.coordinates;
  const { popUpMarkup } = campground.properties;
  const marker = L.marker([coordinates[0], coordinates[1]]).bindPopup(
    `<h6><a href="/campgrounds/${campground._id}">${campground.title}</a></h6><p>${campground.location}</p>`
  );
  markerCluster.addLayer(marker);
});

// Add marker cluster group to the map
map.addLayer(markerCluster);
