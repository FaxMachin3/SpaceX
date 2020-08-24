/*jshint esversion: 8 */

const populateData = (data, cardContainer) => {
    data.forEach((details, index) => {
        const div = document.createElement("div");
        div.classList.add("card", "p-1", "my-1");

        div.innerHTML = `
            <ul>
                <li class="logo">${
                    details.links.mission_patch_small
                        ? `<img src=${details.links.mission_patch_small} alt="not available"/>`
                        : `<img src="imgs/no-image.png" alt="not available">`
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
            const li = document.createElement("li");
            const text = document.createTextNode(list.toString());
            li.appendChild(text);
            missionId.appendChild(li);
        });

        if (details.mission_id.length == 0) {
            const liNew = document.createElement("li");
            const liText = document.createTextNode("NA");
            liNew.appendChild(liText);
            missionId.appendChild(liNew);
        }
    });
};

module.exports = populateData;
