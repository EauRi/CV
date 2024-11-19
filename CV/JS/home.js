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

// Fonction pour changer la langue et mettre à jour les boutons
function setLanguage(language) {
  // Appeler les fonctions de traduction
  loadTranslations(language);

  // Gérer l'apparence des boutons
  const frButton = document.getElementById('fr-button');
  const enButton = document.getElementById('en-button');

  // Réinitialise les deux boutons
  frButton.classList.remove('selected');
  enButton.classList.remove('selected');

  // Applique la classe 'selected' au bouton correspondant
  if (language === 'fr') {
    frButton.classList.add('selected');
  } else {
    enButton.classList.add('selected');
  }
}

// Charger une langue par défaut (par exemple, 'fr') au démarrage
document.addEventListener('DOMContentLoaded', () => {
  const defaultLanguage = 'fr'; // Remplacez par la langue par défaut de votre choix
  setLanguage(defaultLanguage);
});

// Fonction pour créer et positionner les mots-clés en cercle à la fin de la page
function createKeywords() {
  // Récupère les mots-clés de la langue sélectionnée
  const keywords = [
    translations[fr].keyword_office_365,
    translations[fr].keyword_vscode,
    translations[fr].keyword_eclipse,
    translations[fr].keyword_jetbrains,
    translations[fr].keyword_c,
    translations[fr].keyword_cpp,
    translations[fr].keyword_java,
    translations[fr].keyword_html,
    translations[fr].keyword_css,
    translations[fr].keyword_javascript,
    translations[fr].keyword_python,
    translations[fr].keyword_sql,
    translations[fr].keyword_git,
  ];

  // Créer un conteneur pour les mots-clés et l'ajouter à la fin de la page
  const container = document.createElement('div');
  container.classList.add('keywords-container');
  document.body.appendChild(container);

  // Rayon du cercle
  const radius = 200; 
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
    keywordElement.style.left = `calc(50% + ${x}px)`;
    keywordElement.style.top = `calc(50% + ${y}px)`;

    // Rotation de chaque mot-clé pour qu'il soit lisible
    keywordElement.style.transform = `rotate(${angle}deg)`;
    keywordElement.style.fontSize = '14px'; // Ajustez la taille du texte
    keywordElement.style.backgroundColor = 'rgba(200, 94, 249, 0.36)';
    keywordElement.style.color = 'rgb(212, 163, 115)';
  });
}
