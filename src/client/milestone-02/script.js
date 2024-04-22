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
} else if (document.URL.includes("quiz")) {
    goQuiz();
} else {
    goHome();
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
