<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$method = $_SERVER['REQUEST_METHOD'];
$file_path = 'poesie.json';

if ($method == 'POST') {
    // Recupera i dati inviati dal form
    $nome = htmlspecialchars($_POST['nome']);
    $poesia = htmlspecialchars($_POST['poesia']);

    // Crea il file se non esiste
    if (!file_exists($file_path)) {
        file_put_contents($file_path, json_encode([]));
    }

    // Recupera le poesie esistenti
    $poesie = json_decode(file_get_contents($file_path), true);

    // Aggiungi la nuova poesia
    $poesie[] = ['nome' => $nome, 'poesia' => $poesia];

    // Salva tutte le poesie
    file_put_contents($file_path, json_encode($poesie));

    echo json_encode(['message' => 'Poesia inviata con successo!']);
} elseif ($method == 'GET') {
    // Recupera tutte le poesie
    if (file_exists($file_path)) {
        $poesie = file_get_contents($file_path);
        echo $poesie;
    } else {
        echo json_encode([]);
    }
} else {
    http_response_code(403);
    echo json_encode(['message' => 'Accesso vietato.']);
}
?>
