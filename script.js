/* =========================================
   HEAVEN FURNITURE MART
   INTERACTIONS + ANIMATIONS
========================================= */

gsap.registerPlugin(ScrollTrigger);


/* =========================================
   LENIS SMOOTH SCROLL
========================================= */

const lenis = new Lenis({
  duration: 1.2,
  smoothWheel: true,
  touchMultiplier: 1.5
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);


/* =========================================
   PRELOADER + HERO ENTRANCE
========================================= */

window.addEventListener("load", () => {

  const tl = gsap.timeline();

  tl.to(".loader-line", {
    width: "100%",
    duration: 1.1,
    ease: "power2.inOut"
  })

  .to(".loader-content", {
    opacity: 0,
    duration: .4
  })

  .to(".loader", {
    yPercent: -100,
    duration: 1,
    ease: "power4.inOut"
  })

  .fromTo(
    ".hero-eyebrow",
    {
      y: 30,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      duration: .8
    }
  )

  .fromTo(
    ".hero-title",
    {
      y: 70,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power4.out"
    },
    "-=.5"
  )

  .to(
    ".hero-description",
    {
      y: 0,
      opacity: 1,
      duration: .8
    },
    "-=.5"
  )

  .to(
    ".hero-actions",
    {
      y: 0,
      opacity: 1,
      duration: .7
    },
    "-=.4"
  );

});


/* =========================================
   NAVBAR SCROLL EFFECT
========================================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

  if (window.scrollY > 80) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

});


/* =========================================
   MOBILE MENU
========================================= */

const menuBtn = document.querySelector(".menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");

menuBtn.addEventListener("click", () => {

  mobileMenu.classList.toggle("active");

});


document.querySelectorAll(".mobile-menu a").forEach(link => {

  link.addEventListener("click", () => {

    mobileMenu.classList.remove("active");

  });

});


/* =========================================
   HOME BUTTON
   LOGO REMAINS NON-CLICKABLE
========================================= */

document.querySelectorAll('a[href="#home"]').forEach(link => {

  link.addEventListener("click", event => {

    event.preventDefault();

    mobileMenu.classList.remove("active");

    lenis.scrollTo("#home", {
      duration: 1.5,
      offset: 0
    });

  });

});


/* =========================================
   SMOOTH INTERNAL LINKS
========================================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

  if (link.getAttribute("href") === "#home") return;

  link.addEventListener("click", event => {

    const target = document.querySelector(
      link.getAttribute("href")
    );

    if (!target) return;

    event.preventDefault();

    lenis.scrollTo(target, {
      duration: 1.3
    });

  });

});


/* =========================================
   CUSTOM CURSOR
========================================= */

const cursor = document.querySelector(".cursor");

window.addEventListener("mousemove", event => {

  gsap.to(cursor, {
    x: event.clientX,
    y: event.clientY,
    duration: .15
  });

});


document
  .querySelectorAll(
    "a, button, .collection-card, .gallery-item"
  )
  .forEach(element => {

    element.addEventListener("mouseenter", () => {
      cursor.classList.add("active");
    });

    element.addEventListener("mouseleave", () => {
      cursor.classList.remove("active");
    });

  });



/* =========================================
   INTRO TYPEWRITER
========================================= */

function typeText(element, text, speed = 70, startDelay = 0) {
  return new Promise(resolve => {
    setTimeout(() => {
      let index = 0;

      const timer = setInterval(() => {
        if (index >= text.length) {
          clearInterval(timer);
          resolve();
          return;
        }

        const char = document.createElement("span");
        char.className = "typing-char";
        char.textContent = text[index];

        element.appendChild(char);
        index++;
      }, speed);
    }, startDelay);
  });
}

async function startIntroTypewriter() {
  const firstLine = document.querySelector(".heading-line[data-typing]");
  const secondWord = document.querySelector(".typing-word");
  const cursor = document.querySelector(".typing-cursor");
  const intro = document.querySelector(".intro");

  if (!firstLine || !secondWord || !cursor) return;

  const runTyping = async () => {
    if (runTyping.started) return;
    runTyping.started = true;

    await typeText(firstLine, firstLine.dataset.typing, 65, 150);
    await typeText(secondWord, "furniture.", 85, 180);

    // Typing finished: remove the | cursor and blink the complete heading.
    cursor.classList.remove("active");
    cursor.style.display = "none";

    const introHeading = document.querySelector(".intro-heading");
    if (introHeading) introHeading.classList.add("typewriter-complete");
  };

  if (!intro || !("IntersectionObserver" in window)) {
    runTyping();
    return;
  }

  const observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) {
      runTyping();
      observer.disconnect();
    }
  }, { threshold: 0.25 });

  observer.observe(intro);
}

