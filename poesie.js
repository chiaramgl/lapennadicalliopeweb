document.getElementById('poesiaForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const poesia = document.getElementById('poesia').value;

    // Invia la richiesta al server
    fetch('/submit-poesia', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email, poesia }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                alert('La tua poesia è stata inviata con successo!');
                loadPoesieAccettate();
            } else {
                alert('Si è verificato un errore durante l\'invio della poesia.');
            }
        });
});

// Carica poesie accettate
function loadPoesieAccettate() {
    fetch('/get-poesie')
        .then((response) => response.json())
        .then((data) => {
            const poesieContainer = document.getElementById('poesie-accettate');
            poesieContainer.innerHTML = '';
            data.poesie.forEach((poesia) => {
                const poesiaCard = document.createElement('div');
                poesiaCard.className = 'article-card';
                poesiaCard.innerHTML = `
                    <div class="article-date">${poesia.date}</div>
                    <h3>${poesia.nome}</h3>
                    <p>${poesia.content}</p>
                `;
                poesieContainer.appendChild(poesiaCard);
            });
        });
}

document.addEventListener('DOMContentLoaded', loadPoesieAccettate);
