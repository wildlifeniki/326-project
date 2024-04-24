//PouchDB db initialize
var db = new PouchDB('restaurants');

//add restaurant to the database
function addRestaurant(id, name, location) {
    console.log('Adding restaurant:', id, name, location);
    return db.put({
        _id: id,
        name: name,
        location: location
    }).then(function (resSponse) {
        console.log('Restaurant added:', response);
        return response;
    }).catch(function (err) {
        console.error('Error adding restaurant:', err);
        throw err;
    });
}

//retrieve restaurant from the database
function getRestaurant(id) {
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
function deleteRestaurant(id) {
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
function updateRestaurant(id, name, location) {
    console.log('Updating restaurant:', id);
    return db.get(id).then(function (doc) {
        doc.name = name;
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

//function calls for testing
// addRestaurant('1', 'Restaurant', 'Location');
// getRestaurant('1');
// deleteRestaurant('1');

//function calls to get info on database
// db.info().then(function (info) {
//   console.log(info);
// })