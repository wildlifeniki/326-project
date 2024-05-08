import express from "express";
import logger from "morgan";
import {db} from "pouchdb_operations.js";

const headerFields = { "Content-Type": "text/html" };

function addRestaurant(id, name, genre, price, location, response) {
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
function getRestaurant(id, response) {
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
function deleteRestaurant(id, response) {
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
function updateRestaurant(id, name, genre, price, location, response) {
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



const app = express();
const port = 3260;
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("src/client"));

const MethodNotAllowedHandler = async (request, response) => {
    response.writeHead(405,{'Content-Type':'text/plain'});
    response.write("Method Not Allowed");
    response.end();
  };
  app
  .route("/read")
  .get(async (request, response) => {
    const options = request.query;
    getRestaurant();
  })
  .all(MethodNotAllowedHandler);
  app
  .route("/create")
  .post(async (request, response) => {
    const options = request.query;
    addRestaurant(options.id, options.name, options.genre, options.price, options.location, response);
  })
  .all(MethodNotAllowedHandler);
  app
  .route("/update")
  .put(async (request, response) => {
    const options = request.query;
    updateRestaurant(options.id, options.name, options.genre, options.price, options.location, response);
  })
  .all(MethodNotAllowedHandler);
  app
  .route("/delete")
  .delete(async (request, response) => {
    const options = request.query;
    deleteRestaurant(response, options.name);
  })
  .all(MethodNotAllowedHandler);
  app.route("*").all(async (request, response) => {
    response.status(404).send(`Not found: ${request.path}`);
  });
  
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
  