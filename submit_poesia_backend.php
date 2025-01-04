<?php
header('Content-Type: application/json');

// Percorso del file dove vengono memorizzate le poesie
$poesieFile = 'poesie.json';

// Funzione per leggere le poesie dal file
function getPoesie() {
    global $poesieFile;
    if (file_exists($poesieFile)) {
        return json_decode(file_get_contents($poesieFile), true) ?? [];
    }
    return [];
}

// Funzione per scrivere le poesie nel file
function savePoesie($poesie) {
    global $poesieFile;
    file_put_contents($poesieFile, json_encode($poesie, JSON_PRETTY_PRINT));
}

// Gestione delle richieste POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Controlla se si tratta di una richiesta di invio di poesia
    if (isset($_POST['nome']) && isset($_POST['poesia'])) {
        $nome = $_POST['nome'];
        $poesia = $_POST['poesia'];

        // Recupera le poesie esistenti
        $poesie = getPoesie();
        
        // Aggiungi la nuova poesia alla lista
        $poesie[] = ['nome' => $nome, 'poesia' => $poesia];
        
        // Salva la lista aggiornata
        savePoesie($poesie);

        echo json_encode(['message' => 'Poesia inviata con successo!']);
    }
    // Controlla se si tratta di una richiesta di eliminazione di poesia
    elseif (isset($_POST['delete']) && isset($_POST['nome']) && isset($_POST['poesia'])) {
        $nome = $_POST['nome'];
        $poesia = $_POST['poesia'];

        // Recupera le poesie esistenti
        $poesie = getPoesie();
        
        // Filtra le poesie, rimuovendo quella da eliminare
        $poesie = array_filter($poesie, function($item) use ($nome, $poesia) {
            return !($item['nome'] == $nome && $item['poesia'] == $poesia);
        });

        // Ristabilisce l'array numerato
        $poesie = array_values($poesie);

        // Salva la lista aggiornata
        savePoesie($poesie);

        echo json_encode(['message' => 'Poesia eliminata con successo!']);
    }
}

// Se la richiesta non è POST, restituisce tutte le poesie
else {
    $poesie = getPoesie();
    echo json_encode($poesie);
}
?>
