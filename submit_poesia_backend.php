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
if