startIntroTypewriter();

/* =========================================
   INTRO ANIMATIONS
========================================= */

gsap.from(".intro-text", {

  scrollTrigger: {
    trigger: ".intro",
    start: "top 70%"
  },

  y: 50,
  opacity: 0,

  duration: 1,

  delay: .35,

  ease: "power3.out"

});


gsap.from(".intro-meta", {

  scrollTrigger: {
    trigger: ".intro",
    start: "top 65%"
  },

  y: 30,
  opacity: 0,

  duration: .8,

  delay: .55,

  ease: "power3.out"

});


/* =========================================
   COLLECTION ANIMATION
========================================= */

gsap.from(".collection-card", {

  scrollTrigger: {
    trigger: ".collections",
    start: "top 75%"
  },

  y: 100,
  opacity: 0,

  duration: 1.2,

  stagger: .15,

  ease: "power4.out"

});



/* =========================================
   HERO TYPEWRITER
========================================= */

function startHeroTypewriter() {
  const line = document.querySelector(".hero-typed-line");
  const highlight = document.querySelector(".hero-typed-highlight");
  const cursor = document.querySelector(".hero-typed-cursor");

  if (!line || !highlight || !cursor) return;

  const type = (element, text, speed) => new Promise(resolve => {
    let i = 0;
    const timer = setInterval(() => {
      element.textContent += text[i++];
      if (i >= text.length) {
        clearInterval(timer);
        resolve();
      }
    }, speed);
  });

  const run = async () => {
    if (run.started) return;
    run.started = true;

    await new Promise(resolve => setTimeout(resolve, 350));
    await type(line, "Furniture,", 75);
    await new Promise(resolve => setTimeout(resolve, 160));
    await type(highlight, "Crafted Around You.", 65);

    cursor.style.display = "none";
    highlight.classList.add("blinking");
  };

  if (document.readyState === "complete") run();
  else window.addEventListener("load", run, { once: true });
}


/* =========================================
   GALLERY — MADE TO BE NOTICED TYPEWRITER
========================================= */

function startGalleryTypewriter() {
  const title = document.querySelector(".gallery-typewriter-title");
  const prefix = document.querySelector(".gallery-typed-prefix");
  const highlight = document.querySelector(".gallery-typed-highlight");
  const cursor = document.querySelector(".gallery-typed-cursor");

  if (!title || !prefix || !highlight || !cursor) return;
  if (title.dataset.started === "true") return;
  title.dataset.started = "true";

  // Keep the heading invisible until the typing animation starts.
  title.classList.add("is-typing");

  const typeText = (element, text, speed) => new Promise(resolve => {
    let index = 0;
    const timer = setInterval(() => {
      element.textContent += text.charAt(index);
      index += 1;
      if (index >= text.length) {
        clearInterval(timer);
        resolve();
      }
    }, speed);
  });

  (async () => {
    await new Promise(resolve => setTimeout(resolve, 250));
    await typeText(prefix, "Made to be ", 85);
    await typeText(highlight, "noticed.", 110);

    // Typing is finished: hide the cursor and continuously blink only “noticed.”
    cursor.classList.add("finished");
    cursor.style.display = "none";
    highlight.classList.add("blink-noticed");
  })();
}

function initGalleryTypewriter() {
  const gallery = document.querySelector(".gallery");
  if (!gallery) return;

  if (!("IntersectionObserver" in window)) {
    startGalleryTypewriter();
    return;
  }

  const observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) {
      startGalleryTypewriter();
      observer.disconnect();
    }
  }, { threshold: 0.25 });

  observer.observe(gallery);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initGalleryTypewriter, { once: true });
} else {
  initGalleryTypewriter();
}


