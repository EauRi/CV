let translations = {};  // Cette variable va contenir toutes les traductions

// Fonction pour charger le fichier JSON avec les traductions
async function loadTranslations(lang) {
    try {
        // Charger le fichier JSON en fonction de la langue
        const response = await fetch('../JSon/lang.json');
        const data = await response.json();  // Parse le JSON récupéré

        translations = data;  // Assigner les données à la variable 'translations'

        // Mettre à jour le contenu de la page avec les traductions
        updateTextContent(lang);
    } catch (error) {
        console.error('Erreur lors du chargement du fichier JSON:', error);
    }
}

// Fonction pour mettre à jour le texte de la page selon la langue sélectionnée
function updateTextContent(lang) {
    if (!translations[lang]) return;  // Vérifier que la langue existe dans les traductions

    // Mettre à jour tous les éléments ayant un attribut 'data-key'
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
}

// Fonction pour changer la langue
function setLanguage(lang) {
    updateTextContent(lang);  // Mettre à jour le contenu avec la nouvelle langue
    document.documentElement.setAttribute('lang', lang);  // Met à jour l'attribut 'lang' du HTML
}

// Charger les traductions en français par défaut
document.addEventListener('DOMContentLoaded', () => {
    loadTranslations('fr');  // Charger les traductions en français au chargement de la page
});
