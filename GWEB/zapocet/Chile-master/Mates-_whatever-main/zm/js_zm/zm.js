const FEATURE_LAYER_URL = 'https://services5.arcgis.com/UbiPR9eAyIWvC8EM/arcgis/rest/services/Layer_seminarka/FeatureServer';
const TOKEN = 'VÁŠ_TOKEN';

var mapa = L.map('mapa').setView([-34.773704303745575, -71.54169943220856], 4);

// OPS
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 19
}).addTo(mapa);

async function loadFeatures() {
    const response = await fetch(`${FEATURE_LAYER_URL}/query?where=1=1&outFields=*&f=json&token=${TOKEN}`);
    const data = await response.json();

    data.features.forEach(feature => {
        const { name, description } = feature.attributes;
        const { x: longitude, y: latitude } = feature.geometry;

        L.marker([latitude, longitude])
            .bindPopup(`<b>${name}</b><br>${description}`)
            .addTo(mapa);
    });
}

async function addFeature(name, latitude, longitude, description) {
    const payload = {
        features: [{ geometry: { x: longitude, y: latitude }, attributes: { name, description } }],
        f: 'json',
        token: TOKEN,
    };

    const response = await fetch(`${FEATURE_LAYER_URL}/addFeatures`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (result.addResults[0]?.success) {
        alert('Bod přidán!');
        loadFeatures(); // Znovu načte body
    } else {
        console.error('Chyba při přidání bodu:', result);
    }
}

document.getElementById('data-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const latitude = parseFloat(document.getElementById('latitude').value.trim());
    const longitude = parseFloat(document.getElementById('longitude').value.trim());
    const description = document.getElementById('description').value.trim();

    await addFeature(name, latitude, longitude, description);
});

loadFeatures(); // Načte body při startu