/* =========================================
   MADE FOR LIVING TYPEWRITER
========================================= */

function startCollectionsTypewriter() {
  const title = document.querySelector(".collections-typewriter-title");
  const prefix = document.querySelector(".collections-typed-prefix");
  const word = document.querySelector(".collections-typed-word");
  const cursor = document.querySelector(".collections-typed-cursor");

  if (!title || !prefix || !word || !cursor) return;
  if (title.dataset.started === "true") return;
  title.dataset.started = "true";

  const type = (element, text, speed) => new Promise(resolve => {
    let i = 0;
    const timer = setInterval(() => {
      element.textContent += text.charAt(i);
      i++;

      if (i >= text.length) {
        clearInterval(timer);
        resolve();
      }
    }, speed);
  });

  const run = async () => {
    // Type "Made for " first, then "living."
    await type(prefix, "Made for ", 80);
    await new Promise(resolve => setTimeout(resolve, 120));
    await type(word, "living.", 95);

    // Typing finished: hide cursor and blink ONLY "living."
    cursor.style.display = "none";
    word.classList.add("blinking");
  };

  // Start when the heading comes into view.
  if (!("IntersectionObserver" in window)) {
    run();
    return;
  }

  const observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) {
      run();
      observer.disconnect();
    }
  }, { threshold: 0.25 });

  observer.observe(title);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startCollectionsTypewriter, { once: true });
} else {
  startCollectionsTypewriter();
}

/* =========================================
   MADE FOR LIVING
   10 PRODUCT REVEAL
========================================= */

function startCollectionReveals() {

  const rows =
    document.querySelectorAll(
      ".collection-showcase-item"
    );

  rows.forEach((row, rowIndex) => {

    const parts =
      row.querySelectorAll(
        ".reveal-left, .reveal-right"
      );

    parts.forEach((part, index) => {

      gsap.to(part, {

        scrollTrigger: {

          trigger: row,

          start: "top 78%",

          toggleActions:
            "play none none none"

        },

        x: 0,

        y: 0,

        opacity: 1,

        delay:
          index * 0.14,

        duration: 1.15,

        ease: "power4.out",

        onStart: () => {

          part.classList.add(
            "reveal-visible"
          );

        }

      });

    });

  });

}

startHeroTypewriter();
startCollectionReveals();


/* =========================================
   BESPOKE ANIMATION
========================================= */

gsap.from(".bespoke-heading span", {

  scrollTrigger: {
    trigger: ".bespoke",
    start: "top 70%"
  },

  y: 100,
  opacity: 0,

  duration: 1,

  stagger: .12,

  ease: "power4.out"

});


gsap.from(".bespoke-image", {

  scrollTrigger: {
    trigger: ".bespoke",
    start: "top 70%"
  },

  x: 100,
  opacity: 0,

  duration: 1.3,

  ease: "power4.out"

});


/* =========================================
   PROCESS TITLE TYPEWRITER
========================================= */
function startProcessHeading(){const section=document.querySelector(".process"),typed=document.querySelector(".process-heading-typed"),reality=document.querySelector(".process-reality"),cursor=document.querySelector(".process-heading-cursor");if(!section||!typed||!reality||!cursor)return;const text="From idea to";let started=false;const run=()=>{if(started)return;started=true;let i=0;const timer=setInterval(()=>{typed.textContent+=text[i++];if(i>=text.length){clearInterval(timer);setTimeout(()=>{cursor.classList.add("done");reality.classList.add("revealed")},220)}},75)};if(!("IntersectionObserver" in window)){run();return}const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){run();observer.disconnect()}},{threshold:.35});observer.observe(section)}
startProcessHeading();

/* =========================================
   PROCESS CARD ANIMATION
   01 RIGHT → 02 LEFT → 03 RIGHT → 04 LEFT
========================================= */
const processCards=gsap.utils.toArray(".process-item");
processCards.forEach((card,index)=>{const direction=index%2===0?1:-1;card.classList.add("process-reveal-ready");gsap.set(card,{x:direction*120,opacity:0});gsap.to(card,{scrollTrigger:{trigger:".process-list",start:"top 75%",toggleActions:"play none none none"},x:0,opacity:1,duration:1.05,delay:index*.18,ease:"power4.out",onStart:()=>card.classList.add("is-visible")})});


