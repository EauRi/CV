// JSON de traductions pour FR et EN
const trans = {
    fr: {
        title: "Bienvenue dans le monde de la programmation",
        subtitle: "Outils et compétences essentiels",
        keyword_office_365: "Office 365",
        keyword_vscode: "VSCode",
        keyword_eclipse: "Eclipse",
        keyword_jetbrains: "JetBrains",
        keyword_c: "C",
        keyword_cpp: "C++",
        keyword_java: "Java",
        keyword_html: "HTML",
        keyword_css: "CSS",
        keyword_javascript: "JavaScript",
        keyword_python: "Python",
        keyword_sql: "SQL",
        keyword_git: "GIT",
        keyword_curieuse: "Curieuse",
        keyword_autonome: "Autonome",
        keyword_perseverante: "Persévérante",
        keyword_polyvalente: "Polyvalente"
    },
    en: {
        title: "Welcome to the world of programming",
        subtitle: "Essential tools and skills",
        keyword_office_365: "Office 365",
        keyword_vscode: "VSCode",
        keyword_eclipse: "Eclipse",
        keyword_jetbrains: "JetBrains",
        keyword_c: "C",
        keyword_cpp: "C++",
        keyword_java: "Java",
        keyword_html: "HTML",
        keyword_css: "CSS",
        keyword_javascript: "JavaScript",
        keyword_python: "Python",
        keyword_sql: "SQL",
        keyword_git: "GIT",
        keyword_curieuse: "Curious",
        keyword_autonome: "Independent",
        keyword_perseverante: "Persistent",
        keyword_polyvalente: "Versatile"
    }
};

// Fonction pour mettre à jour le contenu dynamique en fonction de la langue
function updateTextContent(language) {
    const elements = document.querySelectorAll("[data-key]");
    elements.forEach(element => {
        const key = element.getAttribute("data-key");
        if (trans[language] && trans[language][key]) {
            element.textContent = trans[language][key];
        }
    });

    // Repositionner les mots-clés en cercle après la mise à jour du texte
    positionKeywordsInCircle();
}

// Fonction pour changer la langue
function setLanguage(language) {
    if (trans[language]) {
        updateTextContent(language);
    } else {
        console.error(`La langue '${language}' n'est pas prise en charge.`);
    }
}

// Écouteur d'événements pour les boutons de changement de langue
document.addEventListener("DOMContentLoaded", function () {
    // Langue par défaut
    setLanguage("fr");

    // Boutons pour changer la langue
    const languageButtons = document.querySelectorAll(".language-switcher button");
    languageButtons.forEach(button => {
        button.addEventListener("click", function () {
            const selectedLanguage = this.getAttribute("data-lang");
            setLanguage(selectedLanguage);
        });
    });

    // Positionner les mots-clés en cercle au chargement de la page
    positionKeywordsInCircle();
});

// Fonction pour positionner les mots-clés en cercle autour du texte
function positionKeywordsInCircle() {
    const keywords = document.querySelectorAll(".keyword");
    if (keywords.length === 0) {
        console.error("Aucun mot-clé trouvé. Vérifiez votre HTML.");
        return;
    }

    const heroSection = document.querySelector(".hero-section");
    const heroText = document.querySelector(".hero-text");

    // Vérification de l'existence de la section principale et du texte
    if (!heroSection || !heroText) {
        console.error("Section principale ou texte manquant.");
        return;
    }

    // Paramètres pour ajuster la disposition
    const radius = 180;  // Rayon du cercle
    const heroTextRect = heroText.getBoundingClientRect();
    
    // Calcul de la position du centre du texte (titre + sous-titre)
    const centerX = heroTextRect.left + heroTextRect.width / 2;
    const centerY = heroTextRect.top + heroTextRect.height / 2 + 50;  // Décalage de 50px en dessous du texte

    // Calcul de l'angle entre les mots-clés en fonction du nombre total de mots
    const totalKeywords = keywords.length;
    const angleStep = (2 * Math.PI) / totalKeywords;

    // Positionnement des mots-clés autour du texte
    keywords.forEach((keyword, index) => {
        const angle = angleStep * index;
        const offsetX = centerX + radius * Math.cos(angle) - keyword.offsetWidth / 2;
        const offsetY = centerY + radius * Math.sin(angle) - keyword.offsetHeight / 2;

        // Application des positions calculées
        keyword.style.position = "absolute";
        keyword.style.left = `${offsetX}px`;
        keyword.style.top = `${offsetY}px`;
    });

    // Assurer que la section principale a un positionnement relatif
    heroSection.style.position = "relative";
}