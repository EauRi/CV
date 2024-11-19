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

// Fonction pour créer et positionner les mots-clés en cercle à la fin de la page
function createKeywords(language) {
  // Récupère les mots-clés de la langue sélectionnée
  const keywords = [
    translations[language].keyword_office_365,
    translations[language].keyword_vscode,
    translations[language].keyword_eclipse,
    translations[language].keyword_jetbrains,
    translations[language].keyword_c,
    translations[language].keyword_cpp,
    translations[language].keyword_java,
    translations[language].keyword_html,
    translations[language].keyword_css,
    translations[language].keyword_javascript,
    translations[language].keyword_python,
    translations[language].keyword_sql,
    translations[language].keyword_git,
    translations[language].keyword_curieuse,
    translations[language].keyword_autonome,
    translations[language].keyword_perseverante,
    translations[language].keyword_polyvalente,
  ];

  // Créer un conteneur pour les mots-clés et l'ajouter à la fin de la page
  const container = document.createElement('div');
  container.classList.add('keywords-container');
  document.body.appendChild(container);

  // Appliquer du style pour positionner correctement le cercle
  container.style.position = 'relative';
  container.style.width = '100%';
  container.style.height = '300px'; // Ajustez la taille du conteneur
  container.style.marginTop = '50px'; // Ajouter un peu d'espace avant le cercle
  container.style.textAlign = 'center';

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
    keywordElement.style.left = `calc(50% + ${x}px)`;
    keywordElement.style.top = `calc(50% + ${y}px)`;

    // Rotation de chaque mot-clé pour qu'il soit lisible
    keywordElement.style.transform = `rotate(${angle}deg)`;
    keywordElement.style.fontSize = '14px'; // Ajustez la taille du texte
    keywordElement.style.padding = '5px';
    keywordElement.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
    keywordElement.style.borderRadius = '5px';
    keywordElement.style.color = 'white';
  });
}

// Fonction pour changer la langue et appliquer les traductions
function setLanguage(language) {
  loadTranslations(language);  // Charge et applique les traductions en fonction de la langue
}

// Assurez-vous que le DOM est chargé avant d'exécuter le script
document.addEventListener("DOMContentLoaded", function() {
  // Appel initial pour charger la langue par défaut (français)
  loadTranslations('fr');
});