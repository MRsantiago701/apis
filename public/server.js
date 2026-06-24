const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static('public'));

// Ruta modificada para consumir la API oficial de Bluesky
app.get('/api/bluesky', async (req, res) => {
    try {
        // 1. Definimos la cuenta real que quieres consultar
        const actor = 'realmadridfc1.bsky.social';
        const url = `https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=${actor}`;
        
        // 2. Hacemos la petición a la API pública de Bluesky
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Error al consultar la API de Bluesky. Status: ${response.status}`);
        }
        
        const data = await response.json();
        let posts = [];

        // 3. Mapeamos los datos reales devueltos por la API
        if (data.feed && data.feed.length > 0) {
            // Tomamos los últimos 5 posts para mantener tu lógica anterior
            const itemsToProcess = data.feed.slice(0, 5); 
            
            posts = itemsToProcess.map(item => {
                return {
                    text: item.post.record.text, // El texto real de la publicación
                    date: item.post.record.createdAt // La fecha exacta de publicación en Bluesky
                };
            });
        }

        // 4. Si por alguna razón la cuenta no tiene posts, dejamos un respaldo por seguridad
        if (posts.length === 0) {
            posts = [
                { text: "No se encontraron publicaciones recientes en esta cuenta.", date: new Date().toISOString() }
            ];
        }

        // Enviamos la respuesta estructurada tal como la espera tu Front-end
        res.json({ items: posts });

    } catch (error) {
        console.error("--- ERROR EN EL BACKEND ---");
        console.error(error.message);
        console.error("----------------------------");
        res.status(500).json({ error: 'Error al procesar el perfil de Bluesky' });
    }
});

// Arrancar el servidor
app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});