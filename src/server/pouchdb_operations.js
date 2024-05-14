//PouchDB db initialize
import PouchDB from "pouchdb";
import { restaurants } from "../client/script";

var db = new PouchDB('restaurants');

//db.destroy()
//window.addEventListener("DOMContentLoaded", async function () {
    //array of restaurant objects
    //add and delete restaurants as required by modifying table, or use functions above
    const restaurantsToAdd = [... restaurants];

    //add a restaurant to PouchDB database
    //note: not the same as addRestaurant function, for in file adding
    async function addRestaurantToDB(restaurant) {
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
    async function addRestaurantsToDB(restaurants) {
        return Promise.all(restaurants.map(restaurant => addRestaurantToDB(restaurant)));
    }
    addRestaurantsToDB(restaurantsToAdd)
        .then(() => {
            console.log('All restaurants added to the database successfully.');
        })
        .catch(err => {
            console.error('Error adding restaurants to the database:', err);
        });
//});


//functions to retrieve or modify database, not as important to understand

//add restaurant to the database
export function addRestaurant(id, name, genre, price, location) {
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
        doc._id = id;
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

export async function loadAllRestraunts() {
    const result = await db.allDocs({ include_docs: true });
    return result.rows.map((row) => row.doc);
  }
//function calls to get info on database, put in console 
// db.info().then(function (info) {
//   console.log(info);
// })
export {db};