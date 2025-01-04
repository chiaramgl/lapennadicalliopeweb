const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

app.use(bodyParser.json());
app.use(express.static('public')); // Serve file statici come index.html e poesie.js

let poesie = []; // Memoria temporanea per le poesie inviate

// Endpoint per inviare una poesia
app.post('/submit-poesia', (req, res) => {
    const { nome, email, poesia } = req.body;

    if (!nome || !email || !poesia) {
        return res.json({ success: false, message: 'Dati mancanti!' });
    }

    const nuovaPoesia = { nome, content: poesia, date: new Date().toLocaleString() };
    poesie.push(nuovaPoesia);

    // Invia email per approvazione
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'cassettadellepoesie@gmail.com',
            pass: 'YOUR_PASSWORD_HERE' // Cambia con la tua password
        }
    });

    const mailOptions = {
        from: 'cassettadellepoesie@gmail.com',
        to: 'cassettadellepoesie@gmail.com',
        subject: 'Nuova poesia ricevuta',
        html: `<h3>${nome} (${email}) ha inviato una poesia:</h3><p>${poesia}</p>`
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error(err);
            return res.json({ success: false, message: 'Errore durante l\'invio dell\'email.' });
        }
        res.json({ success: true });
    });
});

// Endpoint per ottenere poesie accettate
app.get('/get-poesie', (req, res) => {
    res.json({ poesie });
});

// Avvia il server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server in esecuzione su http://localhost:${PORT}`);
});
