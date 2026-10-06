const projectsContainer = document.getElementById("projects");
const sortSelect = document.getElementById("sort");

let projects = [];


// JSON inladen
async function loadProjects() {
    try {
        const response = await fetch("json/projecten.json");

        if (!response.ok) {
            throw new Error("JSON kon niet worden geladen");
        }

        const data = await response.json();

        projects = data;

        renderProjects();

    } catch (error) {
        console.error("Fout bij het laden van de projecten:", error);
    }
}


// Projecten renderen
function renderProjects() {

    projectsContainer.innerHTML = "";

    const sortedProjects = [...projects];

    switch (sortSelect.value) {

        case "id-asc":
            sortedProjects.sort((a, b) => a.id - b.id);
            break;

        case "id-desc":
            sortedProjects.sort((a, b) => b.id - a.id);
            break;

        case "title-asc":
            sortedProjects.sort((a, b) =>
                a.title.localeCompare(b.title)
            );
            break;

        case "title-desc":
            sortedProjects.sort((a, b) =>
                b.title.localeCompare(a.title)
            );
            break;
    }


    sortedProjects.forEach(project => {

        const box = document.createElement("div");
        box.classList.add("box");

        const img = document.createElement("img");
        img.src = project.img;
        img.alt = project.alt;

        const title = document.createElement("h2");
        title.textContent = project.title;

        const description = document.createElement("p");
        description.textContent = project.description;

        const button = document.createElement("button");
        button.classList.add("myButton");
        button.type = "button";
        button.textContent = "Bekijken";

        button.addEventListener("click", () => {
            window.open(project.url, "_blank");
        });

        box.appendChild(img);
        box.appendChild(title);
        box.appendChild(description);
        box.appendChild(button);

        projectsContainer.appendChild(box);
    });
}


// Sorteren wanneer de select verandert
sortSelect.addEventListener("change", renderProjects);


// JSON laden
loadProjects();