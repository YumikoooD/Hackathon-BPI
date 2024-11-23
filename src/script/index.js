window.addEventListener('load', () => {
    // Récupérer tous les éléments que vous souhaitez animer
    const navbar = document.querySelector('.navbar');
    const title = document.querySelector('#title');
    const pres = document.querySelector('#pres');
    const img = document.querySelector('#img');
    const cards = document.querySelectorAll('.carte');
    
    // Ajouter une animation de fade-in à la navbar
    navbar.style.opacity = 0;
    navbar.style.transition = 'opacity 1s ease-in-out';
    setTimeout(() => {
        navbar.style.opacity = 1;
    }, 300);

    // Animation pour le titre : fade-in uniquement
    title.style.opacity = 0;
    title.style.transition = 'opacity 1s ease-out';
    setTimeout(() => {
        title.style.opacity = 1;
    }, 500);

    // Animation pour la section de présentation
    pres.style.opacity = 0;
    pres.style.transition = 'opacity 1s ease-in-out';
    setTimeout(() => {
        pres.style.opacity = 1;
    }, 800);

    // Animation pour l'image
    img.style.opacity = 0;
    img.style.transition = 'opacity 1s ease-in-out';
    setTimeout(() => {
        img.style.opacity = 1;
    }, 1200);

    // Animation pour les cartes
    cards.forEach((card, index) => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.7s ease-in-out, transform 0.7s ease-in-out';
        setTimeout(() => {
            card.style.opacity = 1;
            card.style.transform = 'translateY(0)';
        }, 1500 + (index * 300));  // Délai progressif pour chaque carte
    });
});


const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }   else {
            entry.target.classList.remove('show');
        }
    });
})

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));