// Inizializza Quill
const quill = new Quill('#poesia-editor', {
    theme: 'snow',
    modules: {
        toolbar: [['bold', 'italic', 'underline']]
    }
});

// Invio della poesia
document.getElementById('poesiaForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const poesia = quill.root.innerHTML;

    fetch('/submit-poesia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, poesia })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('La tua poesia è stata inviata con successo!');
                loadPoesieAccettate();
            } else {
                alert('Errore durante l\'invio della poesia.');
            }
        });
});

// Carica le poesie accettate
function loadPoesieAccettate() {
    fetch('/get-poesie')
        .then(response => response.json())
        .then(data => {
            const poesieContainer = document.getElementById('poesie-accettate');
            poesieContainer.innerHTML = '';
            data.poesie.forEach(poesia => {
                const div = document.createElement('div');
                div.innerHTML = `
                    <h3>${poesia.nome}</h3>
                    <p>${poesia.content}</p>
                    <small>${poesia.date}</small>
                `;
                poesieContainer.appendChild(div);
            });
        });
}

document.addEventListener('DOMContentLoaded', loadPoesieAccettate);
