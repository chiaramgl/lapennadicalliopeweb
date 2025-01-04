<?php
header('Content-Type: application/json');

// Gestisci la richiesta di invio della poesia
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Verifica se il form contiene i dati necessari
    if (isset($_POST['nome']) && isset($_POST['poesia'])) {
        $nome = $_POST['nome'];
        $poesia = $_POST['poesia'];

        // Salva la poesia in un database o file (esempio con un array statico)
        // Per una soluzione vera e propria, dovresti usare un database
        $poesie = json_decode(file_get_contents('poesie.json'), true) ?? [];
        $poesie[] = ['nome' => $nome, 'poesia' => $poesia];

        // Salva di nuovo l'array nel file
        file_put_contents('poesie.json', json_encode($poesie));

        echo json_encode(['message' => 'Poesia inviata con successo!']);
    }
    // Gestisci la richiesta di cancellazione
    elseif (isset($_POST['delete']) && isset($_POST['nome']) && isset($_POST['poesia'])) {
        $nome = $_POST['nome'];
        $poesia = $_POST['poesia'];

        // Rimuovi la poesia dal file
        $poesie = json_decode(file_get_contents('poesie.json'), true);
        $poesie = array_filter($poesie, function($item) use ($nome, $poesia) {
            return !($item['nome'] == $nome && $item['poesia'] == $poesia);
        });

        file_put_contents('poesie.json', json_encode(array_values($poesie)));

        echo json_encode(['message' => 'Poesia eliminata con successo!']);
    }
}

// Restituisci tutte le poesie
else {
    $poesie = json_decode(file_get_contents('poesie.json'), true);
    echo json_encode($poesie);
}
?>
