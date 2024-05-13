import PouchDB from "pouchdb";

export var newDB = new PouchDB("pickedRestraunts");
//newDB.destroy()
export async function addRestaurant(restaurant) {
    console.log('Adding restaurant:', restaurant._id, restaurant.name, restaurant.cuisine, restaurant.price, restaurant.location);
    return newDB.put({
        //
        _id: restaurant._id,
        name: restaurant.name,
        genre: restaurant.cuisine,
        price: restaurant.price,
        location: restaurant.location
    }).then(function (response) {
        console.log('Restaurant added:', response);
        return response;
    }).catch(function (err) {
        console.error('Error adding restaurant:', err);
        throw err;
    });
}
export async function getRestaurant(id) {
    console.log('Retrieving restaurant:', id);
    return newDB.get(id).then(function (doc) {
        console.log('Retrieved restaurant:', doc);
        return doc;
    }).catch(function (err) {
        console.error('Error retrieving restaurant:', err);
        throw err;
    });
}
export async function deleteRestaurant(id) {
    console.log('Deleting restaurant:', id);
    return newDB.get(id).then(function (doc) {
        return newDB.remove(doc);
    }).then(function (response) {
        console.log('Restaurant deleted:', response);
        return response;
    }).catch(function (err) {
        console.error('Error deleting restaurant:', err);
        throw err;
    });
}
export async function updateRestaurant(restaurant) {
    console.log('Updating restaurant:', restaurant.id);
    return newDB.get(restaurant.id).then(function (doc) {
        doc._id = restaurant._id.toString();
        doc.name = restaurant.name;
        doc.genre = restaurant.cuisine;
        doc.price = restaurant.price;
        doc.location = restaurant.location;
        return newDB.put(doc);
    }).then(function (response) {
        console.log('Restaurant updated:', response);
        return response;
    }).catch(function (err) {
        console.error('Error updating restaurant:', err);
        throw err;
    });
}

