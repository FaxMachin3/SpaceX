/*jshint esversion: 6 */

import scss from "./scss/style.scss";

let prevLaunchYear = null;
let prevLaunchSucc = null;
let prevLandSucc = null;
let launchYear = null;
let successfulLaunch = null;
let successfulLanding = null;
let prevData = null;

const listOfYears = document.querySelector(".list-of-years");
const filter = document.querySelector(".filter");
const filterHeading = document.querySelector(".filter-heading");
const filterContent = document.querySelector(".filter-content");
const cardContainer = document.querySelector(".card-container");
const pages = document.querySelector(".pages");
let prevNumber = null;

const populateYears = () => {
    for (let i = 2006; i <= 2020; i++) {
        const node = document.createElement("li");
        // node.classList.add("test");
        node.appendChild(document.createTextNode(i.toString()));
        listOfYears.appendChild(node);
    }
};

populateYears();

const toggleFilter = () => {
    filterHeading.addEventListener("click", () => {
        filterHeading.classList.toggle("active");
        filterContent.classList.toggle("active");
    });
};

toggleFilter();

const getInitialData = async () => {
    if (!prevData) {
        const res = await fetch(
            "https://api.spaceXdata.com/v3/launches?limit=100"
        );

        const data = await res.json();
        prevData = data;
    }

    populatePageNumbers(prevData.length);
    const newData = prevData.slice(0, 12);
    populateData(newData);
};

const populatePageNumbers = (count) => {
    let pageNumbers =
        parseInt(prevData.length / 12) + (prevData.length % 12 > 0 && 1);
    const ul = document.createElement("ul");

    for (let i = 1; i <= pageNumbers; i++) {
        const li = document.createElement("li");
        li.appendChild(document.createTextNode(i.toString()));
        ul.appendChild(li);
    }
    ul.childNodes[0].classList.add("active");
    pages.appendChild(ul);
};

const populateData = (data) => {
    data.forEach((details, index) => {
        const div = document.createElement("div");
        div.classList.add("card", "p-1", "my-1");

        div.innerHTML = `
            <ul>
                <li class="logo">${
                    details.links.mission_patch_small
                        ? `<img src=${details.links.mission_patch_small} />`
                        : `<img src="imgs/attachment-no-image-available.png" alt="not available">`
                }</li>
                <li><span>${details.mission_name} #${
            details.flight_number
        }</span></li>
                <li><span>Mission IDs:</span> <ul class="mission-id${index}"></ul></li>
                <li><span>Launch Year:</span> ${details.launch_year}</li>
                <li><span>Succesful Launch:</span> ${
                    details.launch_success
                }</li>
                <li><span>Succesful Landing:</span> ${
                    details.mission_id.length > 0 ? true : false
                }</li>
            </ul>
        `;

        cardContainer.appendChild(div);

        const missionId = document.querySelector(`.mission-id${index}`);
        details.mission_id.forEach((list) => {
            const li = document.createElement("span");
            const text = document.createTextNode(list.toString());
            li.appendChild(text);
            missionId.appendChild(li);
        });

        details.mission_id.length == 0 &&
            missionId.appendChild(
                document
                    .createElement("li")
                    .appendChild(document.createTextNode("NA"))
            );
    });
};

getInitialData();

const applyFilter = async () => {
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

            const reqURL = `https://api.spaceXdata.com/v3/launches?limit=30${
                launchYear ? `&launch_year=${launchYear}` : ``
            }${successfulLaunch ? `&launch_success=${successfulLaunch}` : ``}${
                successfulLanding ? `&land_success=${successfulLanding}` : ``
            }`;

            const res = await fetch(reqURL);
            const data = await res.json();
            prevData = data;
            const newData = prevData.slice(0, 12);
            console.log(newData);

            cardContainer.innerHTML = "";
            pages.innerHTML = "";

            populatePageNumbers(prevData.length);
            populateData(newData);
        }
    });
};

applyFilter();

const changePage = () => {
    pages.addEventListener("click", (e) => {
        if (e.target.tagName == "LI") {
            if (!prevNumber) {
                prevNumber = pages.childNodes[0].childNodes[0];
            }
            prevNumber.classList.remove("active");
            e.target.classList.add("active");
            prevNumber = e.target;
            const num = parseInt(e.target.innerText);
            const start = (num - 1) * 12;
            const newData = prevData.slice(start, start + 12);
            cardContainer.innerHTML = "";
            populateData(newData);
        }
    });
};

changePage();
