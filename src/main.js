import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import MarsConditions from './news-service.js';




$(document).ready(function() {
  $("#marsWeather").click(function() {
    let promise = MarsConditions.getConditions();
    let photoPromise = MarsConditions.getDailyPhoto();
    promise.then(function(response) {
      const body = JSON.parse(response);
      $(".showPressure").text(`The atmospheric pressure on Mars is ${body[body.sol_keys[3]]["PRE"].av}`);
      //$(".showWind").text(`The wind on Mars is ${codeherethatparsesjson}`);
    }, function(error) {
      $(".showErrors").text(`There was an error processing your request: ${error}`);
    });
    photoPromise.then(function(response) {
      const photoBody = JSON.parse(response);
      $(".showPhoto").html(`Here is the astronomy picture of the day <img src="${photoBody["url"]}" alt="${photoBody["title"]}">`);
    }, function(error) {
      $(".showErrors").text(`There was an error processing your request: ${error}`);
    });
  });
});
