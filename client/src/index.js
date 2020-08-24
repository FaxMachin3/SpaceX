/* jshint esversion: 8 */

// imports for webpack
import scss from "./scss/style.scss";
import noImage from "./assests/no-image.png";
import favicon from "./assests/favicon.png";

// useful function call
import populateYears from "./js/PopulateYears";
import getInitialData from "./js/GetInitialData";
import toggleFilter from "./js/ToggleFilter";

let prevLaunchYear = null;
let prevLaunchSucc = null;
let prevLandSucc = null;
let launchYear = null;
let successfulLaunch = null;
let successfulLanding = null;
let prevData = null;
let prevNumber = null;

// dom elements
const listOfYears = document.querySelector(".list-of-years");
const filter = document.querySelector(".filter");
const filterHeading = document.querySelector(".filter-heading");
const filterContent = document.querySelector(".filter-content");
const cardContainer = document.querySelector(".card-container");
const pages = document.querySelector(".pages");

// populating the list of years in filter container
populateYears(listOfYears);

// fetches initial data
getInitialData(
    prevData,
    pages,
    filterContent,
    cardContainer,
    filter,
    launchYear,
    prevLaunchYear,
    successfulLaunch,
    successfulLanding,
    prevLaunchSucc,
    prevLandSucc,
    prevNumber
);

// toggling neccesary classes when required
toggleFilter(pages, filterHeading, filterContent, cardContainer);
