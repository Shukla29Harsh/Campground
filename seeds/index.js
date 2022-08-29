const mongoose = require('mongoose');
const cities=require('./cities')
const {places,descriptors}=require('./seedHelper')
const Campground=require("../models/campground")

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db= mongoose.connection;
db.on("error",console.error.bind(console,"error"))
db.once("open",()=>{
    console.log("Database connected");
})

const sample = array=> array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '62644967f17e996b82d369c0',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)},${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            image:[
                {
                    url: 'https://res.cloudinary.com/dzrlf4ali/image/upload/v1651317839/YelpCamp/g4hfuqo9lmss2hfcszv4.jpg',
                    filename: 'YelpCamp/g4hfuqo9lmss2hfcszv4'
                },
                {
                    url: 'https://res.cloudinary.com/dzrlf4ali/image/upload/v1651317839/YelpCamp/q8s0uebxdrz2lk6bjvgi.jpg',
                    filename: 'YelpCamp/q8s0uebxdrz2lk6bjvgi'
                }
            ]
        })
        await camp.save();
    }

}    

seedDB().then(() => {
    mongoose.connection.close();
    })