const vision = document.getElementById("vision");
const team = document.getElementById("team");
const overview = document.getElementById("overview");
const applicationParts = document.getElementById("application-parts");
const dataRequirements = document.getElementById("data-requirements");
const wireFrames = document.getElementById("wire-frames");
const realWorld = document.getElementById("real-world");
const integrativeExperience = document.getElementById("integrative-experience");

let array = [];
array.push(overview);
array.push(applicationParts);
array.push(dataRequirements);
array.push(wireFrames);
array.push(realWorld);
array.push(integrativeExperience);

for (let i = 0; i < array.length; i++) {
    const section = array[i];
    if (i % 2 === 0){
        array[i].classList.add("borderbox");
    }
    else{
        array[i].classList.add("unborderbox");
    }
}

let image_i = 0
const images = [
    "wireframe1.png",
    "wireframe2.png",
    "wireframe3.png"
]
function cycle() {
    let current = document.getElementById("wireframe-img");
    image_i += 1;
    if (image_i >= images.length) {
        image_i = 0
    }
    current.src = images[image_i];
    console.log(current.value)
}


let button = document.createElement("input");
button.type = "button";
button.value = "Next";
button.addEventListener("click", cycle);
wireFrames.appendChild(button);