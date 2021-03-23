import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import MarsConditions from './news-service.js';




$(document).ready(function() {
  $("#marsWeather").click(function() {
    let promise = MarsConditions.getConditions();
    let photoPromise = MarsConditions.getDailyPhoto();
    let marsPhotoPromise = MarsConditions.getDailyMarsPhoto();
    promise.then(function(response) {
      const body = JSON.parse(response);
      $(".showPressure").text(`The atmospheric pressure on Mars is ${body[body.sol_keys[0]]["PRE"].av}`);
      //$(".showWind").text(`The wind on Mars is ${codeherethatparsesjson}`);
    }, function(error) {
      $(".showErrors").text(`There was an error processing your request: ${error}`);
    });
    photoPromise.then(function(response) {
      const photoBody = JSON.parse(response);
      $(".showAstronomyPhoto").html(`Here is the astronomy picture of the day <img src="${photoBody["url"]}" alt="${photoBody["title"]}">`);
    }, function(error) {
      $(".showErrors").text(`There was an error processing your request: ${error}`);
    });
    marsPhotoPromise.then(function(response) {
      const marsPhotoBody = JSON.parse(response);
      $(".showRoverPhoto").html(`Here is the Mars Rover picture of the day <img src="${marsPhotoBody.photos[0].img_src}" alt="${marsPhotoBody["title"]}">`);
    }, function(error) {
      $(".showErrors").text(`There was an error processing your request: ${error}`);
    });
  });
});
