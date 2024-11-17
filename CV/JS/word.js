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