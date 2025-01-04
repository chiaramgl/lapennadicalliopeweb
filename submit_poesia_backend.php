<?php
header('Content-Type: application/json');

// Percorso del file JSON che memorizza le poesie
$file = 'poesie.json';

// Funzione per caricare le poesie esistenti
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

// Gestione delle richieste
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $poesie = loadPoesie();
    
    // Gestione eliminazione
    if (isset($_POST['delete'])) {
        $nome = $_POST['nome'];
        $poesia = $_POST['poesia'];
        
        $poesie = array_filter($poesie, function($item) use ($nome, $poesia) {
            return !($item['nome'] === $nome && $item['poesia'] === $poesia);
        });
        
        savePoesie($poesie);
        echo json_encode(['message' => 'Poesia eliminata con successo']);
        exit;
    }
    
    // Gestione nuovo inserimento
    if (isset($_POST['nome']) && isset($_POST['poesia'])) {
        $newPoesia = [
            'nome' => strip_tags($_POST['nome']),
            'poesia' => strip_tags($_POST['poesia'])
        ];
        
        array_push($poesie, $newPoesia);
        savePoesie($poesie);
        echo json_encode(['message' => 'Poesia inviata con successo']);
        exit;
    }
}

// Gestione richiesta GET per caricare le poesie
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode(loadPoesie());
    exit;
}
?>
