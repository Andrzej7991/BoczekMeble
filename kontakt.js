const coords = [49.9300302, 19.8010532];
const map = L.map('map').setView(coords, 11);

let coords2 = [50.0647, 19.9450];

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker(coords)
    .addTo(map)
    .bindPopup(`Tu nas można znaleźć \u{2757}\u{1F917}`)
    .openPopup();

map.panBy([140, -165]);

// Utwórz trasę
const routing = L.Routing.control({
    waypoints: [
        L.latLng(coords2), // Początkowy punkt
        L.latLng(coords) // Końcowy punkt
    ],
    routeWhileDragging: true,
    lineOptions: {
        styles: [{ color: 'blue', opacity: 0.6, weight: 4 }]
    },
    language: 'pl',
    show: false // Ukryj kontrolkę trasy
});

routing.on('routeselected', function(e) {
    // Ukryj legendę
    document.querySelector('.leaflet-routing-container').style.display = 'none';
});

map.on('click', function(e) {
    coords2 = e.latlng; // Współrzędne klikniętego punktu
    
    // Usuń aktualną trasę
    map.removeControl(routing);
    
    // Utwórz nową trasę z uwzględnieniem nowego punktu docelowego
    routing.setWaypoints([
        L.latLng(coords2), // Nowy punkt docelowy
        L.latLng(coords) // Końcowy punkt
    ]);
    
    // Dodaj nową trasę do mapy
    routing.addTo(map);
});

routing.addTo(map);