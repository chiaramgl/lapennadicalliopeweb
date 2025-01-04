document.addEventListener('DOMContentLoaded', function () {
    const poetryForm = document.getElementById('poetryForm');
    const poetryList = document.getElementById('poetryList');

    // Carica le poesie esistenti
    function loadPoetries() {
        fetch('submit_poesia_backend.php')
            .then(response => response.json())
            .then(poems => {
                poetryList.innerHTML = '';
                poems.forEach(poem => {
                    const poetryItem = createPoetryItem(poem);
                    poetryList.appendChild(poetryItem);
                });
            })
            .catch(error => console.error('Errore nel caricamento delle poesie:', error));
    }

    // Crea un elemento poesia
    function createPoetryItem(poem) {
        const div = document.createElement('div');
        div.className = 'poetry-item';

        const date = new Date().toLocaleDateString('it-IT');
        div.innerHTML = `
            <h3>${poem.nome}</h3>
            <div class="poetry-content">${poem.poesia}</div>
            <div class="poetry-meta">
                <span>Pubblicata il ${date}</span>
                <button class="delete-button" onclick="deletePoetry('${poem.nome}', '${poem.poesia.replace(/'/g, "\\'")}')">
                    Elimina
                </button>
            </div>
        `;
        return div;
    }

    // Gestione dell'invio del form
    poetryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(poetryForm);

        fetch('submit_poesia_backend.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    alert(data.message);
                    poetryForm.reset();
                    loadPoetries();
                }
            })
            .catch(error => {
                console.error('Errore nell\'invio della poesia:', error);
                alert('Si è verificato un errore durante l\'invio della poesia.');
            });
    });

    // Funzione per eliminare una poesia
    window.deletePoetry = function (nome, poesia) {
        if (confirm('Sei sicuro di voler eliminare questa poesia?')) {
            const formData = new FormData();
            formData.append('nome', nome);
            formData.append('poesia', poesia);
            formData.append('delete', 'true');

            fetch('submit_poesia_backend.php', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    alert(data.message);
                    loadPoetries();
                })
                .catch(error => {
                    console.error('Errore nella cancellazione della poesia:', error);
                    alert('Si è verificato un errore durante la cancellazione della poesia');
                });
        }
    };

    // Carica le poesie all'avvio
    loadPoetries();
});
