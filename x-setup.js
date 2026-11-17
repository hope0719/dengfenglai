(() => {
  const viewer = document.querySelector('#image-viewer');
  const image = document.querySelector('#viewer-image');
  document.querySelectorAll('.image-open').forEach(button => {
    button.addEventListener('click', () => {
      const source = button.querySelector('img');
      image.src = source.src;
      image.alt = source.alt;
      viewer.showModal();
      viewer.querySelector('.viewer-scroll').scrollTo(0, 0);
    });
  });
  document.querySelector('#close-viewer').addEventListener('click', () => viewer.close());
  viewer.addEventListener('click', event => { if (event.target === viewer) viewer.close(); });
  if ('IntersectionObserver' in window) {
    const links = [...document.querySelectorAll('.guide-nav nav a')];
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (!visible.length) return;
      links.forEach(link => {
        if (link.hash === '#' + visible[0].target.id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-10% 0px -55% 0px' });
    document.querySelectorAll('.guide-body section[id]').forEach(section => observer.observe(section));
  }
})();
