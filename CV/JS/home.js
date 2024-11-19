let translations = {}; // Variable pour stocker les traductions

// Fonction pour charger les traductions à partir du fichier JSON
async function loadTranslations(lang) {
    try {
        const response = await fetch('../JSon/lang.json');
        const data = await response.json();
        translations = data;
        updateTextContent(lang);
    } catch (error) {
        console.error('Erreur lors du chargement du fichier JSON:', error);
    }
}

// Fonction pour mettre à jour le contenu du texte selon la langue
function updateTextContent(lang) {
    if (!translations[lang]) return;

    // Mettre à jour les éléments avec data-key
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    positionKeywordsInCircle(); // Positionner les mots-clés après les avoir ajoutés
}

// Fonction pour définir la langue
function setLanguage(lang) {
    updateTextContent(lang);
    document.documentElement.setAttribute('lang', lang);
}

// Initialiser la langue par défaut (français)
document.addEventListener('DOMContentLoaded', () => {
    loadTranslations('fr'); // Charger les traductions en français par défaut
});

// Fonction pour positionner les mots-clés en cercle
function positionKeywordsInCircle() {
    const keywords = document.querySelectorAll('.keyword');
    if (keywords.length === 0) {
        console.error("Aucun mot-clé trouvé. Vérifiez votre HTML.");
        return;
    }

    const heroSection = document.querySelector(".hero-section");
    const heroText = document.querySelector(".hero-text");

    if (!heroSection || !heroText) {
        console.error("Section principale ou texte manquant.");
        return;
    }

    // Radius et centre du cercle
    const radius = 180; // Vous pouvez ajuster le rayon du cercle ici
    const heroSectionRect = heroSection.getBoundingClientRect();
    const heroTextRect = heroText.getBoundingClientRect();
    const centerX = heroTextRect.left + heroTextRect.width / 2 - heroSectionRect.left;
    const centerY = heroTextRect.bottom - heroSectionRect.top + 50; // Ajustez à 50px sous le texte

    // Calcul de l'angle entre chaque mot-clé
    const totalKeywords = keywords.length;
    const angleStep = (2 * Math.PI) / totalKeywords;

    // Positionner les mots-clés
    keywords.forEach((keyword, index) => {
        const angle = angleStep * index;
        const offsetX = centerX + radius * Math.cos(angle) - keyword.offsetWidth / 2;
        const offsetY = centerY + radius * Math.sin(angle) - keyword.offsetHeight / 2;

        // Appliquer la position calculée
        keyword.style.position = "absolute";
        keyword.style.left = `${offsetX}px`;
        keyword.style.top = `${offsetY}px`;
    });

    // Assurez-vous que la section a "position: relative"
    heroSection.style.position = "relative";
}