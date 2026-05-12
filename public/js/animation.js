// animation.js

gsap.registerPlugin(ScrollTrigger);

/* PERFORMANCE SETTINGS */

gsap.config({
  force3D: true,
});

/* NAVBAR ANIMATION */

let navTl = gsap.timeline({
  delay: 0.1,
});

navTl.from(".navbar", {
  y: -30,
  opacity: 0,
  duration: 0.5,
  ease: "power2.out",
});

navTl.from(
  ".brand-icon",
  {
    scale: 0.8,
    opacity: 0,
    duration: 0.3,
  },
  "-=0.3",
);

navTl.from(
  ".brand span",
  {
    x: -8,
    opacity: 0,
    duration: 0.3,
  },
  "-=0.2",
);

navTl.from(
  "nav a",
  {
    y: -8,
    opacity: 0,
    stagger: 0.05,
    duration: 0.3,
  },
  "-=0.2",
);

/* NAVBAR SCROLL EFFECT */

gsap.to(".navbar", {
  scrollTrigger: {
    start: 0,
    end: 120,
    scrub: 0.8,
  },

  padding: "12px 40px",
  backdropFilter: "blur(18px)",
  ease: "none",
});

/* HOME PAGE */

if (document.querySelector(".hero-container")) {
  /* initial states */

  gsap.set(
    [".eyebrow", ".line-1", ".line-2", ".subtext", ".cta-group", ".stats-row"],
    {
      opacity: 0,
      y: 25,
    },
  );

  gsap.set(".float-card", {
    opacity: 0,
    y: 20,
  });

  /* model reveal */

  gsap.from(".model-wrapper", {
    opacity: 0,
    y: 30,
    scale: 0.96,

    duration: 1,
    delay: 0.3,

    ease: "power3.out",
  });

  /* hero timeline */

  let heroTl = gsap.timeline({
    delay: 0.2,
  });

  heroTl.to(".eyebrow", {
    opacity: 1,
    y: 0,
    duration: 0.4,
  });

  heroTl.to(
    ".line-1",
    {
      opacity: 1,
      y: 0,
      duration: 0.4,
    },
    "-=0.2",
  );

  heroTl.to(
    ".line-2",
    {
      opacity: 1,
      y: 0,
      duration: 0.4,
    },
    "-=0.25",
  );

  heroTl.to(
    ".subtext",
    {
      opacity: 1,
      y: 0,
      duration: 0.4,
    },
    "-=0.2",
  );

  heroTl.to(
    ".cta-group",
    {
      opacity: 1,
      y: 0,
      duration: 0.4,
    },
    "-=0.2",
  );

  heroTl.to(
    ".stats-row",
    {
      opacity: 1,
      y: 0,
      duration: 0.4,
    },
    "-=0.2",
  );

  heroTl.to(
    ".float-card",
    {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.4,
    },
    "-=0.2",
  );

  /* floating cards */

  gsap.to(".card-h", {
    y: -8,
    repeat: -1,
    yoyo: true,
    duration: 3,
    ease: "sine.inOut",
  });

  gsap.to(".card-au", {
    y: -6,
    repeat: -1,
    yoyo: true,
    duration: 3.5,
    ease: "sine.inOut",
  });

  gsap.to(".card-u", {
    y: -10,
    repeat: -1,
    yoyo: true,
    duration: 2.8,
    ease: "sine.inOut",
  });

  /* hero scroll effect */

  gsap.to(".hero-container .content", {
    scrollTrigger: {
      trigger: ".hero-container",
      start: "top top",
      end: "bottom top",
      scrub: 0.8,
    },

    y: -40,
    opacity: 0.3,
    ease: "none",
  });

  /* model scroll effect */

  gsap.to(".model-wrapper", {
    scrollTrigger: {
      trigger: ".hero-container",
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },

    y: -10,
    ease: "none",
  });
}

/* TABLE PAGE */

