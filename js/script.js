const weerKnop = document.querySelector("#weer-knop");
const sluitWeer = document.querySelector("#sluit-weer");
const weatherSidebar = document.querySelector("#weather-sidebar");

weerKnop.addEventListener("click", function() {
    weatherSidebar.classList.add("open");
});

sluitWeer.addEventListener("click", function() {
    weatherSidebar.classList.remove("open");
});