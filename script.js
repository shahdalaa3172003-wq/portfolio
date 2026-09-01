
/* =========================================================
   SHAHD ALAA PORTFOLIO
   JavaScript — script.js
========================================================= */


/* =========================================================
   CURRENT YEAR
========================================================= */

const yearElement = document.getElementById("year");
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* =========================================================
   HEADER SCROLL CLASS
========================================================= */

const siteHeader = document.getElementById("siteHeader");

if (siteHeader) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 20) {
            siteHeader.classList.add("scrolled");
        } else {
            siteHeader.classList.remove("scrolled");
        }
    }, { passive: true });
}


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuButton = document.getElementById("menuButton");
const navigation = document.getElementById("navigation");

if (menuButton && navigation) {

    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("is-open");
        menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    /* Close mobile menu when clicking a navigation link */
    navigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navigation.classList.remove("is-open");
            menuButton.setAttribute("aria-expanded", "false");
        });
    });

    /* Close menu when clicking outside */
    document.addEventListener("click", (e) => {
        if (
            navigation.classList.contains("is-open") &&
            !navigation.contains(e.target) &&
            !menuButton.contains(e.target)
        ) {
            navigation.classList.remove("is-open");
            menuButton.setAttribute("aria-expanded", "false");
        }
    });

}


/* =========================================================
   SCROLL REVEAL ANIMATIONS
   Using IntersectionObserver for performance
========================================================= */

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (!reducedMotion && "IntersectionObserver" in window) {

    const revealSelectors = [
        ".section-heading",
        ".about-text-content",
        ".about-image-wrapper",
        ".about-point",
        ".project-card",
        ".contact-box"
    ];

    const revealElements = document.querySelectorAll(
        revealSelectors.join(", ")
    );

    const observer = new IntersectionObserver(
        (entries, observerInstance) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observerInstance.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    revealElements.forEach((element, index) => {
        element.classList.add("reveal-element");

        /* Stagger cards */
        if (element.classList.contains("project-card") || element.classList.contains("about-point")) {
            const siblings = element.parentElement.querySelectorAll(
                ".project-card, .about-point"
            );
            const cardIndex = Array.from(siblings).indexOf(element);
            element.style.transitionDelay = `${cardIndex * 0.1}s`;
        }

        observer.observe(element);
    });

}


/* =========================================================
   CONTACT FORM
   Opens user's email client with pre-filled content
========================================================= */

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const submitBtn   = document.getElementById("formSubmitBtn");

if (contactForm && formMessage) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name    = document.getElementById("name").value.trim();
        const email   = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        /* Reset message */
        formMessage.textContent = "";
        formMessage.className   = "form-message";

        /* Validate */
        if (!name || !email || !message) {
            formMessage.textContent = "Please fill in all fields.";
            formMessage.classList.add("error");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            formMessage.textContent = "Please enter a valid email address.";
            formMessage.classList.add("error");
            return;
        }

        /* Build mailto URL */
        const subject = encodeURIComponent(`Portfolio contact from ${name}`);
        const body    = encodeURIComponent(
            `${message}\n\n` +
            `— Sent via portfolio contact form\n` +
            `From: ${name}\n` +
            `Email: ${email}`
        );

        /* Show success */
        formMessage.textContent = "✓ Opening your email app...";
        formMessage.classList.add("success");

        /* Open email client */
        window.location.href =
            `mailto:shahdalaa3172003@gmail.com` +
            `?subject=${subject}` +
            `&body=${body}`;

        /* Reset form after short delay */
        setTimeout(() => {
            contactForm.reset();
            formMessage.textContent = "";
            formMessage.className   = "form-message";
        }, 4000);

    });

}


/* =========================================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   (Fallback for browsers that don't support scroll-behavior)
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        const targetId  = this.getAttribute("href");
        const target    = document.querySelector(targetId);

        if (target) {
            /* Let CSS smooth scroll handle it,
               but ensure header offset is respected */
            const headerHeight = siteHeader ? siteHeader.offsetHeight : 0;
            const targetPos    = target.getBoundingClientRect().top
                                 + window.scrollY
                                 - headerHeight - 16;

            window.scrollTo({ top: targetPos, behavior: "smooth" });
        }
    });
});