import { db } from './pouchdb_operations.js'; // Assuming you export your PouchDB instance from pouchdb_operations.js

export class Filter {
    #restaurants;
    //in the future we would send database into constructor parameters, then we would parse that database in array of restraunt objects, so we can filter
    constructor() {
        //updated constructor to call from pouchDB
        this.#restaurants = [];
        //retrieve restaurants from PouchDB, populate the #restaurants array
        db.allDocs({ include_docs: true })
            .then(result => {
                this.#restaurants = result.rows.map(row => row.doc);
            })
            .catch(err => {
                console.error('Error retrieving restaurants from the database:', err);
            });
        //old local store
        // this.#restaurants = [];
        // this.#restaurants.push({name:"Johnny's Tavern", genre: "pub", price:"$$", location: "East Amherst", score:0});
        // this.#restaurants.push({name:"Fresh Side", genre: "deli", price:"$", location: "West Amherst", score:0});
        // this.#restaurants.push({name:"Bistro 63", genre: "grill", price:"$$", location: "Central Amherst", score:0});
        // //this.db = db;
    }
    
    addLocationScore(locat, scorr) {
        let restsByLoc = this.#restaurants.find(({ location }) => location === locat);
        for (let i in restsByLoc) {
            i.score = i.score + scorr;
        }
    }
    addPriceScore(pric, scorr) {
        let restsByPrice = this.#restaurants.find(({ price }) => price === pric);
        for (let i in restsByPrice) {
            i.score = i.score + scorr;
        }
    }
    addGenreScore(genr, scorr) {
        let restsByGenre = this.#restaurants.find(({ genre }) => genre === genr);
        for (let i in restsByGenre) {
            i.score = i.score + scorr;
        }
    }
}