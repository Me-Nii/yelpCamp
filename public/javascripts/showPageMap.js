const map = L.map("map").setView(campground.geometry.coordinates, 11);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
}).addTo(map);

L.marker(campground.geometry.coordinates)
  .addTo(map)
  .bindPopup(`<h6>${campground.title}</h6> <p>${campground.location}</p>`);
// .openPopup();
