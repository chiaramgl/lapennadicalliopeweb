<?php
header('Content-Type: application/json');

// Percorso del file JSON
$file = 'poesie.json';

// Funzione per caricare le poesie
function loadPoesie() {
    global $file;
    if (file_exists($file)) {
        $content = file_get_contents($file);
        return json_decode($content, true) ?? [];
    }
    return [];
}

// Funzione per salvare le poesie
function savePoesie($poesie) {
    global $file;
    file_put_contents($file, json_encode($poesie, JSON_PRETTY_PRINT));
}

// Se il file JSON non esiste, crealo
if (!file_exists($file)) {
    file_put_contents($file, json_encode([]));
}

// Gestione richieste
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode(loadPoesie());
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $poesie = loadPoesie();

    if (isset($_POST['delete']) && $_POST['delete'] === 'true') {
        $nome = $_POST['nome'];
        $poesia = $_POST['poesia'];
        $poesie = array_filter($poesie, function($item) use ($nome, $poesia) {
            return $item['nome'] !== $nome || $item['poesia'] !== $poesia;
        });
        savePoesie($poesie);
        echo json_encode(['message' => 'Poesia eliminata con successo']);
        exit;
    }

    $nome = strip_tags($_POST['nome']);
    $poesia = strip_tags($_POST['poesia']);
    if (trim($nome) && trim($poesia)) {
        $poesie[] = ['nome' => $nome, 'poesia' => $poesia];
        savePoesie($poesie);
        echo json_encode(['message' => 'Poesia inviata con successo']);
    } else {
        echo json_encode(['message' => 'Nome e poesia sono obbligatori']);
    }
    exit;
}
?>
