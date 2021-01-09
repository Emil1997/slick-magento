var config = {
    paths: {
        "lib/slick":    "Elite_SlickCarousel/js/lib/slick/slick",
        "slick":        "Elite_SlickCarousel/js/slick",
    },
    shim: {
        "lib/slick": {
            deps: ['jquery']
        },
        "slick": {
            deps: ['lib/slick']
        }
    }
};
