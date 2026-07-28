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

const elementJours =
    document.querySelector("#jours");

const elementHeures =
    document.querySelector("#heures");

const elementMinutes =
    document.querySelector("#minutes");

const elementSecondes =
    document.querySelector("#secondes");


if (
    elementJours &&
    elementHeures &&
    elementMinutes &&
    elementSecondes
) {

    const dateConference =
        new Date(
            "December 15, 2026 09:00:00"
        ).getTime();


    function mettreAJourCompteRebours() {

        const maintenant =
            new Date().getTime();

        const difference =
            dateConference - maintenant;


        if (difference <= 0) {

            elementJours.textContent = "00";
            elementHeures.textContent = "00";
            elementMinutes.textContent = "00";
            elementSecondes.textContent = "00";

            return;

        }


        const jours =
            Math.floor(
                difference /
                (1000 * 60 * 60 * 24)
            );


        const heures =
            Math.floor(
                (
                    difference %
                    (1000 * 60 * 60 * 24)
                ) /
                (1000 * 60 * 60)
            );


        const minutes =
            Math.floor(
                (
                    difference %
                    (1000 * 60 * 60)
                ) /
                (1000 * 60)
            );


        const secondes =
            Math.floor(
                (
                    difference %
                    (1000 * 60)
                ) /
                1000
            );


        elementJours.textContent =
            String(jours).padStart(2, "0");

        elementHeures.textContent =
            String(heures).padStart(2, "0");

        elementMinutes.textContent =
            String(minutes).padStart(2, "0");

        elementSecondes.textContent =
            String(secondes).padStart(2, "0");

    }


    mettreAJourCompteRebours();

    setInterval(
        mettreAJourCompteRebours,
        1000
    );

}

const boutonsJours =
    document.querySelectorAll(".onglet");

const contenusJours =
    document.querySelectorAll(".planning");


if (boutonsJours.length > 0) {

    boutonsJours.forEach(function (bouton) {

        bouton.addEventListener(
            "click",
            function () {

                const jourChoisi =
                    bouton.dataset.jour;


                boutonsJours.forEach(
                    function (autreBouton) {

                        autreBouton.classList.remove(
                            "actif"
                        );

                    }
                );


                contenusJours.forEach(
                    function (contenu) {

                        contenu.classList.remove(
                            "actif"
                        );

                    }
                );


                bouton.classList.add("actif");


                const contenuJour =
                    document.querySelector(
                        "#" + jourChoisi
                    );


                if (contenuJour) {

                    contenuJour.classList.add(
                        "actif"
                    );

                }

            }
        );

    });

}

const boutonsFiltres =
    document.querySelectorAll(".bouton-filtre");

const cartesIntervenants =
    document.querySelectorAll(".carte-intervenant");


if (
    boutonsFiltres.length > 0 &&
    cartesIntervenants.length > 0
) {

    boutonsFiltres.forEach(function (bouton) {

        bouton.addEventListener(
            "click",
            function () {

                const filtre =
                    bouton.dataset.filtre;


                boutonsFiltres.forEach(
                    function (autreBouton) {

                        autreBouton.classList.remove(
                            "actif"
                        );

                    }
                );


                bouton.classList.add("actif");


                cartesIntervenants.forEach(
                    function (carte) {

                        const categorie =
                            carte.dataset.categorie;


                        if (
                            filtre === "tous" ||
                            categorie === filtre
                        ) {

                            carte.style.display =
                                "block";

                        } else {

                            carte.style.display =
                                "none";

                        }

                    }
                );

            }
        );

    });

}

const formulaire =
    document.querySelector(
        "#formulaire-inscription"
    );


if (formulaire) {

    const nom =
        document.querySelector("#nom");

    const email =
        document.querySelector("#email");

    const telephone =
        document.querySelector("#telephone");

    const participation =
        document.querySelector("#participation");

    const pays =
        document.querySelector("#pays");

    const message =
        document.querySelector("#message");

    const messageSucces =
        document.querySelector("#message-succes");


    function afficherErreur(champ, texte) {

        if (!champ) {
            return;
        }


        champ.classList.remove(
            "champ-valide"
        );

        champ.classList.add(
            "champ-invalide"
        );


        const erreur =
            champ.parentElement.querySelector(
                ".message-erreur"
            );


        if (erreur) {

            erreur.textContent =
                texte;

        }

    }


    function afficherSucces(champ) {

        if (!champ) {
            return;
        }


        champ.classList.remove(
            "champ-invalide"
        );

        champ.classList.add(
            "champ-valide"
        );


        const erreur =
            champ.parentElement.querySelector(
                ".message-erreur"
            );


        if (erreur) {

            erreur.textContent = "";

        }

    }


    formulaire.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            let formulaireValide = true;


            if (
                !nom ||
                nom.value.trim() === ""
            ) {

                afficherErreur(
                    nom,
                    "Le nom complet est obligatoire."
                );

                formulaireValide = false;

            } else {

                afficherSucces(nom);

            }


            const regexEmail =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !email ||
                !regexEmail.test(
                    email.value.trim()
                )
            ) {

                afficherErreur(
                    email,
                    "Veuillez entrer un email valide."
                );

                formulaireValide = false;

            } else {

                afficherSucces(email);

            }


            if (!telephone) {

                formulaireValide = false;

            } else {

                const chiffresTelephone =
                    telephone.value.replace(
                        /\D/g,
                        ""
                    );


                if (
                    chiffresTelephone.length < 8
                ) {

                    afficherErreur(
                        telephone,
                        "Le téléphone doit contenir au moins 8 chiffres."
                    );

                    formulaireValide = false;

                } else {

                    afficherSucces(
                        telephone
                    );

                }

            }


            if (
                !participation ||
                participation.value === ""
            ) {

                afficherErreur(
                    participation,
                    "Veuillez choisir un type de participation."
                );

                formulaireValide = false;

            } else {

                afficherSucces(
                    participation
                );

            }


            if (
                !pays ||
                pays.value === ""
            ) {

                afficherErreur(
                    pays,
                    "Veuillez choisir votre pays."
                );

                formulaireValide = false;

            } else {

                afficherSucces(pays);

            }


            if (
                !message ||
                message.value.trim().length < 20
            ) {

                afficherErreur(
                    message,
                    "Le message doit contenir au moins 20 caractères."
                );

                formulaireValide = false;

            } else {

                afficherSucces(message);

            }


            if (formulaireValide) {

                if (messageSucces) {

                    messageSucces.textContent =
                        "Votre inscription a été envoyée avec succès !";

                }


                formulaire.reset();


                const champs =
                    formulaire.querySelectorAll(
                        "input, select, textarea"
                    );


                champs.forEach(function (champ) {

                    champ.classList.remove(
                        "champ-valide"
                    );

                });

            }

        }
    );

}


const boutonRetour =
    document.querySelector(
        "#retour-haut"
    );


if (boutonRetour) {

    window.addEventListener(
        "scroll",
        function () {

            if (window.scrollY > 300) {

                boutonRetour.classList.add(
                    "visible"
                );

            } else {

                boutonRetour.classList.remove(
                    "visible"
                );

            }

        }
    );


    boutonRetour.addEventListener(
        "click",
        function () {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}

const annee =
    new Date().getFullYear();

const elementsAnnee =
    document.querySelectorAll(
        "#annee"
    );


elementsAnnee.forEach(
    function (element) {

        element.textContent =
            annee;

    }
);