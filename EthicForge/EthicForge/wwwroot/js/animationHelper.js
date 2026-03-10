window.EthicForge = window.EthicForge || {};

let _scrollObserver = null;

window.EthicForge.initScrollAnimations = function () {
    if (_scrollObserver) {
        _scrollObserver.disconnect();
        _scrollObserver = null;
    }

    requestAnimationFrame(function () {
        _scrollObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        _scrollObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );

        document.querySelectorAll('.animate-on-scroll:not(.is-visible)').forEach((el) => {
            _scrollObserver.observe(el);
        });
    });
};

window.EthicForge.scrollToTop = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
