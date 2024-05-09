import { db, getRestaurant } from './pouchdb_operations.js'; // Assuming you export your PouchDB instance from pouchdb_operations.js


const homeDiv = document.getElementById("home");
const quizDiv = document.getElementById("quiz");
const restaurantsDiv = document.getElementById("restaurants");
const mapDiv = document.getElementById("map");
const contentDiv = document.getElementById("content");
const navHome = document.getElementById("navHome");
const navQuiz = document.getElementById("navQuiz");
const navRestaurants = document.getElementById("navRestaurants");
const navMap = document.getElementById("navMap");
const quizButton = document.getElementById("quizButton");
const restaurantsButton = document.getElementById("restaurantsButton");
const mapButton = document.getElementById("mapButton");
const sortByName = document.getElementById("sortByName");
const sortByPrice = document.getElementById("sortByPrice");
const sortByLocation = document.getElementById("sortByLocation");
const sortByGenre = document.getElementById("sortByGenre");
<<<<<<< HEAD

=======
const restaurantDisplay = document.getElementById("restaurant-display")
>>>>>>> main

//navigation

function goHome() {
    contentDiv.innerHTML = "";
    currentNav.classList.remove("active");
    currentDiv = homeDiv;
    currentNav = navHome;
    contentDiv.appendChild(currentDiv);
    currentNav.classList.add("active");
}

function goQuiz() {
    contentDiv.innerHTML = "";
    currentNav.classList.remove("active");
    currentDiv = quizDiv;
    currentNav = navQuiz;
    contentDiv.appendChild(currentDiv);
    currentNav.classList.add("active");
}

function goRestaurants() {
    contentDiv.innerHTML = "";
    currentNav.classList.remove("active");
    currentDiv = restaurantsDiv;
    currentNav = navRestaurants;
    contentDiv.appendChild(currentDiv);
    currentNav.classList.add("active");
}

function goMap() {
    contentDiv.innerHTML = "";
    currentNav.classList.remove("active");
    currentDiv = mapDiv;
    currentNav = navMap;
    contentDiv.appendChild(currentDiv);
    currentNav.classList.add("active");
}

navHome.addEventListener("click", goHome);
navQuiz.addEventListener("click", goQuiz);
navRestaurants.addEventListener("click", goRestaurants);
navMap.addEventListener("click", goMap);
quizButton.addEventListener("click", goQuiz);
restaurantsButton.addEventListener("click", goRestaurants);
mapButton.addEventListener("click", goMap);

// map buttons

// before fixing server issues, local storage for map only
const restaurants = [
    { _id: '1', name: "Lili's", genre: "pub", price: "$$", location: "East Amherst", score: 0 },
    { _id: '2', name: "Miss Saigon", genre: "deli", price: "$", location: "West Amherst", score: 0 },
    { _id: '3', name: "Chicken & Kebab", genre: "grill", price: "$$", location: "Central Amherst", score: 0 },
    { _id: '4', name: "Johnny's Diner", genre: "pub", price: "$$", location: "East Amherst", score: 0 },
    { _id: '5', name: "Protocol", genre: "deli", price: "$", location: "West Amherst", score: 0 },
    { _id: '6', name: "House of Teriyaki", genre: "grill", price: "$$", location: "Central Amherst", score: 0 },
    { _id: '7', name: "Woo", genre: "pub", price: "$$", location: "East Amherst", score: 0 },
    { _id: '8', name: "Frank", genre: "deli", price: "$", location: "West Amherst", score: 0 },
    { _id: '9', name: "Hamp/Berk", genre: "grill", price: "$$", location: "Central Amherst", score: 0 },
]

