/*jshint esversion: 8 */

const populateYears = (listOfYears) => {
    for (let i = 2006; i <= 2020; i++) {
        const node = document.createElement("li");
        node.appendChild(document.createTextNode(i.toString()));
        listOfYears.appendChild(node);
    }
};

module.exports = populateYears;
