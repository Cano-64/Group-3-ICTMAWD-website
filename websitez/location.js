const mapIframe = document.querySelector('iframe');
if (mapIframe) {
    mapIframe.addEventListener('load', () => {
        mapIframe.style.opacity = '1';
    });
}