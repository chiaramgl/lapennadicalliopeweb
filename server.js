const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

let poesieAccettate = [];

app.post('/submit-poesia', (req, res) => {
    const { nome, email, poesia } = req.body;

    // Simula un'email al moderatore
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'cassettadellepoesie@gmail.com',
            pass: 'password_app',
        },
    });

    const mailOptions = {
        from: email,
        to: 'cassettadellepoesie@gmail.com',
        subject: 'Nuova Poesia Inviata',
        text: `Nome: ${nome}\nEmail: ${email}\n\nPoesia:\n${poesia}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.json({ success: false });
        } else {
            console.log('Email inviata:', info.response);
            poesieAccettate.push({ date: new Date().toLocaleString(), nome, content: poesia });
            res.json({ success: true });
        }
    });
});

app.get('/get-poesie', (req, res) => {
    res.json({ poesie: poesieAccettate });
});

app.listen(port, () => {
    console.log(`Server avviato su http://localhost:${port}`);
});
