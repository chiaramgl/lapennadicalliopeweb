document.getElementById('menu-toggle').addEventListener('click', function() {
    document.getElementById('mobile-menu').classList.toggle('hidden');
});

document.getElementById('poesiaForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const poesia = document.getElementById('poesia').value;

    // Invia la richiesta al server
    fetch('/submit-poesia', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, email, poesia })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('La tua poesia è stata inviata con successo!');
            loadPoesieAccettate(); // Ricarica le poesie accettate
        } else {
            alert('Si è verificato un errore durante l\'invio della poesia.');
        }
    });
});

// Funzione per caricare le poesie accettate
function loadPoesieAccettate() {
    fetch('/get-poesie')
        .then(response => response.json())
        .then(data => {
            const poesieContainer = document.getElementById('poesie-accettate');
            poesieContainer.innerHTML = '';
            data.poesie.forEach(poesia => {
                const poesiaCard = document.createElement('div');
                poesiaCard.className = 'article-card';
                poesiaCard.innerHTML = `
                    <div class="article-date">${poesia.date}</div>
                    <h3 class="article-title">${poesia.nome}</h3>
                    <div class="article-preview">${poesia.content}</div>
                `;
                poesieContainer.appendChild(poesiaCard);
            });
        });
}

// Carica le poesie accettate al caricamento della pagina
document.addEventListener('DOMContentLoaded', loadPoesieAccettate);
