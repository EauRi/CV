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
    const keywordsContainer = document.querySelector('.keywords-grid');
    if (keywordsContainer) {
        keywordsContainer.innerHTML = '';
        keywords.forEach(word => {
            const div = document.createElement('div');
            div.className = 'keyword';
            div.textContent = word;
            keywordsContainer.appendChild(div);
        });
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