if (restaurantDisplay !== null) {
    restaurantDisplay.innerHTML = `
        <table style="width:200px; text-align: center;" class="borderbox">
            <tr>
                <td class="h4" colspan="2">Click on the map to discover restaurants!</td>
            </tr>
        </table>
    `
    for (let i = 1; i <= 9; i++) {
        let buttonId = "btn".concat(i)
        const restaurantOnMapButton = document.getElementById(buttonId);
        const restaurant = restaurants.find(r => r._id === i.toString());

        restaurantOnMapButton.addEventListener("click", () => {
            restaurantDisplay.innerHTML = "";
            let table = document.createElement('table');
            let nameDiv = document.createElement('div');
            let genreDiv = document.createElement('div');
            let priceDiv = document.createElement('div');
            let locationDiv = document.createElement('div');
            nameDiv.innerHTML = restaurant.name;
            genreDiv.innerHTML = restaurant.genre;
            priceDiv.innerHTML = restaurant.price;
            locationDiv.innerHTML = restaurant.location;
            restaurantDisplay.appendChild(nameDiv);
            restaurantDisplay.appendChild(genreDiv);
            restaurantDisplay.appendChild(priceDiv);
            restaurantDisplay.appendChild(locationDiv);

            restaurantDisplay.innerHTML = `
                <table style="width:200px; text-align: center;" class="borderbox">
                    <tr>
                        <td class="h4" colspan="2">${restaurant.name}</td>
                    </tr>
                    <tr>
                        <td>Price:</td>
                        <td>${restaurant.price}</td>
                    </tr>
                    <tr>
                        <td>Genre:</td>
                        <td>${restaurant.genre}</td>
                    </tr>
                    <tr>
                        <td>Location:</td>
                        <td>${restaurant.location}</td>
                    </tr>
                </table>
            `
        });
    }
}


// restaurant database sorting

function sortTableByName() {
    let table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("table");
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[0];
            y = rows[i + 1].getElementsByTagName("TD")[0];
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }

}
function sortTableByPrice() {
    let table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("table");
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[1];
            y = rows[i + 1].getElementsByTagName("TD")[1];
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }

}
function sortTableByGenre() {
    let table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("table");
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[2];
            y = rows[i + 1].getElementsByTagName("TD")[2];
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }

}
function sortTableByLocation() {
    let table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("table");
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[3];
            y = rows[i + 1].getElementsByTagName("TD")[3];
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }

}
sortByName.addEventListener("click", sortTableByName);
sortByPrice.addEventListener("click", sortTableByPrice);
sortByGenre.addEventListener("click", sortTableByGenre);
sortByLocation.addEventListener("click", sortTableByLocation);

// starting to navigate has to be after all the setup
contentDiv.innerHTML = "";
let currentNav = navHome;
let currentDiv = homeDiv;

if (document.URL.includes("restaurants")) {
    goRestaurants();
} else if (document.URL.includes("map")) {
    goMap();
} else if (document.URL.includes("quiz")) {
    goQuiz();
} else {
    goHome();
<<<<<<< HEAD
}
function sortTableByName(){
    let table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("table");
  switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
          shouldSwitch = false;
          x = rows[i].getElementsByTagName("TD")[0];
          y = rows[i + 1].getElementsByTagName("TD")[0];
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
        if (shouldSwitch) {
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
        }
  }
  
}
function sortTableByPrice(){
    let table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("table");
  switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
          shouldSwitch = false;
          x = rows[i].getElementsByTagName("TD")[1];
          y = rows[i + 1].getElementsByTagName("TD")[1];
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
        if (shouldSwitch) {
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
        }
  }
  
}
function sortTableByGenre(){
    let table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("table");
  switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
          shouldSwitch = false;
          x = rows[i].getElementsByTagName("TD")[2];
          y = rows[i + 1].getElementsByTagName("TD")[2];
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
        if (shouldSwitch) {
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
        }
  }
  
}
function sortTableByLocation(){
    let table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("table");
  switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
          shouldSwitch = false;
          x = rows[i].getElementsByTagName("TD")[3];
          y = rows[i + 1].getElementsByTagName("TD")[3];
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
        if (shouldSwitch) {
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
        }
  }
  
}
sortByName.addEventListener("click", sortTableByName);
sortByPrice.addEventListener("click", sortTableByPrice);
sortByGenre.addEventListener("click", sortTableByGenre);
sortByLocation.addEventListener("click", sortTableByLocation);
=======
}
>>>>>>> main
