<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Pagina di contatti di La Penna di Calliope">
    <meta name="keywords" content="contatti, La Penna di Calliope, collaborazioni, proposte, idee">
    <meta name="author" content="La Penna di Calliope">
    <title>Contatti - La Penna di Calliope</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');
        
        body {
            margin: 0;
            font-family: 'EB Garamond', serif;
            color: #dcd6f7;
            background-color: #1e1e2f;
            line-height: 1.6;
            font-size: 18px;
            padding-bottom: 140px; /* Aggiungi spazio per il footer */
        }

        header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1em 2em;
            background-color: rgba(41, 41, 61, 0.95);
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }

        .site-title {
            font-family: 'EB Garamond', serif;
            font-style: italic;
            font-size: 1.5em;
            color: #dcd6f7;
            margin: 0;
        }

        .site-title a {
            text-decoration: none;
            color: inherit;
        }

        nav {
            display: flex;
            align-items: center;
        }

        .nav-desktop {
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
            gap: 2em;
        }

        .nav-desktop li {
            display: inline;
        }

        nav a {
            text-decoration: none;
            color: #dcd6f7;
            font-size: 1.2em;
            transition: color 0.3s ease;
        }

        nav a:hover {
            color: #bb86fc;
        }

        /* Stile mobile */
        .nav-mobile {
            display: none;
            flex-direction: column;
            gap: 1em;
            padding-left: 1em;
            background-color: rgba(41, 41, 61, 0.95);
            position: absolute;
            top: 60px;
            right: 0;
            width: 200px;
            padding: 1em;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        .hamburger {
            display: none;
            cursor: pointer;
            flex-direction: column;
            gap: 5px;
        }

        .hamburger div {
            width: 25px;
            height: 3px;
            background-color: #dcd6f7;
        }

        footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: rgba(41, 41, 61, 0.95);
            padding: 1em 2em;
            text-align: center;
        }

        .social-links {
            display: flex;
            justify-content: center;
            gap: 2em; /* Aumenta lo spazio tra le icone */
            margin-top: 1em;
        }

        .social-links a {
            color: #dcd6f7;
            font-size: 1.5em;
            transition: color 0.3s ease;
        }

        .social-links a:hover {
            color: #bb86fc;
        }

        .content-section {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2em;
            padding-bottom: 120px; /* Spazio per il footer */
        }

        h2 {
            color: #dcd6f7;
            font-size: 2em;
        }

        p {
            color: #dcd6f7;
            font-size: 1.1em;
            line-height: 1.6;
        }

        .contact-form {
            background-color: #2a2a3a;
            border-radius: 8px;
            padding: 1.5em;
            max-width: 600px;
            margin: 2em 0;
            width: 100%;
        }

        .contact-form input, .contact-form textarea {
            width: 100%;
            padding: 0.8em;
            margin-bottom: 1.2em;
            background-color: #3a3a4d;
            color: #dcd6f7;
            border: none;
            border-radius: 6px;
        }

        .contact-form textarea {
            min-height: 150px;
        }

        .contact-form button {
            padding: 0.8em 1.5em;
            background-color: #bb86fc;
            border: none;
            color: #fff;
            font-size: 1.1em;
            border-radius: 6px;
            cursor: pointer;
        }

        .contact-form button:hover {
            background-color: #9b57e4;
        }

        /* Media Queries per dispositivi mobili */
        @media (max-width: 768px) {
            .site-title {
                font-size: 1.3em;
            }

            .nav-desktop {
                display: none;
            }

            .hamburger {
                display: flex;
            }

            .nav-mobile.active {
                display: flex;
            }

            .social-links {
                flex-direction: row;
                justify-content: center;
                gap: 2em; /* Aumentato lo spazio tra le icone */
            }

            .content-section {
                padding: 1.5em;
            }

            .contact-form {
                padding: 1.2em;
                width: 100%;
                margin: 1em 0;
            }
        }

        @media (max-width: 480px) {
            body {
                font-size: 16px;
            }

            .site-title {
                font-size: 1.2em;
            }

            nav a {
                font-size: 1.2em;
            }

            .contact-form input, .contact-form textarea {
                padding: 1em;
            }

            .contact-form button {
                padding: 1em 2em;
            }
        }

        /* Aggiungere spazio alla parte superiore per il footer */
        .content-section {
            padding-bottom: 160px; /* Aggiungi abbastanza spazio per non sovrapporsi al footer */
        }
    </style>
</head>
<body>
    <header>
        <h1 class="site-title"><a href="index.html">La Penna di Calliope</a></h1>
        <nav>
            <ul class="nav-desktop">
                <li><a href="index.html">Home</a></li>
                <li><a href="chi-siamo.html">Chi Siamo</a></li>
                <li><a href="eventi.html">Eventi</a></li>
                <li><a href="poesie.html">Poesie</a></li>
                <li><a href="contatti.html">Contatti</a></li>
            </ul>
            <div class="nav-mobile">
                <a href="index.html">Home</a>
                <a href="chi-siamo.html">Chi Siamo</a>
                <a href="eventi.html">Eventi</a>
                <a href="poesie.html">Poesie</a>
                <a href="contatti.html">Contatti</a>
            </div>
        </nav>
        <div class="hamburger" id="hamburger">
            <div></div>
            <div></div>
            <div></div>
        </div>
    </header>

    <main>
        <section class="content-section" id="contatti">
            <h2>Contatti</h2>
            <p>Per qualsiasi domanda o informazione, non esitare a contattarci utilizzando il modulo sottostante.</p>
            <div class="contact-form">
                <form action="submit_contact_backend.php" method="post">
                    <input type="text" name="nome" placeholder="Il tuo nome" required>
                    <input type="email" name="email" placeholder="La tua email" required>
                    <textarea name="messaggio" placeholder="Il tuo messaggio" required></textarea>
                    <button type="submit">Invia</button>
                </form>
            </div>
        </section>
    </main>

    <footer>
        <div class="social-links">
            <a href="https://chat.whatsapp.com/EaWRHGp9gHNJevkrgZn2ca" title="WhatsApp" target="_blank"><i class="fab fa-whatsapp"></i></a>
            <a href="https://www.facebook.com/profile.php?id=61558745237938" title="Facebook" target="_blank"><i class="fab fa-facebook"></i></a>
            <a href="https://www.instagram.com/lapennadicalliope/" title="Instagram" target="_blank"><i class="fab fa-instagram"></i></a>
        </div>
        <p>&copy; 2025 La Penna di Calliope. Tutti i diritti riservati.</p>
    </footer>

    <script>
        // JavaScript per il menu hamburger
        document.addEventListener('DOMContentLoaded', function() {
            const hamburger = document.getElementById('hamburger');
            const navMobile = document.querySelector('.nav-mobile');

            hamburger.addEventListener('click', function() {
                navMobile.classList.toggle('active');
            });

            // Chiudi il menu quando si clicca su un link
            document.querySelectorAll('.nav-mobile a').forEach(link => {
                link.addEventListener('click', () => {
                    navMobile.classList.remove('active');
                });
            });
        });
    </script>
</body>
</html>
