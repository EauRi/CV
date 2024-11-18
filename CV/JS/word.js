// JSON translations for FR and EN
const translations = {
    fr: {
        title: "Bienvenue sur mon CV",
        subtitle: "Découvrez mes compétences et expériences",
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
        title: "Welcome to my CV",
        subtitle: "Explore my skills and experiences",
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

// Function to update the content dynamically
function updateTextContent(language) {
    const elements = document.querySelectorAll("[data-key]");
    elements.forEach(element => {
        const key = element.getAttribute("data-key");
        if (translations[language] && translations[language][key]) {
            element.textContent = translations[language][key];
        }
    });
}

// Function to set the language
function setLanguage(language) {
    if (translations[language]) {
        updateTextContent(language);
    } else {
        console.error(`Language '${language}' is not supported.`);
    }
}

// Event listeners for language switching buttons
document.addEventListener("DOMContentLoaded", function () {
    // Default language
    setLanguage("fr");

    // Language switcher buttons
    const languageButtons = document.querySelectorAll(".language-switcher button");
    languageButtons.forEach(button => {
        button.addEventListener("click", function () {
            const selectedLanguage = this.getAttribute("data-lang");
            setLanguage(selectedLanguage);
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const keywords = document.querySelectorAll(".keyword"); // Sélectionne les mots-clés
    if (keywords.length === 0) {
        console.error("Aucun mot-clé trouvé. Vérifiez votre HTML.");
        return;
    }

    const container = document.querySelector(".hero-section");
    const heroText = document.querySelector(".hero-text");

    // Vérifiez si le conteneur et le texte principal existent
    if (!container || !heroText) {
        console.error("Conteneur ou texte principal manquant.");
        return;
    }

    // Rayon et centre du cercle
    const radius = 200;
    const heroTextRect = heroText.getBoundingClientRect();
    const centerX = heroTextRect.left + heroTextRect.width / 2;
    const centerY = heroTextRect.top + heroTextRect.height / 2;

    // Placement des mots-clés
    const totalKeywords = keywords.length;
    const angleStep = (2 * Math.PI) / totalKeywords;

    keywords.forEach((keyword, index) => {
        const angle = angleStep * index;
        const offsetX = centerX + radius * Math.cos(angle) - keyword.offsetWidth / 2;
        const offsetY = centerY + radius * Math.sin(angle) - keyword.offsetHeight / 2;

        // Appliquer les positions
        keyword.style.position = "absolute";
        keyword.style.left = `${offsetX}px`;
        keyword.style.top = `${offsetY}px`;
    });
});