const boutonTheme = document.querySelector("#theme-toggle");

const themeSauvegarde = localStorage.getItem("theme");

if (themeSauvegarde === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
}

if (boutonTheme) {
    boutonTheme.addEventListener("click", function () {
        const themeActuel =
            document.documentElement.getAttribute("data-theme");

        if (themeActuel === "dark") {
            document.documentElement.removeAttribute("data-theme");
            localStorage.setItem("theme", "light");
        } else {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
        }
    });
}

const barreNavigation =
    document.querySelector(".barre-navigation");

window.addEventListener("scroll", function () {

    if (!barreNavigation) {
        return;
    }

    if (window.scrollY > 80) {
        barreNavigation.classList.add("defilement");
    } else {
        barreNavigation.classList.remove("defilement");
    }

});

const boutonMenu =
    document.querySelector("#menu-btn");

const menuNavigation =
    document.querySelector(".menu-navigation");

if (boutonMenu && menuNavigation) {

    boutonMenu.addEventListener("click", function () {

        menuNavigation.classList.toggle("ouvert");

    });

    const liensMenu =
        menuNavigation.querySelectorAll("a");

    liensMenu.forEach(function (lien) {

        lien.addEventListener("click", function () {

            menuNavigation.classList.remove("ouvert");

        });

    });

}

const elementsAnimation =
    document.querySelectorAll(".apparition");

if (
    elementsAnimation.length > 0 &&
    "IntersectionObserver" in window
) {

    const observateur =
        new IntersectionObserver(

            function (elements) {

                elements.forEach(function (element) {

                    if (element.isIntersecting) {

                        element.target.classList.add("visible");

                        observateur.unobserve(
                            element.target
                        );

                    }

                });

            },

            {
                threshold: 0.15
            }

        );

    elementsAnimation.forEach(function (element) {

        observateur.observe(element);

    });

}

const compteurs =
    document.querySelectorAll(".compteur");

if (compteurs.length > 0) {

    const observateurCompteurs =
        new IntersectionObserver(

            function (elements) {

                elements.forEach(function (element) {

                    if (element.isIntersecting) {

                        const compteur =
                            element.target;

                        const objectif =
                            Number(
                                compteur.dataset.target
                            );

                        let valeur = 0;

                        const increment =
                            Math.ceil(objectif / 100);

                        const animation =
                            setInterval(function () {

                                valeur += increment;

                                if (valeur >= objectif) {

                                    valeur = objectif;

                                    clearInterval(
                                        animation
                                    );

                                }

                                compteur.textContent =
                                    valeur.toLocaleString(
                                        "fr-FR"
                                    );

                            }, 20);

                        observateurCompteurs.unobserve(
                            compteur
                        );

                    }

                });

            },

            {
                threshold: 0.5
            }

        );

    compteurs.forEach(function (compteur) {

        observateurCompteurs.observe(compteur);

    });

}