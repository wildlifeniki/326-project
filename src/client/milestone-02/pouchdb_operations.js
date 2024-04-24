//PouchDB db initialize
export var db = new PouchDB('restaurants');

document.addEventListener("DOMContentLoaded", async function() {
    //array of restaurant objects
    //add and delete restaurants as required by modifying table, or use functions above
    const restaurantsToAdd = [
        { _id: '1', name: "Johnny's Tavern", genre: "pub", price: "$$", location: "East Amherst", score: 0 },
        { _id: '2', name: "Fresh Side", genre: "deli", price: "$", location: "West Amherst", score: 0 },
        { _id: '3', name: "Bistro 63", genre: "grill", price: "$$", location: "Central Amherst", score: 0 }
    ];

    //add a restaurant to PouchDB database
    //note: not the same as addRestaurant function, for in file adding
    function addRestaurantToDB(restaurant) {
        console.log('Adding restaurant:', restaurant.name);
        return db.put(restaurant)
            .then(function (response) {
                console.log('Restaurant added:', response);
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

