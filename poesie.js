document.addEventListener('DOMContentLoaded', function() {
    const poesiaForm = document.getElementById('poesiaForm');
    
    // Funzione per caricare le poesie
    function loadPoesieAccettate() {
        fetch('poesie_backend.php')
            .then(response => response.json())
            .then(poesie => {
                const poesieContainer = document.getElementById('poesie-list');
                poesieContainer.innerHTML = '';
                poesie.forEach(poesia => {
                    const poesiaCard = document.createElement('div');
                    poesiaCard.className = 'article-card poesia-item';
                    const date = new Date().toLocaleDateString('it-IT');
                    poesiaCard.innerHTML = `
                        <div class="article-date">${date}</div>
                        <h3>${poesia.nome}</h3>
                        <p>${poesia.poesia}</p>
                        <button onclick="deletePoesia('${poesia.nome}', '${poesia.poesia.replace(/'/g, "\\'")}')">Elimina</button>
                    `;
                    poesieContainer.appendChild(poesiaCard);
                });
            })
            .catch(error => {
                console.error('Errore nel caricamento delle poesie:', error);
            });
    }

    // Gestione dell'invio del form
    poesiaForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);

        fetch('poesie_backend.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert(data.message);
                this.reset(); // Pulisce il form
                loadPoesieAccettate(); // Ricarica le poesie
            }
        })
        .catch(error => {
            console.error('Errore nell\'invio della poesia:', error);
            alert('Si è verificato un errore durante l\'invio della poesia.');
        });
    });

    // Funzione per eliminare una poesia
    window.deletePoesia = function(nome, poesia) {
        if (confirm('Sei sicuro di voler eliminare questa poesia?')) {
            const formData = new FormData();
            formData.append('nome', nome);
            formData.append('poesia', poesia);
            formData.append('delete', 'true');

            fetch('poesie_backend.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                loadPoesieAccettate(); // Ricarica le poesie dopo l'eliminazione
            })
            .catch(error => {
                console.error('Errore nella cancellazione della poesia:', error);
                alert('Si è verificato un errore durante la cancellazione della poesia');
            });
        }
    };

    // Carica le poesie quando la pagina si carica
    loadPoesieAccettate();
});
