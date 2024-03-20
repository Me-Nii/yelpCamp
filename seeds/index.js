const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (err) => {
  console.error.bind("MongoDB connection error:", err);
});
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000) + 1;
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      // My user ID
      author: "65df13c60d14cca11af08622",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].latitude,
          cities[random1000].longitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/djzsbmwsr/image/upload/v1710157013/Yelpcamp/yamgea5rq3fqf5wvozjg.jpg",
          filename: "Yelpcamp/hkdscqpepacuvadmbcru",
        },
        {
          url: "https://res.cloudinary.com/djzsbmwsr/image/upload/v1710157013/Yelpcamp/yamgea5rq3fqf5wvozjg.jpg",
          filename: "Yelpcamp/cnwgittrmbrwayxnphr1",
        },
      ],
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.on("close", () => {
    console.log("MongoDB connection closed.");
  });
  mongoose.connection.close();
});
