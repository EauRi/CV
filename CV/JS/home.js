// Variable globale pour stocker les traductions
let translations = {};

// Fonction pour charger les traductions depuis un fichier JSON en fonction de la langue
function loadTranslations(language) {
  fetch(`../JSon/lang.json`)
    .then(response => response.json())
    .then(data => {
      translations = data;  // Stocke les traductions
      applyTranslations(language);  // Applique les traductions après le chargement
      createKeywords(language);  // Crée les mots-clés en cercle autour du titre
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

// Fonction pour créer et positionner les mots-clés en cercle autour du titre
function createKeywords(language) {
  // Récupère les mots-clés de la langue sélectionnée
  const keywords = translations[language] ? translations[language].keywords : [];

  // Cibler le conteneur des mots-clés
  const container = document.querySelector('.keywords-container');
  
  // Vider le conteneur avant d'ajouter les mots-clés
  container.innerHTML = '';

  // Rayon du cercle
  const radius = 150; 
  const totalKeywords = keywords.length;

  // Ajouter chaque mot-clé dans le conteneur
  keywords.forEach((keyword, index) => {
    const keywordElement = document.createElement('div');
    keywordElement.classList.add('keyword');
    keywordElement.textContent = keyword;
    container.appendChild(keywordElement);

    // Calculer l'angle de chaque mot-clé sur le cercle
    const angle = (360 / totalKeywords) * index;

    // Positionner chaque mot-clé sur le cercle
    const x = radius * Math.cos((angle - 90) * Math.PI / 180); // -90 pour ajuster l'angle de départ
    const y = radius * Math.sin((angle - 90) * Math.PI / 180);

    // Appliquer la position avec une transformation CSS
    keywordElement.style.position = 'absolute';
    keywordElement.style.left = `50%`;
    keywordElement.style.top = `50%`;
    keywordElement.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;

    // Rotation de chaque mot-clé pour qu'il soit lisible
    keywordElement.style.transform += ` rotate(${angle}deg)`;
  });
}

// Fonction pour changer la langue et appliquer les traductions
function setLanguage(language) {
  loadTranslations(language);  // Charge et applique les traductions en fonction de la langue
}

// Appel initial pour charger la langue par défaut (français)
loadTranslations('fr');