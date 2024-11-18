// JSON translations for FR and EN
const trans = {
    fr: {
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
        if (trans[language] && trans[language][key]) {
            element.textContent = trans[language][key];
        }
    });

    // Reposition keywords in a circle after updating the text
    positionKeywordsInCircle();
}

// Function to set the language
function setLanguage(language) {
    if (trans[language]) {
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

    // Position keywords in a circle on load
    positionKeywordsInCircle();
});

// Function to arrange keywords in a circle
function positionKeywordsInCircle() {
    const keywords = document.querySelectorAll(".keyword");
    if (keywords.length === 0) {
        console.error("Aucun mot-clé trouvé. Vérifiez votre HTML.");
        return;
    }

    const heroSection = document.querySelector(".hero-section");
    const heroText = document.querySelector(".hero-text");

    // Verify container and hero text existence
    if (!heroSection || !heroText) {
        console.error("Section principale ou texte manquant.");
        return;
    }

    // Circle radius and center
    const radius = 180; // Adjust radius as needed
    const heroSectionRect = heroSection.getBoundingClientRect();
    const heroTextRect = heroText.getBoundingClientRect();
    const centerX = heroTextRect.left + heroTextRect.width / 2 - heroSectionRect.left;
    const centerY = heroTextRect.bottom - heroSectionRect.top + 50; // Adjust 50px below the text

    // Angular step between keywords
    const totalKeywords = keywords.length;
    const angleStep = (2 * Math.PI) / totalKeywords;

    // Position keywords
    keywords.forEach((keyword, index) => {
        const angle = angleStep * index;
        const offsetX = centerX + radius * Math.cos(angle) - keyword.offsetWidth / 2;
        const offsetY = centerY + radius * Math.sin(angle) - keyword.offsetHeight / 2;

        // Apply calculated positions
        keyword.style.position = "absolute";
        keyword.style.left = `${offsetX}px`;
        keyword.style.top = `${offsetY}px`;
    });

    // Ensure the hero section has `position: relative`
    heroSection.style.position = "relative";
}