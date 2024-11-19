// Variable pour stocker les traductions
let translations = {};

// Fonction pour charger les traductions depuis un fichier JSON
async function loadTranslations(lang) {
    try {
        // Remplacer 'path_to_your_translation_file.json' par le chemin réel de ton fichier JSON
        const response = await fetch('path_to_your_translation_file.json');
        const data = await response.json(); // Charger les données JSON
        translations = data; // Stocker les traductions dans la variable 'translations'
        updateTextContent(lang); // Mettre à jour les éléments avec les traductions
    } catch (error) {
        console.error('Erreur lors du chargement du fichier JSON:', error);
    }
}

// Fonction pour mettre à jour le contenu des éléments selon la langue
function updateTextContent(lang) {
    // Vérifie si les traductions pour cette langue existent
    if (!translations[lang]) return;

    // Mettre à jour le texte des éléments ayant un attribut data-key
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    // Mettre à jour les mots-clés dans le rond autour du titre et du sous-titre
    const keywordsContainer = document.querySelector('.grid');
    if (keywordsContainer) {
        keywordsContainer.innerHTML = ''; // Vider le conteneur avant de le remplir avec de nouveaux mots-clés
        Object.keys(translations[lang]).forEach(key => {
            if (key.startsWith('keyword_')) { // Filtrer les clés qui commencent par 'keyword_'
                const div = document.createElement('div');
                div.className = 'keyword'; // Appliquer la classe 'keyword' pour le style des mots-clés
                div.textContent = translations[lang][key];
                keywordsContainer.appendChild(div); // Ajouter chaque mot-clé au conteneur
            }
        });

        // Disposer les mots-clés en rond autour du texte titre et sous-titre
        arrangeKeywordsInCircle(keywordsContainer);
    }
}

// Fonction pour arranger les mots-clés en cercle autour du titre et du sous-titre
function arrangeKeywordsInCircle(container) {
    const radius = 200; // Rayon du cercle
    const angleStep = 360 / container.children.length; // Angle entre chaque mot-clé
    const centerX = window.innerWidth / 2; // Position horizontale du centre
    const centerY = window.innerHeight / 2; // Position verticale du centre

    Array.from(container.children).forEach((el, index) => {
        const angle = angleStep * index;
        const x = centerX + radius * Math.cos(angle * Math.PI / 180); // Calcul de la position X
        const y = centerY + radius * Math.sin(angle * Math.PI / 180); // Calcul de la position Y

        el.style.position = 'absolute';
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        el.style.transform = `translate(-50%, -50%)`; // Pour centrer le mot-clé autour de son point
    });
}

// Fonction pour changer la langue
function setLanguage(lang) {
    updateTextContent(lang); // Mettre à jour le texte et les mots-clés
    document.documentElement.setAttribute('lang', lang); // Changer l'attribut lang dans le HTML
}

// Initialiser la langue par défaut (français)
document.addEventListener('DOMContentLoaded', () => {
    loadTranslations('fr'); // Charger les traductions en français par défaut
});