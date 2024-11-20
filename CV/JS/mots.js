// Fonction pour créer et positionner les mots-clés en cercle à la fin de la page
function createKeywords() {
  // Vérifie si un conteneur de mots-clés existe déjà
  if (document.querySelector('.keywords-container')) {
      return; // Si le conteneur existe, sortir de la fonction
  }

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
 
  // Récupère les mots-clés de la langue sélectionnée
  const keywords = [
      translations['fr'].keyword_office_365,
      translations['fr'].keyword_vscode,
      translations['fr'].keyword_eclipse,
      translations['fr'].keyword_jetbrains,
      translations['fr'].keyword_c,
      translations['fr'].keyword_cpp,
      translations['fr'].keyword_java,
      translations['fr'].keyword_html,
      translations['fr'].keyword_css,
      translations['fr'].keyword_javascript,
      translations['fr'].keyword_python,
      translations['fr'].keyword_sql,
      translations['fr'].keyword_git,
  ];

  // Créer un conteneur pour les mots-clés et l'ajouter à la fin de la page
  const container = document.createElement('div');
  container.classList.add('keywords-container');
  document.body.appendChild(container);

  // Rayon du cercle
  const radius = 100; 
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
  });
}