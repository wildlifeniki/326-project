const restaurants = [
    { _id: '1', name: "Moge Tee", stars: 4.3, appetite: "lilbit", cuisine: "asian", price: "$", quizVibe: "cool", vibe: "modern, playful, sweet", occasion: "firstDate", location: "Amherst Center", score: 0 }, 
    { _id: '2', name: "Halal Cart", stars: 4.8, appetite: "medhunger", cuisine: "middleEastern", price: "$", quizVibe: "quick", vibe: "Messy, spicy, delicious", occasion: "nooccasion", location: "Amherst Center", score: 0 },
    { _id: '3', name: "Carefree Cakery", stars: 4.9, appetite: "lilbit", cuisine: "dessert", price: "$", quizVibe: "quick", vibe: "cutesy, small, slightly overpriced", occasion: "firstDate", location: "North Amherst", score: 0 },
    { _id: '4', name: "Miss Saigon", stars: 4.6, appetite: "medhunger", cuisine: "asian", price: "$", quizVibe: "date", vibe: "quaint, well-loved, child-in-back-room-doing-the-accounting vibes", occasion: "firstDate", location: "Amherst Center", score: 0 }, 
    { _id: '5', name: "House of Teriyaki", stars: 4.5, appetite: "starving", cuisine: "asian", price: "$$", quizVibe: "date”, vibe: “home-cooked, filling, authentic", occasion: "firstDate", location: "North Amherst", score: 0 },
    { _id: '6', name: "Protocol", stars: 4.8, appetite: "medhunger", cuisine: "american", price: "$$$", quizVibe: "cool", vibe: "chic, greenery, pricey",  occasion: "formal", location: "Amherst Center", score: 0 },
    { _id: '7', name: "Lili's Restaurant", stars: 4.8, appetite: "starving", cuisine: "asian", price: "$$", quizVibe: "date", vibe: "small, authentic, flavorful", occasion: "firstDate", location: "Amherst Center", score: 0 },
    { _id: '8', name: "Chicken & Kebab", stars: 4.8, appetite: "starving", cuisine: "middleEastern", price: "$$", quizVibe: "quick", vibe: "flavorful, new, unique", occasion: "nooccasion", location: "Amherst Center", score: 0 },
    { _id: '9', name: "Johnny's Tavern", stars: 4.1, appetite: "starving", cuisine: "american", price: "$$$", quizVibe: "cool", vibe: "classic, family-favorite, filling", occasion: "formal", location: "Amherst Center", score: 0 }, 
    { _id: '10', name: "Bueno Y Sano", stars: 4.1, appetite: "medhunger", cuisine: "mexican", price: "$", quizVibe: "quick", vibe: "reliable, flavorful, fresh", occasion: "nooccasion", location: "Amherst Center", score: 0 }

];

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
const restaurantDisplay = document.getElementById("restaurant-display")
const restrtResponse = document.getElementById("newTable");
const restrtold = document.getElementById("table");
const input = document.getElementById("input");
const createBtn = document.getElementById("createBtn");
const readBtn = document.getElementById("readBtn");
const updateBtn = document.getElementById("updateBtn");
const deleteBtn = document.getElementById("deleteBtn");
const getAll = document.getElementById("getAll");
//const viewAllBtn = document.getElementById("viewAllBtn");
const quizDisplay1 = document.getElementById("result-display1");
const quizDisplay2 = document.getElementById("result-display2");
const quizDisplay3 = document.getElementById("result-display3");


//navigation
const URL = "http://localhost:3260"; // URL of our server
// let rests = [];
// async function viewAllOldRests() {
//     const response = await fetch(`${URL}/allRests`, { method: "GET" });
//     rests = await response.text();
  
//   }

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

