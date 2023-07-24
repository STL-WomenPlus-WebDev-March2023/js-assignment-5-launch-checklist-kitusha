// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    const  missionTarget = document.getElementById("missionTarget");
    missionTarget.innerHTML = `


                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter:${diameter} </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth:${distance} </li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">
                `
   
}

function validateInput(testInput="") {
    //let numberInput = Number(testInput);
   if (testInput === "")
   {
       return "Empty";
   }
   else if (isNaN(testInput))
   {
       return "Not a Number";
   }
   else 
   {
       return "Is a Number";
   }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {

    function delayLaunch() {
        launchStatus.style.color = "red";
        launchStatus.innerHTML = "Shuttle not ready for launch";
        readyToLaunch = false;
    }

    let readyToLaunch = true;
    const statusList = list.querySelectorAll('li');
    const launchStatus = document.getElementById("launchStatus");
    let correctInfo = false;

    if (validateInput(pilot) !== "Not a Number") {
        alert("Invalid input! Please enter a name for the Pilot.");

    }else if (validateInput(copilot) !== "Not a Number") {
        alert("Invalid input! Please enter a  name for the Copilot.");

    }else if (validateInput(fuelLevel) !== "Is a Number") {
        alert("Invalid input! Please enter a number for Fuel Level.");

    }else if (validateInput(cargoLevel) !== "Is a Number") {
        alert("Invalid input! Please enter a number for Cargo Mass .");

    } else {
        correctInfo = true;
    }

    if (correctInfo) {
        statusList[0].innerHTML = `Pilot ${pilot} is ready`;
        statusList[1].innerHTML = `Co-pilot ${copilot} is ready`;
    }

    if (fuelLevel < 10000 && correctInfo) {
        list.style.visibility = "visible";
        statusList[2].innerHTML = "There is not enough fuel level for launch.";
        delayLaunch();
    } else {
        statusList[2].innerHTML = "Fuel level high enough for launch";
    }

    if (cargoLevel > 10000 && correctInfo) {
        list.style.visibility = "visible";
        statusList[3].innerHTML = `Cargo mass is too heavy for launch.`;
        delayLaunch();
    } else {
        statusList[3].innerHTML = "Cargo mass is low enough for launch";
    }

    if (readyToLaunch && correctInfo) {
        launchStatus.style.color = "green";
        launchStatus.innerHTML = "Shuttle is ready for launch";
        list.style.visibility = "visible";
    }

}

async function myFetch() {
    let planetsReturned;
    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
        return response.json()
    });
    return planetsReturned;
}

function pickPlanet(planets) {
    let myPlanet = Math.floor(Math.random() * planets.length);
    return planets[myPlanet];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
