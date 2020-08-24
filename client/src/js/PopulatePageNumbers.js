/*jshint esversion: 8 */

const populatePageNumbers = (prevData, pages) => {
    let pageNumbers =
        parseInt(prevData.length / 12) + (prevData.length % 12 > 0 && 1);
    const ul = document.createElement("ul");

    for (let i = 1; i <= pageNumbers; i++) {
        const li = document.createElement("li");
        li.appendChild(document.createTextNode(i.toString()));
        ul.appendChild(li);
    }
    ul.childNodes[0] && ul.childNodes[0].classList.add("active");
    pages.appendChild(ul);
};

module.exports = populatePageNumbers;
