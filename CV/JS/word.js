document.addEventListener("DOMContentLoaded", function () {
    const keywords = document.querySelectorAll(".keyword");  // Sélectionner tous les mots-clés
    const container = document.querySelector(".hero-section");  // Conteneur principal
    const heroText = document.querySelector(".hero-text");  // Le texte principal (h1 et h2)

    // Calculer les dimensions du texte principal
    const heroTextRect = heroText.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // Rayon du cercle autour du texte
    const radius = 200;  // Rayon du cercle, à ajuster selon vos préférences
    const centerX = heroTextRect.left + heroTextRect.width / 2;  // Centre du texte horizontalement
    const centerY = heroTextRect.top + heroTextRect.height / 2;  // Centre du texte verticalement

    // Calculer l'angle de séparation entre chaque mot
    const totalKeywords = keywords.length;
    const angleStep = (2 * Math.PI) / totalKeywords;  // Calcul de l'écart angulaire entre chaque mot

    keywords.forEach((keyword, index) => {
        const angle = angleStep * index;  // Calculer l'angle de chaque mot par rapport au centre
        const offsetX = centerX + radius * Math.cos(angle) - keyword.offsetWidth / 2;  // Position horizontale du mot
        const offsetY = centerY + radius * Math.sin(angle) - keyword.offsetHeight / 2;  // Position verticale du mot

        // Appliquer les positions calculées aux mots
        keyword.style.position = "absolute";
        keyword.style.left = `${offsetX}px`;
        keyword.style.top = `${offsetY}px`;
    });
});