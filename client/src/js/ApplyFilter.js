/*jshint esversion: 8 */

const populatePageNumbers = require("./PopulatePageNumbers");
const populateData = require("./PopulateData");

const applyFilter = async (
    pages,
    filter,
    launchYear,
    successfulLaunch,
    successfulLanding,
    prevLaunchYear,
    prevLaunchSucc,
    prevLandSucc,
    cardContainer
) => {
    filter.addEventListener("click", async (e) => {
        if (e.target.tagName === "LI") {
            let currTarget = e.target;

            if (
                e.target.parentNode.previousElementSibling.innerText ===
                "Launch Year"
            ) {
                launchYear = e.target.innerText.toLowerCase();
                prevLaunchYear && prevLaunchYear.classList.remove("active");
                currTarget.classList.add("active");
                prevLaunchYear = currTarget;
            }
            if (
                e.target.parentNode.previousElementSibling.innerText ===
                "Successful Launch"
            ) {
                successfulLaunch = e.target.innerText.toLowerCase();
                prevLaunchSucc && prevLaunchSucc.classList.remove("active");
                currTarget.classList.add("active");
                prevLaunchSucc = currTarget;
            }
            if (
                e.target.parentNode.previousElementSibling.innerText ===
                "Successful Landing"
            ) {
                successfulLanding = e.target.innerText.toLowerCase();
                prevLandSucc && prevLandSucc.classList.remove("active");
                currTarget.classList.add("active");
                prevLandSucc = currTarget;
            }

            const reqURL = `https://api.spaceXdata.com/v3/launches?limit=100${
                launchYear ? `&launch_year=${launchYear}` : ``
            }${successfulLaunch ? `&launch_success=${successfulLaunch}` : ``}${
                successfulLanding ? `&land_success=${successfulLanding}` : ``
            }`;

            const res = await fetch(reqURL);
            const data = await res.json();

            prevData = data;
            const newData = prevData.slice(0, 12);

            cardContainer.innerHTML = "";
            pages.innerHTML = "";

            populatePageNumbers(prevData, pages);
            populateData(newData, cardContainer);
        }
    });
};

module.exports = applyFilter;
