const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware per analizzare le richieste JSON
app.use(bodyParser.json());

// Dati delle poesie (per simulare un database)
let poesie = [];

// Endpoint per ricevere una poesia
app.post('/submit-poesia', (req, res) => {
    const { nome, email, poesia } = req.body;
    if (!nome || !email || !poesia) {
        return res.status(400).json({ success: false, message: 'Dati incompleti.' });
    }
    // Aggiungi la poesia all'array (puoi sostituirlo con un database)
    poesie.push({ nome, email, poesia, date: new Date().toISOString() });
    res.json({ success: true });
});

// Endpoint per ottenere le poesie accettate
app.get('/get-poesie', (req, res) => {
    res.json({ poesie });
});

// Avvio del server
app.listen(port, () => {
    console.log(`Server avviato su http://localhost:${port}`);
});