/* =========================================
   GALLERY ANIMATION
========================================= */

gsap.from(".gallery-item", {

  scrollTrigger: {
    trigger: ".gallery-grid",
    start: "top 75%"
  },

  y: 100,
  opacity: 0,

  duration: 1,

  stagger: .12,

  ease: "power4.out"

});


/* =========================================
   QUOTE ANIMATION
========================================= */

gsap.from(".quote-text", {

  scrollTrigger: {
    trigger: ".quote",
    start: "top 70%"
  },

  y: 80,
  opacity: 0,

  duration: 1.3,

  ease: "power4.out"

});


/* =========================================
   TIMELINE ANIMATION
========================================= */

gsap.from(".timeline-item", {

  scrollTrigger: {
    trigger: ".timeline-list",
    start: "top 75%"
  },

  x: -50,
  opacity: 0,

  duration: .8,

  stagger: .15,

  ease: "power3.out"

});


/* =========================================
   FINAL CTA
========================================= */

gsap.from(".final-heading", {

  scrollTrigger: {
    trigger: ".final-cta",
    start: "top 70%"
  },

  y: 100,
  opacity: 0,

  duration: 1.3,

  ease: "power4.out"

});


/* =========================================
   HERO VIDEO PARALLAX
========================================= */

gsap.to(".hero-video", {

  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: true
  },

  yPercent: 15,

  scale: 1.08

});


/* =========================================
   BESPOKE IMAGE PARALLAX
========================================= */

gsap.to(".bespoke-image img", {

  scrollTrigger: {
    trigger: ".bespoke",
    start: "top bottom",
    end: "bottom top",
    scrub: true
  },

  yPercent: 8

});


/* =========================================
   HERO VIDEO AUTOPLAY
========================================= */

const heroVideo = document.querySelector(".hero-video");

if (heroVideo) {

  heroVideo.play().catch(() => {});

}

/* =========================================
   DIRECTOR MESSAGE — LEFT TEXT / RIGHT IMAGE
========================================= */
(function initDirectorMessage(){
  const section = document.querySelector('.director-message');
  if (!section) return;

  if (!('IntersectionObserver' in window)) {
    section.classList.add('is-visible');
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    if (entries.some(entry => entry.isIntersecting)) {
      section.classList.add('is-visible');
      observer.disconnect();
    }
  }, { threshold: .25 });

  observer.observe(section);
})();

/* =========================================
   OUR JOURNEY — BUILT OVER TIME TYPEWRITER
========================================= */
(function initJourneyHeading(){
  const section = document.querySelector('.journey-section');
  const prefix = document.querySelector('.journey-typed-prefix');
  const highlight = document.querySelector('.journey-typed-highlight');
  const cursor = document.querySelector('.journey-typed-cursor');

  if (!section || !prefix || !highlight || !cursor) return;

  if (section.dataset.typewriterStarted === 'true') return;

  const run = async () => {
    if (section.dataset.typewriterStarted === 'true') return;
    section.dataset.typewriterStarted = 'true';

    const typeText = (element, text, speed) => new Promise(resolve => {
      let i = 0;
      const timer = setInterval(() => {
        element.textContent += text.charAt(i++);
        if (i >= text.length) {
          clearInterval(timer);
          resolve();
        }
      }, speed);
    });

    await new Promise(resolve => setTimeout(resolve, 180));
    await typeText(prefix, 'Built over ', 85);
    await typeText(highlight, 'time.', 115);

    cursor.style.display = 'none';
    highlight.classList.add('blink-time');
  };

  if (!('IntersectionObserver' in window)) {
    run();
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    if (entries.some(entry => entry.isIntersecting)) {
      run();
      observer.disconnect();
    }
  }, { threshold: .3 });

  observer.observe(section);
})();

