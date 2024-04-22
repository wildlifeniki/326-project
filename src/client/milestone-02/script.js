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

contentDiv.innerHTML = "";
let currentNav = navHome;
let currentDiv = homeDiv;

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

if (document.URL.includes("quiz")) {
    goQuiz();
} else if (document.URL.includes("map")) {
    goQuiz();
} else if (document.URL.includes("restaurants")) {
    goRestaurants();
} else {
    goHome();
}
