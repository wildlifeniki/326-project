import express from "express";
import logger from "morgan";
import path from "path";
import * as db from "./pouchdb_operations.js";
import  * as newDB  from "./newDBOperations.js";


const headerFields = { "Content-Type": "text/html" };

async function createRestraunt(response, id){
    try{
         id = id.toString();
         let oldRestraunt = await db.getRestaurant(id);
         console.log(oldRestraunt.doc);
        await newDB.addRestaurant(oldRestraunt);
        const restaurant = await newDB.getRestaurant(id);
        response.writeHead(200, headerFields);
        console.log('got restraunt' + restaurant.name);
        response.write(`<tr><td> ${restaurant.name}</td> <td> ${restaurant.price}</td><td> ${restaurant.cuisine}</td><td> ${restaurant.location}</td><td> ${restaurant.rating}</td><td> ${restaurant._id}</td></tr>`);
        response.end();
    }
    catch(e){
      console.log("Error", e.stack);
    console.log("Error", e.name);
    console.log("Error", e.message);

        response.writeHead(500, headerFields);
        response.write("<h1>Internal Server Error</h1>");
        response.write("<p>Unable to create restraunt</p>");
        response.write(`<p>This is likely a duplicate restraunt name!</p>`);
        response.end();
    }
}
async function readRestaurant(response, id) {
    try {
      id = id.toString();
      const restaurant = await newDB.getRestaurant(id);
      response.writeHead(200, headerFields);
      response.write(`<tr><td> ${restaurant.name}</td> <td> ${restaurant.price}</td><td> ${restaurant.cuisine}</td><td> ${restaurant.location}</td><td> ${restaurant.rating}</td><td> ${restaurant._id}</td></tr>`);
      response.end();
    } catch (err) {
      response.writeHead(404, headerFields);
      response.write(`<h1>Restraunt Not Found</h1>`);
      response.end();
    }
  }
  
  //add personal rating system that updates? or perhaps favorites? need to ask
  async function updtRestuarant(response, id) {
    try {
      id = id.toString();
      let restaurant = await newDB.getRestaurant(id);
      console.log(restaurant);
      const logg = await newDB.updateRestaurant(restaurant);
      restaurant = await newDB.getRestaurant(id);
      response.writeHead(200, headerFields);
      response.write(`<tr><td> ${restaurant.name}</td> <td> ${restaurant.price}</td><td> ${restaurant.cuisine}</td><td> ${restaurant.location}</td><td> ${restaurant.rating}</td><td> ${restaurant._id}</td></tr>`);
      response.end();
    } catch (e) {
      console.log("Error", e.stack);
    console.log("Error", e.name);
    console.log("Error", e.message);
      response.writeHead(404, headerFields);
      response.write(`<h1>restaurant Not Found</h1>`);
      response.end();
    }
  }
  async function removeRestraunt(response, id) {
    try {
      id = id.toString();
        const restaurant = await newDB.getRestaurant(id);
        response.writeHead(200, headerFields);
        response.write(`<h1>restaurant ${restaurant.name} Deleted</h1>`);
        response.end();
        newDB.deleteRestaurant(id);
    } catch (err) {
      response.writeHead(404, headerFields);
      response.write(`<h1>restaurant Not Found</h1>`);
      response.end();
    }
  }
async function dumpRestraunts(response) {
  try {
    const counters = await db.loadAllRestraunts();
    let responseText = "";
    counters.forEach((restaurant) => {
      responseText += `<tr><td> ${restaurant.name}</td> <td> ${restaurant.price}</td><td> ${restaurant.cuisine}</td><td> ${restaurant.location}</td><td> ${restaurant._id}</td></tr>`;
    });
    responseText += "</ul>";

    response.writeHead(200, headerFields);
    response.write(responseText);
    response.end();
  } catch (err) {
    response.writeHead(500, headerFields);
    response.write("<h1>Internal Server Error</h1>");
    response.write("<p>Unable to load restraunts</p>");
    response.write(`<pre>${err}</pre>`);
    response.end();
  }
}
async function dumpRestrauntsAsArray(response) {
  try {
    const restraunts = await db.loadAllRestraunts();
    response.writeHead(200, headerFields);
    response.write(restraunts);
    response.end();
  } catch (err) {
    response.writeHead(500, headerFields);
    response.write("<h1>Internal Server Error</h1>");
    response.write("<p>Unable to load restraunts</p>");
    response.write(`<pre>${err}</pre>`);
    response.end();
  }
}
const app = express();
const port = 3260;
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//console.log(db.getRestaurant("1"));
app.use(express.static("src/client/" ));

// const MethodNotAllowedHandler = async (request, response) => {
//     response.writeHead(405,{'Content-Type':'text/plain'});
//     response.write("<h1>Method Not Allowed/<h1>");
//     response.end();
//   };
  app
  .route("/read")
  .get(async (request, response) => {
    const options = request.query;
    await readRestaurant(response, options.id);
  })
  // .all(MethodNotAllowedHandler);
  app
  .route("/create")
  .post(async (request, response) => {
    const options = request.query;
    await createRestraunt(response, options.id);
  })
  // .all(MethodNotAllowedHandler);
  app
  .route("/update")
  .put(async (request, response) => {
    const options = request.query;
    await updtRestuarant(response, options.id);
  })
  // .all(MethodNotAllowedHandler);
  app
  .route("/delete")
  .delete(async (request, response) => {
    const options = request.query;
    await removeRestraunt(response, options.id);
  })
  app
  .route("/all")
  .get(async (request, response) => {
    const options = request.query;
    dumpRestraunts(response);
  })
  // app
  // .route("/allRests")
  // .get(async (request, response) => {
  //   const options = request.query;
  //   dumpRestrauntsAsArray(response);
  // })
  // .all(MethodNotAllowedHandler);
  
app.route("*").all(async (request, response) => {
  response.sendFile(path.resolve('src/client/index.html'));
});
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
  