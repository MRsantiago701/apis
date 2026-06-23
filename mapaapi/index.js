const express = require('express');
const app = express();
const PORT = 3001;

app.get('/map', (req, res) => {
    res.send(`
        <html>
        <head>
          <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css"/>
          <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
        </head>
        <body>
          <div id="map" style="height:500px;"></div>
          <script>
            var upen = [21.512747, -104.812776];

            var map = L.map('map').setView(upen, 19);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            L.marker(upen).addTo(map)
              .bindPopup("Universidad Politécnica del Estado de Nayarit (UPEN)")
              .openPopup();
          </script>
        </body>
        </html>
    `);
});

app.listen(PORT, () => console.log("API de Mapas (OpenStreetMap) corriendo en puerto " + PORT));