/*jshint esversion: 8 */

const toggleFilter = (pages, filterHeading, filterContent, cardContainer) => {
    // filterHeading.addEventListener("click", () => {
    //     pages.classList.toggle("active");
    //     filterHeading.classList.toggle("active");
    //     filterContent.classList.toggle("active");
    // });

    pages.addEventListener("mouseover", () => {
        pages.classList.remove("active");
        filterHeading.classList.remove("active");
        filterContent.classList.remove("active");
    });

    cardContainer.addEventListener("mouseover", () => {
        pages.classList.remove("active");
        filterHeading.classList.remove("active");
        filterContent.classList.remove("active");
    });
};

module.exports = toggleFilter;
