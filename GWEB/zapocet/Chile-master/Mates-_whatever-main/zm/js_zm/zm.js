// Inicializace mapy
var mapa = L.map('mapa').setView([-34.773704303745575, -71.54169943220856], 4);

// Přidání OpenStreetMap vrstvy
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 19
}).addTo(mapa);

// Funkce pro získání bodů z lokální databáze
function getLocalPoints() {
    const points = localStorage.getItem('mapPoints');
    return points ? JSON.parse(points) : [];
}

// Funkce pro uložení bodů do lokální databáze
function saveLocalPoints(points) {
    localStorage.setItem('mapPoints', JSON.stringify(points));
}

// Funkce pro načtení bodů a jejich zobrazení na mapě
function loadFeatures() {
    const points = getLocalPoints();

    points.forEach(({ name, latitude, longitude, description }) => {
        L.marker([latitude, longitude])
            .bindPopup(`<b>${name}</b><br>${description}`)
            .addTo(mapa);
    });
}

// Funkce pro přidání bodu do mapy i databáze
function addFeature(name, latitude, longitude, description) {
    const points = getLocalPoints();
    const newPoint = { name, latitude, longitude, description };
    points.push(newPoint);

    saveLocalPoints(points); // Ulož do databáze

    // Přidání markeru na mapu
    L.marker([latitude, longitude])
        .bindPopup(`<b>${name}</b><br>${description}`)
        .addTo(mapa);

    alert('Bod přidán!');
}

// Obsluha formuláře
document.getElementById('data-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const latitude = parseFloat(document.getElementById('latitude').value.replace(',', '.'));
    const longitude = parseFloat(document.getElementById('longitude').value.replace(',', '.'));
    const description = document.getElementById('description').value.trim();

    if (!name || isNaN(latitude) || isNaN(longitude)) {
        alert('Zkontrolujte, že jste správně zadali všechny údaje.');
        return;
    }

    addFeature(name, latitude, longitude, description);
});

// Načti body při startu
loadFeatures();