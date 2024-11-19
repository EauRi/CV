// Variable globale pour stocker les traductions
let translations = {};

// Fonction pour charger les traductions depuis un fichier JSON en fonction de la langue
function loadTranslations(language) {
  fetch(`../JSon/lang.json`)
    .then(response => response.json())
    .then(data => {
      translations = data;  // Stocke les traductions
      applyTranslations(language);  // Applique les traductions après le chargement
      createKeywords(language);  // Crée les mots-clés en cercle à la fin de la page
    })
    .catch(error => console.error("Erreur lors du chargement des traductions:", error));
}

// Fonction pour appliquer les traductions sur la page
function applyTranslations(language) {
  const keys = document.querySelectorAll('[data-key]');
  
  keys.forEach((element) => {
    const key = element.getAttribute('data-key');
    if (translations[language] && translations[language][key]) {
      element.textContent = translations[language][key];  // Remplace le texte par la traduction
    }
  });
}

// Fonction pour changer la langue et afficher le bouton approprié
function setLanguage(language) {
  // Appeler les fonctions de traduction
  loadTranslations(language);

  // Gérer l'affichage des boutons
  const frButton = document.getElementById('fr-button');
  const enButton = document.getElementById('en-button');

  if (language === 'fr') {
    frButton.style.display = 'none'; // Cacher le bouton FR
    enButton.style.display = 'inline-block'; // Montrer le bouton EN
  } else {
    frButton.style.display = 'inline-block'; // Montrer le bouton FR
    enButton.style.display = 'none'; // Cacher le bouton EN
  }
}

// Charger une langue par défaut (par exemple, 'fr') au démarrage
document.addEventListener('DOMContentLoaded', () => {
  const defaultLanguage = 'fr'; // Remplacez par la langue par défaut de votre choix
  setLanguage(defaultLanguage);
});