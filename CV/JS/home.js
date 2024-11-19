// Variable globale pour stocker les traductions
let translations = {};

// Fonction pour charger les traductions depuis un fichier JSON en fonction de la langue
function loadTranslations(language) {
  fetch(`../JSon/lang.json`)
    .then(response => response.json())
    .then(data => {
      translations = data;  // Stocke les traductions
      applyTranslations(language);  // Applique les traductions après le chargement
    })
    .catch(error => console.error("Erreur lors du chargement des traductions:", error));
}

// Fonction pour appliquer les traductions sur la page
function applyTranslations(language) {
  // Applique les traductions aux éléments
  const keys = document.querySelectorAll('[data-key]');
  
  keys.forEach((element) => {
    const key = element.getAttribute('data-key');
    if (translations[language] && translations[language][key]) {
      element.textContent = translations[language][key];  // Remplace le texte par la traduction
    }
  });
}

// Fonction pour changer la langue et appliquer les traductions
function setLanguage(language) {
  loadTranslations(language);  // Charge et applique les traductions en fonction de la langue
}

// Appel initial pour charger la langue par défaut (français)
loadTranslations('fr');