if (document.querySelector(".table-wrapper")) {
  /* heading */

  gsap.from(".section-header h2", {
    scrollTrigger: {
      trigger: ".section-header",
      start: "top 85%",
      toggleActions: "play reverse play reverse",
    },

    opacity: 0,
    y: 40,
    duration: 0.7,
  });

  gsap.from(".section-header p", {
    scrollTrigger: {
      trigger: ".section-header",
      start: "top 82%",
      toggleActions: "play reverse play reverse",
    },

    opacity: 0,
    y: 25,
    duration: 0.7,
  });

  gsap.from(".section-desc", {
    scrollTrigger: {
      trigger: ".section-header",
      start: "top 82%",
      toggleActions: "play reverse play reverse",
    },

    opacity: 0,
    y: 25,
    duration: 0.9,
  });

  /* table */

  gsap.from(".table-wrapper", {
    scrollTrigger: {
      trigger: ".table-wrapper",
      start: "top 85%",
      toggleActions: "play reverse play reverse",
    },

    opacity: 0,
    y: 60,
    scale: 0.97,
    duration: 0.9,
    ease: "power3.out",
  });

  /* brightness */

  gsap.fromTo(
    "#table",
    {
      filter: "brightness(0.6)",
    },

    {
      scrollTrigger: {
        trigger: ".table-wrapper",
        start: "top 85%",
        end: "top 20%",
        scrub: 1,
      },

      filter: "brightness(1)",
      ease: "none",
    },
  );
}

/* QUIZ PAGE */

if (document.querySelector(".quiz-container")) {
  gsap.from(".section-header h2", {
    scrollTrigger: {
      trigger: ".section-header",
      start: "top 85%",
      toggleActions: "play reverse play reverse",
    },

    opacity: 0,
    y: 35,
    duration: 0.7,
  });

  gsap.from(".section-header p", {
    scrollTrigger: {
      trigger: ".section-header",
      start: "top 82%",
      toggleActions: "play reverse play reverse",
    },

    opacity: 0,
    y: 20,
    duration: 0.7,
  });

  gsap.from(".quiz-container", {
    scrollTrigger: {
      trigger: ".quiz-container",
      start: "top 85%",
      toggleActions: "play reverse play reverse",
    },

    opacity: 0,
    y: 50,
    scale: 0.96,
    duration: 0.9,
  });

  gsap.from("#question", {
    scrollTrigger: {
      trigger: "#question",
      start: "top 90%",
      toggleActions: "play reverse play reverse",
    },

    opacity: 0,
    y: 15,
    duration: 0.4,
  });

  gsap.from("#options button", {
    scrollTrigger: {
      trigger: "#options",
      start: "top 90%",
      toggleActions: "play reverse play reverse",
    },

    opacity: 0,
    y: 15,
    stagger: 0.08,
    duration: 0.35,
  });

  gsap.from("#next-btn", {
    scrollTrigger: {
      trigger: "#next-btn",
      start: "top 95%",
      toggleActions: "play reverse play reverse",
    },

    opacity: 0,
    scale: 0.9,
    duration: 0.3,
  });
}

/* COMPARE PAGE */

if (document.querySelector(".compare-page")) {
  /* heading */

  gsap.from(".page-header", {
    scrollTrigger: {
      trigger: ".page-header",
      start: "top 85%",
      toggleActions: "play reverse play reverse",
    },

    opacity: 0,
    y: 45,
    duration: 0.8,
  });

  /* chart card */

  gsap.from(".chart-card", {
    scrollTrigger: {
      trigger: ".chart-card",
      start: "top 85%",
      toggleActions: "play reverse play reverse",
    },

    opacity: 0,
    y: 70,
    scale: 0.97,
    duration: 0.9,
  });

  /* background orbs */

  gsap.to(".compare-orb-1", {
    scrollTrigger: {
      trigger: "body",
      scrub: 1,
    },

    y: -90,
    x: 30,
    ease: "none",
  });

  gsap.to(".compare-orb-2", {
    scrollTrigger: {
      trigger: "body",
      scrub: 1.2,
    },

    y: -60,
    x: -20,
    ease: "none",
  });

  gsap.to(".compare-orb-3", {
    scrollTrigger: {
      trigger: "body",
      scrub: 1.5,
    },

    y: -40,
    x: 15,
    ease: "none",
  });
}

/* REFRESH */

window.addEventListener("load", function () {
  ScrollTrigger.refresh();
});
