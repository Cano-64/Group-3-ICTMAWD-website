const listItems = document.querySelectorAll('.features-list li');
listItems.forEach((item) => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateX(5px)';
        item.style.transition = 'transform 0.2s ease';
    });
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateX(0)';
    });
});