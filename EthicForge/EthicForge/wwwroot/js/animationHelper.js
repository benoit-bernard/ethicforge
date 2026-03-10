window.EthicForge = window.EthicForge || {};

(function () {
    var scrollObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    scrollObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    var pending = false;

    function observeNew() {
        if (pending) return;
        pending = true;
        requestAnimationFrame(function () {
            pending = false;
            document.querySelectorAll('.animate-on-scroll:not(.is-visible)').forEach(function (el) {
                scrollObserver.observe(el);
            });
        });
    }

    var mutationObserver = new MutationObserver(function (mutations) {
        for (var i = 0; i < mutations.length; i++) {
            var added = mutations[i].addedNodes;
            for (var j = 0; j < added.length; j++) {
                var node = added[j];
                if (node.nodeType !== 1) continue;
                if (node.classList.contains('animate-on-scroll') ||
                    node.querySelector('.animate-on-scroll')) {
                    observeNew();
                    return;
                }
            }
        }
    });

    function start() {
        mutationObserver.observe(document.body, { childList: true, subtree: true });
        observeNew();
    }

    if (document.body) {
        start();
    } else {
        document.addEventListener('DOMContentLoaded', start);
    }

    window.EthicForge.initScrollAnimations = observeNew;

    window.EthicForge.scrollToTop = function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
})();