// html for results display
function displayRestaurant(display, restaurant) {
    display.innerHTML = "";
    let nameDiv = document.createElement('div');
    let ratingDiv = document.createElement('div');
    let priceDiv = document.createElement('div');
    let locationDiv = document.createElement('div');
    nameDiv.innerHTML = restaurant.name;
    ratingDiv.innerHTML = restaurant.stars;
    priceDiv.innerHTML = restaurant.price;
    locationDiv.innerHTML = restaurant.location;
    display.appendChild(nameDiv);
    display.appendChild(ratingDiv);
    display.appendChild(priceDiv);
    display.appendChild(locationDiv);

    display.innerHTML = `
        <table style="width:200px; text-align: center;" class="borderbox">
            <tr>
                <td class="h4" colspan="2">${restaurant.name}</td>
            </tr>
            <tr>
                <td>Rating:</td>
                <td>${restaurant.stars}</td>
            </tr>
            <tr>
                <td>Price:</td>
                <td>${restaurant.price}</td>
            </tr>
            <tr>
                <td>Location:</td>
                <td>${restaurant.location}</td>
            </tr>
        </table>
    `
}

// quiz logic

const quiz = document.getElementById("foodMoodForm");
quiz.addEventListener("submit", (event) => {
    event.preventDefault();

    let scored_restaurants = [...restaurants];
    
    // reset score
    for(let i = 0; i < scored_restaurants.length; i++) {
        let restaurant = scored_restaurants[i];
        restaurant["score"] = 0;
        scored_restaurants[i] = restaurant;
    }

    // increment score based on results
    const data = new FormData(quiz);
    for (const entry of data) {
        let key = entry[0];
        let value = entry[1];
        for(let i = 0; i < scored_restaurants.length; i++) {
            let restaurant = scored_restaurants[i];
            if(restaurant[key] == value) {
                restaurant["score"] += 1;
                scored_restaurants[i] = restaurant;
            }
        }
    }

    // sort and keep top 3
    scored_restaurants.sort((r1, r2) => r2.score - r1.score);
    let best_restaurants = scored_restaurants.splice(0, 3);

    // display
    displayRestaurant(quizDisplay1, best_restaurants[0]);
    displayRestaurant(quizDisplay2, best_restaurants[1]);
    displayRestaurant(quizDisplay3, best_restaurants[2]);

    console.log(best_restaurants)
});

// map buttons

// before fixing server issues, local storage for map only


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
        restaurantOnMapButton.textContent = restaurant.name;

        restaurantOnMapButton.addEventListener("click", () => {
            displayRestaurant(restaurantDisplay, restaurant);
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
}

// Function to handle create counter action
async function createRestrnt() {
  const id = input.value;
  if (!id) {
    alert("Restraunt id is required!");
    return;
  }

  const response = await fetch(`${URL}/create?id=${id}`, {
    method: "POST",
  });
  const data = await response.json();
  console.log(data);

  restrtResponse.innerHTML = data;
}

// Function to handle read counter action
async function readRestrnt() {
  const id = input.value;
  if (!id) {
    alert("Restraunt id is required!");
    return;
  }

  const response = await fetch(`${URL}/read?id=${id}`, { method: "GET" });
  const data = await response.text();

  restrtResponse.innerHTML = data;
}

// Function to handle update counter action
async function updateRstrn() {
  const id = input.value;
  if (!id) {
    alert("Restraunt name is required!");
    return;
  }

  const response = await fetch(`${URL}/update?id=${id}`, {
    method: "PUT",
  });
  const data = await response.text();

  restrtResponse.innerHTML = data;
}

// Function to handle delete counter action
async function deleteRestrnt() {
  const id = input.value;
  if (!id) {
    alert("Restraunt id is required!");
    return;
  }

  const response = await fetch(`${URL}/delete?id=${id}`, {
    method: "DELETE",
  });
  const data = await response.text();

  restrtResponse.innerHTML = data;
}
async function viewAll() {
    const response = await fetch(`${URL}/all`, { method: "GET" });
    const data = await response.text();
  
    restrtold.innerHTML = data;
  }

createBtn.addEventListener("click", createRestrnt);
readBtn.addEventListener("click", readRestrnt);
updateBtn.addEventListener("click", updateRstrn);
deleteBtn.addEventListener("click", deleteRestrnt);
getAll.addEventListener("click", viewAll);