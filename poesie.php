<?php
// Percorso del file JSON
$file = 'poesie.json';
$pending = 'pending.json';
$publication = false;

// Funzione per caricare le poesie
function loadPoesie($file) {
    if (file_exists($file)) {
        $content = file_get_contents($file);
        return json_decode($content, true) ?? [];
    }
    return [];
}

// Funzione per salvare le poesie
function savePoesie($file, $poesie) {
    file_put_contents($file, json_encode($poesie, JSON_PRETTY_PRINT));
}

function sendValidationEmail($poesia) {
    $from = "lapennadicalliope@altervista.org";
    $to = "cassettadellepoesie@gmail.com";
    $subject = "Richiesta di pubblicazione";
    $buttonLink = "https://lapennadicalliope.altervista.org/poesie.php?pub={$poesia['id']}";
    
    $headers = "MIME-Version: 1.0" . "\r\n";
	$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= 'From: ' . $from . "\r\n" . 'X-Mailer: PHP/' . phpversion();

    $message = "<html><body style='display: block;'>";
    $message .= "<h3>Titolo: {$poesia['title']}</h3>";
    $message .= "<h3>Autore: {$poesia['author']}</h3>";
    $message .= "<p>{$poesia['content']}</p>";
    $message .= "<a href='" . $buttonLink . "' style='display: inline-block; text-decoration: none; padding: 10px 20px; margin-bottom: 20px; font-size: 16px; color: white; background-color: #007BFF; border: none; border-radius: 5px; cursor: pointer;'>";
    $message .= htmlspecialchars("Pubblica");
    $message .= "</a>";
    $message .= "</body></html>";
    
    mail($to, $subject, $message, $headers);
}

// Se il file JSON non esiste, crealo
if (!file_exists($file)) {
    file_put_contents($file, json_encode([]));
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    global $file;
    global $pending;
    $poesie = loadPoesie($file);
    $in_attesa = loadPoesie($pending);

    if (isset($_GET['pub'])) {
        $poem_id = $_GET['pub'];
        $poesia = null;
        $in_attesa = array_filter($in_attesa, function($item) use ($poem_id, &$poesia) {
            if ($item['id'] === $poem_id) {
                $poesia = $item;
                return false;
            }

            return true;
        });
        savePoesie($pending, $in_attesa);
        $poesie[] = $poesia;
        savePoesie($file, $poesie);
        $publication = true;
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    global $file;
    global $pending;
    $poesie = loadPoesie($file);
    $in_attesa = loadPoesie($pending);

    if (isset($_POST['del'])) {
        $poem_id = $_POST['del'];
        $poesie = array_filter($poesie, function($item) use ($poem_id) {
            return $item['id'] !== $poem_id;
        });
        savePoesie($file, $poesie);
        exit;
    }

    $titolo = strip_tags($_POST['title']);
    $nome = strip_tags($_POST['author']);
    $poesia = strip_tags($_POST['content']);

    $id = "p" . count($in_attesa);
    $poem = ['id' => $id, 'title' => $titolo, 'author' => $nome, 'content' => $poesia, 'date' => date('d-m-Y')];
    $in_attesa[] = $poem;
    savePoesie($pending, $in_attesa);
    sendValidationEmail($poem);
}
?>

<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Gestione Poesie di La Penna di Calliope">
    <title>Quale sarà il tuo verso? - La Penna di Calliope</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1 class="site-title"><a href="index.html">La Penna di Calliope</a></h1>
        <nav>
            <ul class="nav-desktop">
                <li><a href="index.html">Home</a></li>
                <li><a href="chi-siamo.html">Chi Siamo</a></li>
                <li><a href="eventi.html">Eventi</a></li>
                <li><a href="poesie.php">Poesie</a></li>
                <li><a href="contatti.html">Contatti</a></li>
            </ul>
            <div class="nav-mobile">
                <a href="index.html">Home</a>
                <a href="chi-siamo.html">Chi Siamo</a>
                <a href="eventi.html">Eventi</a>
                <a href="poesie.php">Poesie</a>
                <a href="contatti.html">Contatti</a>
            </div>
        </nav>
        <div class="hamburger" id="hamburger">
            <div></div>
            <div></div>
            <div></div>
        </div>
    </header>

    <div class="poems-container">
        <h2>Quale sarà il tuo verso?</h2>
        
        <!-- Messaggi di feedback -->
        <div class="success-message"></div>
        <div class="error-message"></div>

        <!-- Form per l'invio delle poesie -->
        <form class="poem-form" id="poemForm">
            <div class="form-group">
                <label for="title">Titolo della Poesia</label>
                <input type="text" id="title" name="title" required>
            </div>

            <div class="form-group">
                <label for="author">Autore</label>
                <input type="text" id="author" name="author" required>
            </div>

            <div class="form-group">
                <label for="content">Testo della Poesia</label>
                <textarea id="content" name="content" required></textarea>
            </div>

            <button type="submit" id="submitBtn">Invia Poesia</button>
        </form>

        <!-- Lista delle poesie -->
        <div class="poems-list" id="poemsList">
            <!-- Le poesie verranno inserite qui dinamicamente -->
            <?php
                $poems = loadPoesie($file);
                foreach ($poems as $poem) {?>
                    <div class="poem-item" id="<?=$poem['id']?>">
                        <h3><?=$poem["title"]?></h3>
                        <div class="poem-content"><?=$poem["content"]?></div>
                        <div class="poem-metadata">di <?=$poem["author"]?> | <?=$poem["date"]?></div>
                        <button class="delete-btn" onclick="deletePoem('<?=$poem['id']?>')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                <?php
                }
            ?>
        </div>
    </div>

    <footer>
        <div class="social-links">
            <a href="https://chat.whatsapp.com/EaWRHGp9gHNJevkrgZn2ca" title="WhatsApp" target="_blank"><i class="fab fa-whatsapp"></i></a>
            <a href="https://www.facebook.com/profile.php?id=61558745237938" title="Facebook" target="_blank"><i class="fab fa-facebook"></i></a>
            <a href="https://www.instagram.com/lapennadicalliope/" title="Instagram" target="_blank"><i class="fab fa-instagram"></i></a>
        </div>
        <p>&copy; 2025 La Penna di Calliope. Tutti i diritti riservati.</p>
    </footer>

    <script src="poesie.js"></script>
    <script>
        window.onload = function() {
            const successMessage = document.querySelector('.success-message');
            if (<?=$publication?>) showMessage(successMessage, "La poesia è stata pubblicata!");
        }
    </script>
</body>
</html>