const cross = document.querySelector('.cross');
const intro = document.querySelector('.intro');
const oNasBTN = document.querySelector('.O-Nas');
const logo = document.querySelector('.logo');

logo.addEventListener('click', (e) => {
    if (window.scrollY > 0) {
        // Przewinięcie strony do początku
        window.scrollTo({
            top: 0, // Przewinięcie do góry strony
            behavior: 'smooth' // Płynne przewinięcie
        });
    }
})


const header = document.querySelector('header');

function hideHeader() {
    header.style.display = "none";
}

function showHeader() {
    header.style.display = "flex";
}








cross.addEventListener('click', () => {
    intro.style.transition = "opacity 0.5s ease"; // Dodanie efektu transition
    intro.style.opacity = "0"; // Ustawienie przezroczystości na 0
    setTimeout(() => {
        intro.style.display = "none"; // Ukrycie elementu po zakończeniu efektu transition
    }, 500); // Czas trwania efektu transition (0.5s)
});

oNasBTN.addEventListener('click', () => {
    const introDisplayStyle = window.getComputedStyle(intro).getPropertyValue('display');
    
    if (introDisplayStyle === 'none') {
        intro.style.transition = "opacity 0.5s ease"; // Dodanie efektu transition dla opacity
        intro.style.opacity = "0"; // Ustawienie przezroczystości na 0
        setTimeout(() => {
            intro.style.opacity = "1"; // Przywrócenie pełnej widoczności elementu po opóźnieniu
            intro.style.display = "block"; // Ustawienie display na block
        }, 100); // Krótkie opóźnienie przed przywróceniem pełnej widoczności
    }

    if (window.scrollY > 0) {
        // Przewinięcie strony do początku
        window.scrollTo({
            top: 0, // Przewinięcie do góry strony
            behavior: 'smooth' // Płynne przewinięcie
        });
    }
});

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


