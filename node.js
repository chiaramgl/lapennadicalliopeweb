app.post('/submit-poesia', (req, res) => {
    const { nome, email, poesia } = req.body;
    // Esegui la logica per salvare i dati (ad esempio, nel database)
    
    res.json({ success: true });
});
