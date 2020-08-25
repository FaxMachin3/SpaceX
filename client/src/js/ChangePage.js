/* jshint esversion: 8 */

const populateData = require("./PopulateData");

const changePage = (pages, prevNumber, prevData, cardContainer) => {
    pages &&
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
                populateData(newData, cardContainer);
            }
        });
};

module.exports = changePage;
