// Write your JavaScript code here!

window.addEventListener("load", function () {

   const form = document.querySelector("form");
   const formSubmit = document.getElementById("formSubmit");

   formSubmit.addEventListener("click", function (event) {

       const inputs = form.querySelectorAll('input[type="text"]');

       for (let i = 0; i < inputs.length; i++) {
           if (inputs[i].value === '') {
               alert('All fields are required!');
               event.preventDefault();
               break;
           }
       }

       const faultyItems = document.getElementById("faultyItems");
       const pilot = inputs[0].value;
       const copilot = inputs[1].value;
       const fuelAmount = inputs[2].value;
       const cargoMass = inputs[3].value;

       formSubmission(document, faultyItems, pilot, copilot, fuelAmount, cargoMass)

       event.preventDefault();
   });


   let listedPlanets;
   // Set listedPlanetsResponse equal to the value returned by calling myFetch()
   let listedPlanetsResponse = myFetch();
   listedPlanetsResponse.then(function (result) {
       listedPlanets = result;
       console.log(listedPlanets);
   }).then(function () {
       console.log(listedPlanets);
       // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.

       const planet = pickPlanet(listedPlanets);
       addDestinationInfo(document, planet.name, planet.diameter, planet.star, planet.distance, planet.moons, planet.image);
   });

});