
/* =========================================================
   SHAHd ALAA PORTFOLIO
   JavaScript
========================================================= */


/* =========================================================
   CURRENT YEAR
========================================================= */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuButton = document.getElementById("menuButton");
const navigation = document.getElementById("navigation");

if (menuButton && navigation) {

    menuButton.addEventListener("click", () => {

        const isOpen =
            navigation.classList.toggle("is-open");

        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });


    /*
       Close mobile menu
       when clicking a navigation link
    */

    navigation
        .querySelectorAll("a")
        .forEach((link) => {

            link.addEventListener("click", () => {

                navigation.classList.remove("is-open");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

}


/* =========================================================
   TYPING EFFECT
========================================================= */

const typingText =
    document.getElementById("typingText");

const roles = [

    "Backend Developer",

    "API & Integration Engineer",

    "ASP.NET Core Developer"

];

let roleIndex = 0;

let characterIndex = 0;

let deleting = false;


function typeRole() {

    if (!typingText) {
        return;
    }

    const currentRole =
        roles[roleIndex];


    /*
       Typing
    */

    if (!deleting) {

        characterIndex++;

        typingText.textContent =
            currentRole.substring(
                0,
                characterIndex
            );


        /*
           Start deleting
           after finishing the word
        */

        if (
            characterIndex ===
            currentRole.length
        ) {

            deleting = true;

            setTimeout(
                typeRole,
                1800
            );

            return;
        }

    }


    /*
       Deleting
    */

    else {

        characterIndex--;

        typingText.textContent =
            currentRole.substring(
                0,
                characterIndex
            );


        /*
           Move to next role
        */

        if (characterIndex === 0) {

            deleting = false;

            roleIndex =
                (roleIndex + 1) %
                roles.length;

        }

    }


    const speed =
        deleting ? 35 : 65;

    setTimeout(
        typeRole,
        speed
    );
}


/*
   Respect user's reduced-motion preference
*/

const reducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


if (typingText) {

    if (reducedMotion) {

        typingText.textContent =
            roles[0];

    } else {

        typeRole();

    }

}


/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /*
               Get form values
            */

            const name =
                document
                    .getElementById("name")
                    .value
                    .trim();

            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();

            const message =
                document
                    .getElementById("message")
                    .value
                    .trim();


            /*
               Basic validation
            */

            if (
                !name ||
                !email ||
                !message
            ) {

                formMessage.textContent =
                    "Please fill in all fields.";

                return;
            }


            /*
               Email format
            */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email)) {

                formMessage.textContent =
                    "Please enter a valid email.";

                return;
            }


            /*
               Create email content
            */

            const subject =
                encodeURIComponent(
                    `Portfolio contact from ${name}`
                );


            const body =
                encodeURIComponent(
                    `${message}\n\n` +
                    `From: ${name}\n` +
                    `Email: ${email}`
                );


            /*
               Show message
            */

            formMessage.textContent =
                "Opening your email app...";


            /*
               Open user's email application
            */

            window.location.href =
                `mailto:shahdalaa3172003@gmail.com` +
                `?subject=${subject}` +
                `&body=${body}`;

        }
    );

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".section-heading, " +
        ".about-grid, " +
        ".focus-card, " +
        ".project-card, " +
        ".contact-box"
    );


if (
    !reducedMotion &&
    "IntersectionObserver" in window
) {

    const observer =
        new IntersectionObserver(
            (entries, observerInstance) => {

                entries.forEach((entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observerInstance.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach((element) => {

        element.classList.add(
            "reveal-element"
        );

        observer.observe(element);

    });

}
/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(".reveal-element");

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});