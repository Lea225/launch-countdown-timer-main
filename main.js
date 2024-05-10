// Date de fin initiale du compte à rebours (14 jours à partir d'aujourd'hui)
let endDate = new Date();
endDate.setDate(endDate.getDate() + 14);

// Stocker les anciennes valeurs des compteurs
let oldDays = -1;
let oldHours = -1;
let oldMinutes = -1;
let oldSeconds = -1;

// Fonction pour mettre à jour le compte à rebours
function updateCountdown() {
    const now = new Date();
    let difference = endDate - now;

    if (difference <= 0) {
        // Réinitialiser la date de fin pour 14 jours à partir de maintenant
        endDate = new Date();
        endDate.setDate(endDate.getDate() + 14);
        difference = endDate - now;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Mettre à jour les compteurs uniquement si la valeur a changé
    if (days !== oldDays) {
        updateElement('.days-count', formatTime(days));
        oldDays = days;
    }
    if (hours !== oldHours) {
        updateElement('.hours-count', formatTime(hours));
        oldHours = hours;
    }
    if (minutes !== oldMinutes) {
        updateElement('.minutes-count', formatTime(minutes));
        oldMinutes = minutes;
    }
    if (seconds !== oldSeconds) {
        updateElement('.seconds-count', formatTime(seconds));
        oldSeconds = seconds;
    }
}

// Fonction pour mettre à jour un élément avec une animation de flip uniquement si le contenu change
function updateElement(selector, newValue) {
    const element = document.querySelector(selector);
    const oldValue = element.textContent;

    if (oldValue !== newValue) {
        // Ajouter la classe d'animation de flip uniquement si le contenu change
        element.classList.add('flip-animation');
        setTimeout(() => {
            element.textContent = newValue;
            element.classList.remove('flip-animation');
        }, 250); // Attendre la moitié de la durée de l'animation avant de mettre à jour le contenu
    } else {
        // Si le contenu ne change pas, mettre à jour simplement le texte sans l'animation
        element.textContent = newValue;
    }
}

// Fonction pour ajouter un zéro devant les chiffres < 10
function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// Appel initial pour démarrer le compte à rebours
updateCountdown();

// Mettre à jour le compte à rebours toutes les secondes
setInterval(updateCountdown, 1000);
