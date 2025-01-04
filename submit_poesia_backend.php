<?php
// Abilita il CORS se necessario
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Verifica che la richiesta sia di tipo POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recupera i dati inviati dal form
    $nome = htmlspecialchars($_POST['nome']);
    $poesia = htmlspecialchars($_POST['poesia']);

    // Path del file dove salvare le poesie
    $file_path = 'poesie.txt';

    // Verifica che il file sia scrivibile
    if (is_writable($file_path)) {
        // Formatta la poesia da salvare
        $poesia_da_salvare = "Nome: $nome\nPoesia: $poesia\n\n";

        // Salva la poesia nel file
        if (file_put_contents($file_path, $poesia_da_salvare, FILE_APPEND)) {
            echo "Poesia inviata con successo!";
        } else {
            http_response_code(500);
            echo "Errore durante il salvataggio della poesia.";
        }
    } else {
        http_response_code(500);
        echo "Il file non è scrivibile.";
    }
} else {
    http_response_code(403);
    echo "Accesso vietato.";
}
?>
