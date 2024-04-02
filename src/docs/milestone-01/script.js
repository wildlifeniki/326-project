const vision = document.getElementById("vision");
const team = document.getElementById("team");
const overview = document.getElementById("overview");
const applicationParts = document.getElementById("application-parts");
const dataRequirements = document.getElementById("data-requirements");
const wireFrames = document.getElementById("wire-frames");
const realWorld = document.getElementById("real-world");
const integrativeExperience = document.getElementById("integrative-experience");
let array = [];
//array.push(vision);
//array.push(team);
array.push(overview);
array.push(applicationParts);
array.push(dataRequirements);
array.push(wireFrames);
array.push(realWorld);
array.push(integrativeExperience);
for (let i = 0; i < array.length; i++){
    const theP = document.createElement("p");
    //if (i % 2 === 0){
      //  array[i].classList.add("boxesWhite");
   // }
 //   else{
  //      array[i].classList.add("boxesMaroon");
  //  }
    if (i === 0){
        array[i].classList.add("boxesWhite");
        const node = document.createTextNode(" ");
        theP.appendChild(node);
        array[i].appendChild(theP);
    }
    if (i === 1){
        array[i].classList.add("boxesMaroon");
        const node = document.createTextNode(" ");
        theP.appendChild(node);
        array[i].appendChild(theP);
    }
    if (i === 2){
        array[i].classList.add("boxesWhite");
        const node = document.createTextNode(" ");
        theP.appendChild(node);
        array[i].appendChild(theP);
    }
    if (i === 3){
        array[i].classList.add("boxesMaroon");
        const node = document.createTextNode(" ");
        theP.appendChild(node);
        array[i].appendChild(theP);
    }
    if (i === 4){
        array[i].classList.add("boxesWhite");
        const node = document.createTextNode(" ");
        theP.appendChild(node);
        array[i].appendChild(theP);
    }
    if (i === 5){
        array[i].classList.add("boxesMaroon");
        const node = document.createTextNode(" ");
        theP.appendChild(node);
        array[i].appendChild(theP);
    }
}
let counter = 0;
function dynamicCounter(){
    counter = counter + 1;
}
const counterElem = document.getElementById("counter");
counterElem.createTextNode(counter); // it's mad about this for some reason
let button = document.createElement("input");
button.type = "button";
button.addEventListener("click", dynamicCounter);
counterElem.appendChild(button);