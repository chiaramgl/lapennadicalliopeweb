function showMessage(element, message) {
    element.textContent = message;
    element.style.display = 'block';
    setTimeout(() => {
        element.style.display = 'none';
    }, 5000);
}

function submitPoem() {
    var data = new FormData(poemForm);
    fetch("/poesie.php", {
        method: "POST", // Metodo HTTP
        body: data // Converte i dati in una stringa JSON
    }).then(resp => {
        if (resp.ok) {
            const successMessage = document.querySelector('.success-message');
            showMessage(successMessage, "La tua poesia sarà presto valutata per la pubblicazione!");
        } else {
            const errorMessage = document.querySelector('.error-message');
            showMessage(errorMessage, "La poesia non è stata inviata!");
        }
    });
}

function deletePoem(id) {
    var data = new FormData();
    data.append("del", id);
    fetch("/poesie.php", {
        method: "POST", // Metodo HTTP
        body: data // Converte i dati in una stringa JSON
    }).then(resp => {
        if (resp.ok) {
            document.getElementById(id).remove();
            const successMessage = document.querySelector('.success-message');
            showMessage(successMessage, "Poesia eliminata!");
        } else {
            const errorMessage = document.querySelector('.error-message');
            showMessage(errorMessage, "Non è stato possibile eliminare la poesia!");
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const navMobile = document.querySelector('.nav-mobile');
    hamburger.addEventListener('click', function () {
        navMobile.classList.toggle('active');
    });
    document.querySelectorAll('.nav-mobile a').forEach(link => {
        link.addEventListener('click', () => {
            navMobile.classList.remove('active');
        });
    });

    const submitButton = document.getElementById('submitBtn');
    submitButton.addEventListener('click', e => {
        e.preventDefault();
        submitPoem();
    });
});