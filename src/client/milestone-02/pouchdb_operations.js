//PouchDB db initialize
export var db = new PouchDB('restaurants');
db.destroy()
document.addEventListener("DOMContentLoaded", async function () {
    //array of restaurant objects
    //add and delete restaurants as required by modifying table, or use functions above
    const restaurantsToAdd = [
        { _id: '1', name: "Moge Tee", stars: 4.3, appetite: "lilbit", cuisine: "asian", price: "cheap", quizVibe: "cool", vibe: "modern, playful, sweet", occasion: "firstDate", location: "Amherst Center", score: 0 }, 
        { _id: '2', name: "Halal Cart", stars: 4.8, appetite: "medhunger", cuisine: "middleEastern", price: "cheap", quizVibe: "quick", vibe: "Messy, spicy, delicious", occasion: "nooccasion", location: "Amherst Center", score: 0 },
        { _id: '3', name: "Carefree Cakery", stars: 4.9, appetite: "lilbit", cuisine: "dessert", price: "cheap", quizVibe: "quick", vibe: "cutesy, small, slightly overpriced", occasion: "firstDate", location: "North Amherst", score: 0 },
        { _id: '4', name: "Miss Saigon", stars: 4.6, appetite: "medhunger", cuisine: "asian", price: "cheap", quizVibe: "date", vibe: "quaint, well-loved, child-in-back-room-doing-the-accounting vibes", occasion: "firstDate", location: "Amherst Center", score: 0 }, 
        { _id: '5', name: "House of Teriyaki", stars: 4.5, appetite: "starving", cuisine: "asian", price: "expensive", quizVibe: "date”, vibe: “home-cooked, filling, authentic", occasion: "firstDate", location: "North Amherst", score: 0 },
        { _id: '6', name: "Protocol", stars: 4.8, appetite: "medhunger", cuisine: "american", price: "veryexpensive", quizVibe: "cool", vibe: "chic, greenery, pricey",  occasion: "formal", location: "Amherst Center", score: 0 },
        { _id: '7', name: "Lili's Restaurant", stars: 4.8, appetite: "starving", cuisine: "asian", price: "expensive", quizVibe: "date", vibe: "small, authentic, flavorful", occasion: "firstDate", location: "Amherst Center", score: 0 },
        { _id: '8', name: "Chicken & Kebab", stars: 4.8, appetite: "starving", cuisine: "middleEastern", price: "expensive", quizVibe: "quick", vibe: "flavorful, new, unique", occasion: "nooccasion", location: "Amherst Center", score: 0 },
        { _id: '9', name: "Johnny's Tavern", stars: 4.1, appetite: "starving", cuisine: "american", price: "veryexpensive", quizVibe: "cool", vibe: "classic, family-favorite, filling", occasion: "formal", location: "Amherst Center", score: 0 }, 
        { _id: '10', name: "Bueno Y Sano", stars: 4.1, appetite: "medhunger", cuisine: "mexican", price: "cheap", quizVibe: "quick", vibe: "reliable, flavorful, fresh", occasion: "nooccasion", location: "Amherst Center", score: 0 }

    ];

    //add a restaurant to PouchDB database
    //note: not the same as addRestaurant function, for in file adding
    function addRestaurantToDB(restaurant) {
        console.log('Adding restaurant:', restaurant.name);
        return db.put(restaurant)
            .then(function (response) {
                console.log('Restaurant added:', restaurant.name);
                return response;
            })
            .catch(function (err) {
                console.error('Error adding restaurant:', err);
                throw err;
            });
    }

    //add all restaurants to PouchDB database
    function addRestaurantsToDB(restaurants) {
        return Promise.all(restaurants.map(restaurant => addRestaurantToDB(restaurant)));
    }
    addRestaurantsToDB(restaurantsToAdd)
        .then(() => {
            console.log('All restaurants added to the database successfully.');
        })
        .catch(err => {
            console.error('Error adding restaurants to the database:', err);
        });
});


//functions to retrieve or modify database, not as important to understand

//add restaurant to the database
function addRestaurant(id, name, genre, price, location) {
    console.log('Adding restaurant:', id, name, genre, price, location);
    return db.put({
        _id: id,
        name: name,
        genre: genre,
        price: price,
        location: location
    }).then(function (response) {
        console.log('Restaurant added:', response);
        return response;
    }).catch(function (err) {
        console.error('Error adding restaurant:', err);
        throw err;
    });
}

//retrieve restaurant from the database
export function getRestaurant(id) {
    console.log('Retrieving restaurant:', id);
    return db.get(id).then(function (doc) {
        console.log('Retrieved restaurant:', doc);
        return doc;
    }).catch(function (err) {
        console.error('Error retrieving restaurant:', err);
        throw err;
    });
}

//delete restaurant from the database
export function deleteRestaurant(id) {
    console.log('Deleting restaurant:', id);
    return db.get(id).then(function (doc) {
        return db.remove(doc);
    }).then(function (response) {
        console.log('Restaurant deleted:', response);
        return response;
    }).catch(function (err) {
        console.error('Error deleting restaurant:', err);
        throw err;
    });
}


//update a document in the database
export function updateRestaurant(id, name, genre, price, location) {
    console.log('Updating restaurant:', id);
    return db.get(id).then(function (doc) {
        doc.name = name;
        doc.genre = genre;
        doc.price = price;
        doc.location = location;
        return db.put(doc);
    }).then(function (response) {
        console.log('Restaurant updated:', response);
        return response;
    }).catch(function (err) {
        console.error('Error updating restaurant:', err);
        throw err;
    });
}


//function calls to get info on database, put in console 
// db.info().then(function (info) {
//   console.log(info);
// })