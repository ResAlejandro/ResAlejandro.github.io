console.log("script loaded");

async function haalWeerOp() {

    navigator.geolocation.getCurrentPosition(
        async function(position) {

            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            await haalData(latitude, longitude, "Huidige locatie");
        },

        async function() {

            // Geen locatie → Amsterdam
            const latitude = 52.3676;
            const longitude = 4.9041;
            

            await haalData(latitude, longitude, "Amsterdam (fallback)");
        }
    );
}

async function haalData(latitude, longitude, locatie) {

    const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&past_days=0&current=temperature_2m,relative_humidity_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;

    try {

        const response = await fetch(url);
        const data = await response.json();

        console.log(data);

        toonWeer(data,locatie);

    } catch (error) {

        console.error("Er ging iets fout:", error);

    }
}

haalWeerOp();

function toonWeer(data, locatie) {

    const weerContainer = document.querySelector("#weer");

    weerContainer.innerHTML = "";

    // Huidig weer
    const huidig = document.createElement("div");
    huidig.classList.add("huidig-weer");

    const locatieNaam = document.createElement("h3");
    locatieNaam.textContent = locatie;
    locatieNaam.classList.add("locatie");

    const msg = document.createElement("p");
    msg.textContent = "Als je je huidige locatie temperatuur wil? Accepteer locatie toestemming."
    msg.classList.add("msg");
    

    const titel = document.createElement("h3");
    titel.textContent = "Nu";

    const temperatuur = document.createElement("p");
    temperatuur.textContent =
        `Temperatuur: ${data.current.temperature_2m}°C`;
    temperatuur.classList.add("stats");

    const luchtvochtigheid = document.createElement("p");
    luchtvochtigheid.textContent =
        `Luchtvochtigheid: ${data.current.relative_humidity_2m}%`;
    luchtvochtigheid.classList.add("stats");

    const wind = document.createElement("p");
    wind.textContent =
        `Wind: ${data.current.wind_speed_10m} km/u`;
    wind.classList.add("stats");    

    huidig.appendChild(locatieNaam);
    if(locatie == "Amsterdam (fallback)"){
         huidig.appendChild(msg);
    }

    huidig.appendChild(titel);
    huidig.appendChild(temperatuur);
    huidig.appendChild(luchtvochtigheid);
    huidig.appendChild(wind);

    weerContainer.appendChild(huidig);


    // Zoek de datum van vandaag
    const vandaag = data.current.time.substring(0, 10);

    const vandaagIndex = data.daily.time.indexOf(vandaag);

    // Toon 7 dagen vanaf vandaag
   for (let i = 0; i < data.daily.time.length; i++) {
        
        const dag = document.createElement("div");
        dag.classList.add("weer-dag");

        

        const maximum = document.createElement("p");
        maximum.classList.add("max-temp");
        maximum.textContent =
            `Max: ${data.daily.temperature_2m_max[i]}°C`;

        const minimum = document.createElement("p");
        minimum.classList.add("min-temp");
        minimum.textContent =
            `Min: ${data.daily.temperature_2m_min[i]}°C`;

        const datum = document.createElement("h3");
        datum.textContent = data.daily.time[i];

        
        dag.appendChild(maximum);
        dag.appendChild(minimum);
        dag.appendChild(datum);

        weerContainer.appendChild(dag);
    }
}