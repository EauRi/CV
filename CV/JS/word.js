const translations = {
    "fr": {
        "keyword_office_365": "Office 365",
        "keyword_vscode": "VSCode",
        "keyword_eclipse": "Eclipse",
        "keyword_jetbrains": "JetBrains",
        "keyword_c": "C",
        "keyword_cpp": "C++",
        "keyword_java": "Java",
        "keyword_html": "HTML",
        "keyword_css": "CSS",
        "keyword_javascript": "JavaScript",
        "keyword_python": "Python",
        "keyword_sql": "SQL",
        "keyword_git": "GIT",
        "keyword_service": "Service",
        "keyword_curieuse": "Curieuse",
        "keyword_autonome": "Autonome",
        "keyword_perseverante": "Persévérante",
        "keyword_polyvalente": "Polyvalente",
    }
};

document.addEventListener("DOMContentLoaded", function () {
    const lang = "fr"; // Vous pouvez gérer la langue dynamiquement
    const keywords = document.querySelectorAll(".keyword");

    keywords.forEach((keyword) => {
        const key = keyword.getAttribute("data-key");
        if (translations[lang][key]) {
            keyword.textContent = translations[lang][key];
        }
    });
});
window.addEventListener("load", function () {
    const keywords = document.querySelectorAll(".keyword");  // Sélectionner tous les mots-clés
    const container = document.querySelector(".hero-section");  // Conteneur principal
    const heroText = document.querySelector(".hero-text");  // Le texte principal (h1 et h2)

    // Calculer les dimensions du texte principal
    const heroTextRect = heroText.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // Rayon du cercle autour du texte
    const radius = 200;  // Rayon du cercle, à ajuster selon vos préférences
    const centerX = heroTextRect.left + heroTextRect.width / 2;  // Centre horizontal du texte
    const centerY = heroTextRect.top + heroTextRect.height / 2;  // Centre vertical du texte

    // Calculer l'angle de séparation entre chaque mot
    const totalKeywords = keywords.length;
    const angleStep = (2 * Math.PI) / totalKeywords;  // Calcul de l'écart angulaire entre chaque mot

    keywords.forEach((keyword, index) => {
        const angle = angleStep * index;  // Calculer l'angle pour chaque mot
        const offsetX = containerRect.left + centerX + radius * Math.cos(angle) - keyword.offsetWidth / 2;
        const offsetY = containerRect.top + centerY + radius * Math.sin(angle) - keyword.offsetHeight / 2;

        // Appliquer les positions calculées aux mots
        keyword.style.position = "absolute";
        keyword.style.left = `${offsetX}px`;
        keyword.style.top = `${offsetY}px`;
    });
});