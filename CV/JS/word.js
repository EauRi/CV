document.addEventListener("DOMContentLoaded", function () {
    const translations = {
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
            keyword_autonome: "Autonomous",
            keyword_perseverante: "Persevering",
            keyword_polyvalente: "Versatile"
        }
    };

    function loadTranslations(lang) {
        const keywords = document.querySelectorAll(".keyword");

        keywords.forEach(keyword => {
            const key = keyword.getAttribute("data-key");
            if (translations[lang][key]) {
                keyword.textContent = translations[lang][key];
            }
        });
    }

    // Détection du changement de langue
    const languageSwitcher = document.querySelectorAll(".language-switcher button");
    languageSwitcher.forEach(button => {
        button.addEventListener("click", function () {
            const selectedLang = this.getAttribute("data-lang");
            loadTranslations(selectedLang);
        });
    });

    // Charger la langue par défaut (exemple : Français)
    loadTranslations("fr");
});