/* =========================================
   OUR JOURNEY — SEQUENTIAL TIMELINE REVEAL
========================================= */
(function initJourneyTimeline(){
  const section = document.querySelector('.journey-section');
  const items = [...document.querySelectorAll('.journey-section .timeline-item')];
  if (!section || !items.length) return;

  let started = false;

  const revealItems = () => {
    if (started) return;
    started = true;

    items.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('journey-visible');
      }, index * 230);
    });
  };

  if (!('IntersectionObserver' in window)) {
    revealItems();
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    if (entries.some(entry => entry.isIntersecting)) {
      revealItems();
      observer.disconnect();
    }
  }, { threshold: .18 });

  observer.observe(section);
})();

/* =========================================
   FINAL CTA — TYPEWRITER + BEAUTIFUL BLINK
========================================= */
(function initFinalCTA(){
  const section = document.querySelector('.final-cta');
  const first = document.querySelector('.final-typed-line');
  const second = document.querySelector('.final-typed-second');
  const highlight = document.querySelector('.final-typed-highlight');
  const cursor = document.querySelector('.final-typed-cursor');

  if (!section || !first || !second || !highlight || !cursor) return;
  if (section.dataset.finalStarted === 'true') return;

  const run = async () => {
    if (section.dataset.finalStarted === 'true') return;
    section.dataset.finalStarted = 'true';
    section.classList.add('final-ready');

    const typeText = (element, text, speed) => new Promise(resolve => {
      let i = 0;
      const timer = setInterval(() => {
        element.textContent += text.charAt(i++);
        if (i >= text.length) {
          clearInterval(timer);
          resolve();
        }
      }, speed);
    });

    await new Promise(resolve => setTimeout(resolve, 220));
    await typeText(first, "Let's create", 90);
    await new Promise(resolve => setTimeout(resolve, 120));
    await typeText(second, 'something ', 85);
    await typeText(highlight, 'beautiful.', 105);

    cursor.style.display = 'none';
    highlight.classList.add('blink-beautiful');
  };

  if (!('IntersectionObserver' in window)) {
    run();
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    if (entries.some(entry => entry.isIntersecting)) {
      run();
      observer.disconnect();
    }
  }, { threshold: .28 });

  observer.observe(section);
})();


/* =========================================
   LOCATION SECTION REVEAL
========================================= */
(function initLocationSection(){
  const section = document.querySelector('.location-section');
  if (!section) return;

  const reveal = () => section.classList.add('location-visible');

  if (!('IntersectionObserver' in window)) {
    reveal();
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    if (entries.some(entry => entry.isIntersecting)) {
      reveal();
      observer.disconnect();
    }
  }, { threshold: .18 });

  observer.observe(section);
})();


/* =========================================
   LOCATION HEADING TYPEWRITER
   Types the COMPLETE "Visit Our Showroom" heading,
   then continuously blinks ONLY "Showroom".
========================================= */
(function initLocationHeadingTypewriter(){
  const section = document.querySelector('.location-section');
  const typed = document.getElementById('location-heading-typed');
  const showroom = document.getElementById('location-heading-showroom');
  const cursor = document.getElementById('location-heading-cursor');
  if (!section || !typed || !showroom || !cursor) return;

  let started = false;

  const run = () => {
    if (started) return;
    started = true;

    const firstPart = 'Visit Our ';
    const secondPart = 'Showroom';
    let i = 0;
    let j = 0;

    typed.textContent = '';
    showroom.textContent = '';
    showroom.classList.remove('is-visible', 'is-blinking');
    cursor.classList.remove('done');

    const firstTimer = setInterval(() => {
      typed.textContent += firstPart[i++];
      if (i >= firstPart.length) {
        clearInterval(firstTimer);

        const secondTimer = setInterval(() => {
          showroom.textContent += secondPart[j++];
          showroom.classList.add('is-visible');

          if (j >= secondPart.length) {
            clearInterval(secondTimer);
            setTimeout(() => {
              cursor.classList.add('done');
              showroom.classList.add('is-blinking');
            }, 180);
          }
        }, 85);
      }
    }, 85);
  };

  if (!('IntersectionObserver' in window)) {
    run();
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    if (entries.some(entry => entry.isIntersecting)) {
      run();
      observer.disconnect();
    }
  }, { threshold: 0.25 });

  observer.observe(section);
})();
