/* jshint esversion: 8 */

const populateData = require("./PopulateData");
const populatePageNumbers = require("./PopulatePageNumbers");
const applyFilter = require("./ApplyFilter");
const changePage = require("./ChangePage");

const getInitialData = async (
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
) => {
    if (!prevData) {
        const res = await fetch(
            "https://api.spaceXdata.com/v3/launches?limit=100"
        );

        const data = await res.json();
        prevData = data;
    }

    filterContent.style.transition = "transform 0.2s, opacity 0.2s";
    pages.style.opacity = "1";

    populatePageNumbers(prevData, pages);
    const newData = prevData.slice(0, 12);
    populateData(newData, cardContainer);

    // fetches data on the basis of filter
    applyFilter(
        pages,
        filter,
        launchYear,
        prevLaunchYear,
        successfulLaunch,
        successfulLanding,
        prevLaunchSucc,
        prevLandSucc,
        cardContainer
    );

    // called on page change
    changePage(pages, prevNumber, prevData, cardContainer);
};

module.exports = getInitialData;
