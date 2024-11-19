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

// Fonction pour créer le cercle de mots-clés autour du titre
function createKeywords() {
  const keywordsData = [
    'office_365', 'vscode', 'eclipse', 'jetbrains', 'c', 'cpp', 'java', 'html', 'css', 'javascript', 'python', 'sql', 'git', 'curieuse', 'autonome', 'perseverante', 'polyvalente'
  ];

  const container = document.querySelector('.hero-text');
  if (!container) {
    console.error("Le conteneur .hero-text n'a pas été trouvé.");
    return;
  }

  const circleContainer = document.createElement('div');
  circleContainer.classList.add('keywords-container');
  container.appendChild(circleContainer); // Ajouter le cercle à l'intérieur de hero-text

  const radius = 120; // Rayon du cercle (ajustez selon la taille souhaitée)
  const totalKeywords = keywordsData.length;

  // Calcul des angles pour espacer les mots-clés en cercle
  const angleStep = (2 * Math.PI) / totalKeywords;

  // Créer chaque mot-clé et le placer sur le cercle
  keywordsData.forEach((keyword, index) => {
    const keywordElement = document.createElement('div');
    keywordElement.classList.add('keyword');
    keywordElement.textContent = translations['fr'][`keyword_${keyword}`] || keyword; // Utilisez la traduction ou le mot par défaut

    // Calcul de la position de chaque mot-clé
    const angle = angleStep * index;
    const x = radius * Math.cos(angle); // Coordonnée X
    const y = radius * Math.sin(angle); // Coordonnée Y

    // Positionner le mot-clé sur le cercle
    keywordElement.style.position = 'absolute';
    keywordElement.style.left = `calc(50% + ${x}px)`;
    keywordElement.style.top = `calc(50% + ${y}px)`;

    // Ajouter le mot-clé au conteneur du cercle
    circleContainer.appendChild(keywordElement);
  });
}

// Appel initial pour charger la langue par défaut (français)
loadTranslations('fr');

// Créer le cercle de mots-clés après le chargement des traductions
window.addEventListener('load', createKeywords);