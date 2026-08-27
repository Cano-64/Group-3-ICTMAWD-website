const cards = document.querySelectorAll('.step-card');
const panels = document.querySelectorAll('.display-panel');

const observerOptions = {
    root: null,
    rootMargin: '-35% 0px -35% 0px',
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const step = entry.target.getAttribute('data-step');
            
            cards.forEach(card => card.classList.remove('active'));
            panels.forEach(panel => panel.classList.remove('active'));

            entry.target.classList.add('active');
            const targetPanel = document.getElementById(`panel-${step}`);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        }
    });
}, observerOptions);

cards.forEach(card => observer.observe(card));