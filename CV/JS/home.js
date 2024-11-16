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