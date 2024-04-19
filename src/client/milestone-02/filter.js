export class Filter{
    #restaurants;
    constructor(){
        this.#restaurants = [];
        this.#restaurants.push({name:"Johnny's Tavern", genre: "pub", price:"$$", location: "East Amherst", score:0});
        this.#restaurants.push({name:"Fresh Side", genre: "deli", price:"$", location: "West Amherst", score:0});
        this.#restaurants.push({name:"Bistro 63", genre: "grill", price:"$$", location: "Central Amherst", score:0});
        //this.db = db;
    }
    //getResaurants(){
     //   return this.#restaurants;
    //}
    //Idea is i would have a list of restraunt objects, with $$$, location, name, genre etc, 
    // on quiz, once selection is pressed, get objects with paramter in them and then increment score
    addLocationScore(locat, scorr){
        let restsByLoc = this.#restaurants.find(({location}) => location === locat);
        for (let i in restsByLoc){
            i.score = i.score + scorr;
        }
    }
    addPriceScore(pric, scorr){
        let restsByPrice = this.#restaurants.find(({price}) => price === pric);
        for (let i in restsByPrice){
            i.score = i.score + scorr;
        }
    }
    addGenreScore(genr, scorr){
        let restsByGenre = this.#restaurants.find(({genre}) => genre === genr);
        for (let i in restsByGenre){
            i.score = i.score + scorr;
        }
    }
}