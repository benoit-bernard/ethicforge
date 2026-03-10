window.EthicForge = window.EthicForge || {};

window.EthicForge.initScrollAnimations = function () {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.observe(el);
    });
};

window.EthicForge.scrollToTop = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
