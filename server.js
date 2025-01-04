const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Percorso del file JSON che memorizza le poesie
const poesieFile = './poesie.json';

// Funzione per caricare le poesie esistenti
function loadPoesie() {
  if (fs.existsSync(poesieFile)) {
    const content = fs.readFileSync(poesieFile, 'utf8');
    return JSON.parse(content) || [];
  }
  return [];
}

// Funzione per salvare le poesie
function savePoesie(poesie) {
  fs.writeFileSync(poesieFile, JSON.stringify(poesie, null, 2));
}

// Rotta per caricare tutte le poesie accettate
app.get('/get-poesie', (req, res) => {
  const poesie = loadPoesie();
  res.json({ poesie });
});

// Rotta per inviare una poesia
app.post('/submit-poesia', (req, res) => {
  const { nome, email, poesia } = req.body;

  if (!nome || !email || !poesia) {
    return res.status(400).json({ success: false, message: 'Tutti i campi sono obbligatori' });
  }

  // Carica poesie esistenti
  const poesie = loadPoesie();
  const newPoesia = { nome, email, poesia, date: new Date().toLocaleString() };

  // Aggiungi la poesia alla lista
  poesie.push(newPoesia);
  savePoesie(poesie);

  // Invia email di conferma all'autore della poesia
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tuoemail@gmail.com', // Inserisci la tua email
      pass: 'tuapassword', // Inserisci la tua password o app password
    },
  });

  const mailOptions = {
    from: 'tuoemail@gmail.com',
    to: email,
    subject: 'Conferma Invio Poesia',
    text: `Caro ${nome},\n\nLa tua poesia è stata ricevuta con successo!\n\nContenuto:\n\n${poesia}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: 'Errore nell\'invio dell\'email' });
    }
    console.log('Email inviata: ' + info.response);
    return res.status(200).json({ success: true, message: 'La tua poesia è stata inviata con successo!' });
  });
});

// Avvio del server
app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});
