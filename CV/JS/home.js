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


document.addEventListener("DOMContentLoaded", function () {
    const keywords = document.querySelectorAll(".keyword");
    const container = document.querySelector(".hero-section");
    const heroText = document.querySelector(".hero-text"); // Texte principal

    // Calculer les dimensions du texte principal
    const heroTextRect = heroText.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // Rayon pour le cercle autour du texte
    const radius = 200; // Rayon du cercle
    const centerX = heroTextRect.left + heroTextRect.width / 2; // Centre du texte
    const centerY = heroTextRect.top + heroTextRect.height / 2;

    // Placer les mots en cercle autour du texte
    const totalKeywords = keywords.length;
    const angleStep = (2 * Math.PI) / totalKeywords; // Espacement angulaire entre chaque mot

    keywords.forEach((keyword, index) => {
        const angle = angleStep * index; // Calculer l'angle pour chaque mot
        const offsetX = centerX + radius * Math.cos(angle) - keyword.offsetWidth / 2; // Position horizontale
        const offsetY = centerY + radius * Math.sin(angle) - keyword.offsetHeight / 2; // Position verticale

        // Placer chaque mot
        keyword.style.position = "absolute";
        keyword.style.left = `${offsetX}px`;
        keyword.style.top = `${offsetY}px`;
    });
});

