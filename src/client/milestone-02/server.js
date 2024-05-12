import express from "express";
import logger from "morgan";
import * as db from "./pouchdb_operations.js";
import  * as newDB  from "./newDBOperations.js";


const headerFields = { "Content-Type": "text/html" };

async function createRestraunt(response, id){
    try{
        await newDB.addRestaurant(db.getRestaurant(id));
        const restaurant = await newDB.getRestaurant(id);
        response.writeHead(200, headerFields);
        response.write(`<tr><td> ${restaurant.name}</td> <td> ${restaurant.price}</td><td> ${restaurant.genre}</td><td> ${restaurant.location}</td></tr>`);
        response.end();
    }
    catch(err){
        response.writeHead(500, headerFields);
        response.write("<h1>Internal Server Error</h1>");
        response.write("<p>Unable to create restraunt</p>");
        response.write(`<p>This is likely a duplicate restraunt name!</p>`);
        response.end();
    }
}
async function readRestaurant(response, id) {
    try {
      const restaurant = await db.getRestaurant(id);
      response.writeHead(200, headerFields);
      response.write(`<tr><td> ${restaurant.name}</td> <td> ${restaurant.price}</td><td> ${restaurant.genre}</td><td> ${restaurant.location}</td></tr>`);
      response.end();
    } catch (err) {
      response.writeHead(404, headerFields);
      response.write(`<h1>Restraunt Not Found</h1>`);
      response.end();
    }
  }
  //add personal rating system that updates? or perhaps favorites? need to ask
  async function putRestuarant(response, id) {
    try {
      const restaurant = await db.getRestaurant(id);
      await newDB.updateRestaurant(restaurant);
      response.writeHead(200, headerFields);
      response.write(`<tr><td> ${restaurant.name}</td> <td> ${restaurant.price}</td><td> ${restaurant.genre}</td><td> ${restaurant.location}</td></tr>`);
      response.end();
    } catch (err) {
      response.writeHead(404, headerFields);
      response.write(`<h1>restaurant Not Found</h1>`);
      response.end();
    }
  }
  async function removeRestraunt(response, id) {
    try {
        const restaurant = await db.getRestaurant(id);
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

const app = express();
const port = 3260;
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("src/milestone-02/client"));

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
    await putRestuarant(response, options.id);
  })
  // .all(MethodNotAllowedHandler);
  app
  .route("/delete")
  .delete(async (request, response) => {
    const options = request.query;
    await removeRestraunt(response, options.id);
  })
  // .all(MethodNotAllowedHandler);
  
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
  