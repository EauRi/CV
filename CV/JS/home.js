let translations = {}; // Variable pour stocker les traductions

// Fonction pour charger les traductions depuis le fichier JSON
async function loadTranslations(lang) {
    try {
        // Charger le fichier JSON
        const response = await fetch('path/to/lang.json');  // Remplacez par le chemin réel de votre fichier JSON
        const data = await response.json(); // Récupérer le contenu JSON

        translations = data; // Stocker les traductions dans la variable 'translations'
        updateTextContent(lang); // Mettre à jour les éléments avec les traductions
    } catch (error) {
        console.error('Erreur lors du chargement du fichier JSON:', error);
    }
}

// Fonction pour mettre à jour le contenu texte selon la langue
function updateTextContent(lang) {
    if (!translations[lang]) return;

    // Mettre à jour les éléments avec les clés data-key
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    // Mettre à jour les mots-clés dynamiques (ajout des mots dans la grille)
    const keywords = translations[lang].keywords;
    const keywordsContainer = document.querySelector('.grid');
    
    if (keywordsContainer) {
        keywordsContainer.innerHTML = '';  // Vider la grille avant d'ajouter les nouveaux mots
        keywords.forEach(word => {
            const div = document.createElement('div');
            div.className = 'keyword';
            div.textContent = word;
            keywordsContainer.appendChild(div);
        });

        // Repositionner les mots-clés en cercle après la mise à jour
        positionKeywordsInCircle();
    }
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

// Fonction pour disposer les mots-clés en cercle
function positionKeywordsInCircle() {
    const keywords = document.querySelectorAll('.keyword');
    if (keywords.length === 0) {
        console.error('Aucun mot-clé trouvé.');
        return;
    }

    const heroSection = document.querySelector('.hero-section');
    const heroText = document.querySelector('.hero-text');

    if (!heroSection || !heroText) {
        console.error('Section principale ou texte manquant.');
        return;
    }

    // Paramètres pour le cercle
    const radius = 180; // Rayon du cercle
    const heroSectionRect = heroSection.getBoundingClientRect();
    const heroTextRect = heroText.getBoundingClientRect();
    const centerX = heroTextRect.left + heroTextRect.width / 2 - heroSectionRect.left;
    const centerY = heroTextRect.bottom - heroSectionRect.top + 50; // Ajuster la position

    const totalKeywords = keywords.length;
    const angleStep = (2 * Math.PI) / totalKeywords; // Calculer l'angle entre chaque mot-clé

    // Positionner les mots-clés
    keywords.forEach((keyword, index) => {
        const angle = angleStep * index;
        const offsetX = centerX + radius * Math.cos(angle) - keyword.offsetWidth / 2;
        const offsetY = centerY + radius * Math.sin(angle) - keyword.offsetHeight / 2;

        keyword.style.position = 'absolute';
        keyword.style.left = `${offsetX}px`;
        keyword.style.top = `${offsetY}px`;
    });

    // S'assurer que la section a 'position: relative' pour contenir les mots-clés
    heroSection.style.position = 'relative';
}