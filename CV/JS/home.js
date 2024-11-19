let translations = {}; // Variable pour stocker les traductions

// Fonction pour charger les traductions à partir du fichier JSON
async function loadTranslations(lang) {
    try {
        // Charger le fichier JSON
        const response = await fetch('../JSon/lang.json');
        const data = await response.json(); // Récupérer le contenu JSON

        translations = data; // Stocker les traductions dans la variable 'translations'
        updateTextContent(lang); // Mettre à jour les éléments avec les traductions
    } catch (error) {
        console.error('Erreur lors du chargement du fichier JSON:', error);
    }
}

// Fonction pour mettre à jour le contenu du texte selon la langue
function updateTextContent(lang) {
    // Vérifiez que les traductions sont chargées
    if (!translations[lang]) return;

    // Mettre à jour tous les éléments avec data-key
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    // Mettre à jour les mots-clés dynamiques (si nécessaire)
    const keywords = translations[lang].keywords;
    const keywordsContainer = document.querySelector('.grid');
    if (keywordsContainer) {
        // Mettre à jour le contenu des mots-clés dans la grille
        const keywordElements = document.querySelectorAll('.keyword');
        keywordElements.forEach((el, index) => {
            el.textContent = keywords[index] || '';
        });
    }

    // Repositionner les mots-clés en cercle après la mise à jour du texte
    positionKeywordsInCircle();
}

// Fonction pour définir la langue
function setLanguage(lang) {
    updateTextContent(lang); // Met à jour le texte de la page
    document.documentElement.setAttribute('lang', lang); // Change l'attribut lang dans le HTML
}

// Initialiser la langue par défaut (français)
document.addEventListener('DOMContentLoaded', () => {
    loadTranslations('fr'); // Charger les traductions en français par défaut
});

// Fonction pour positionner les mots-clés en cercle autour du texte
function positionKeywordsInCircle() {
    const keywords = document.querySelectorAll(".keyword");
    if (keywords.length === 0) {
        console.error("Aucun mot-clé trouvé. Vérifiez votre HTML.");
        return;
    }

    const heroSection = document.querySelector(".hero-section");
    const heroText = document.querySelector(".hero-text");

    // Vérification de l'existence de la section principale et du texte
    if (!heroSection || !heroText) {
        console.error("Section principale ou texte manquant.");
        return;
    }

    // Paramètres pour ajuster la disposition
    const radius = 180;  // Rayon du cercle
    const heroTextRect = heroText.getBoundingClientRect();
    
    // Calcul de la position du centre du texte (titre + sous-titre)
    const centerX = heroTextRect.left + heroTextRect.width / 2;
    const centerY = heroTextRect.top + heroTextRect.height / 2 + 50;  // Décalage de 50px en dessous du texte

    // Calcul de l'angle entre les mots-clés en fonction du nombre total de mots
    const totalKeywords = keywords.length;
    const angleStep = (2 * Math.PI) / totalKeywords;

    // Positionnement des mots-clés autour du texte
    keywords.forEach((keyword, index) => {
        const angle = angleStep * index;
        const offsetX = centerX + radius * Math.cos(angle) - keyword.offsetWidth / 2;
        const offsetY = centerY + radius * Math.sin(angle) - keyword.offsetHeight / 2;

        // Application des positions calculées
        keyword.style.position = "absolute";
        keyword.style.left = `${offsetX}px`;
        keyword.style.top = `${offsetY}px`;
    });

    // Assurer que la section principale a un positionnement relatif
    heroSection.style.position = "relative";
}