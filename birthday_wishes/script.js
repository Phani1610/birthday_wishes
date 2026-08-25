/* ==========================================
   Happy Birthday Website - script.js (Part 1)
========================================== */

// ===============================
// Typing Effect
// ===============================

const text =
  "Every moment with you is my favorite memory ❤️";

let index = 0;

function typingEffect() {

    const typing = document.getElementById("typing");

    if (!typing) return;

    if (index < text.length) {

        typing.innerHTML += text.charAt(index);

        index++;

        setTimeout(typingEffect, 80);

    }

}

window.onload = function () {

    typingEffect();

    createHearts();

};


// ===============================
// Smooth Scroll
// ===============================

function scrollToSection(id) {

    document.getElementById(id).scrollIntoView({

        behavior: "smooth"

    });

}


// ===============================
// Floating Hearts
// ===============================

/* ===============================
   Floating Hearts Animation
================================ */

function createHearts() {

    const heartsContainer = document.querySelector(".hearts");

    if (!heartsContainer) return;

    function createHeart() {

        const heart = document.createElement("div");

        heart.classList.add("heart");

        const hearts = ["❤️", "💖", "💕", "💗", "💝"];

        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];

        heart.style.left = Math.random() * 100 + "vw";

        heart.style.fontSize = (18 + Math.random() * 35) + "px";

        heart.style.animationDuration = (5 + Math.random() * 6) + "s";

        heart.style.opacity = Math.random();

        heartsContainer.appendChild(heart);

        setTimeout(() => {

            heart.remove();

        }, 10000);

    }

    setInterval(createHeart, 250);

}


// ===============================
// Blow Candles
// ===============================

function blowCandles() {

    const cake = document.getElementById("cake");

    const message = document.getElementById("cakeMessage");

    cake.style.filter = "brightness(0.9)";

    message.innerHTML =
        "🕯 Candles Blown!<br>Make a Beautiful Wish ❤️";

}


// ===============================
// Cut Cake
// ===============================

function cutCake() {

    const cake = document.getElementById("cake");

    const message = document.getElementById("cakeMessage");

    cake.style.transform = "rotate(-2deg) scale(1.05)";

    message.innerHTML =
        "🍰 Cake Cut Successfully ❤️<br>Happy Birthday My Princess 🎉";

}
/* ==========================================
   Happy Birthday Website - script.js (Part 2)
========================================== */

// ===============================
// Open Love Letter
// ===============================

function openLetter() {

    const letter = document.getElementById("letterText");

    if (letter.style.display === "block") {

        letter.style.display = "none";

    } else {

        letter.style.display = "block";

        letter.scrollIntoView({
            behavior: "smooth"
        });

    }

}

// ===============================
// Final Surprise Popup
// ===============================

function surprise() {

    document.getElementById("popup").style.display = "flex";

    startCelebration();

}

// ===============================
// Close Popup
// ===============================

function closePopup() {

    document.getElementById("popup").style.display = "none";

}

// ===============================
// Background Music
// ===============================

const music = document.getElementById("music");

document.addEventListener("click", () => {

    if (music && music.paused) {

        music.play().catch(() => {});

    }

}, {
    once: true
});

// ===============================
// Image Click Effect
// ===============================

const images = document.querySelectorAll(".photos img");

images.forEach((img) => {

    img.addEventListener("click", () => {

        img.classList.toggle("zoom");

    });

});

// ===============================
// Small Celebration Effect
// ===============================

function startCelebration() {

    const emojis = ["❤️", "💖", "💕", "💗", "🎉", "✨", "🌹"];

    let count = 0;

    const interval = setInterval(() => {

        const emoji = document.createElement("div");

        emoji.innerHTML =
            emojis[Math.floor(Math.random() * emojis.length)];

        emoji.style.position = "fixed";
        emoji.style.left = Math.random() * window.innerWidth + "px";
        emoji.style.top = "-50px";
        emoji.style.fontSize = (25 + Math.random() * 20) + "px";
        emoji.style.zIndex = "9999";
        emoji.style.transition = "4s linear";

        document.body.appendChild(emoji);

        setTimeout(() => {

            emoji.style.top = window.innerHeight + "px";

        }, 100);

        setTimeout(() => {

            emoji.remove();

        }, 4000);

        count++;

        if (count > 60) {

            clearInterval(interval);

        }

    }, 150);

}

// ===============================
// Scroll Animation
// ===============================

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

        }

    });

}, {
    threshold: 0.2
});

document.querySelectorAll("section").forEach((section) => {

    section.style.opacity = "0";
    section.style.transform = "translateY(60px)";
    section.style.transition = "1s";

    observer.observe(section);

});
// Welcome Page Button

function openWebsite() {

    document.body.style.opacity = "0";

    document.body.style.transition = "1s";

    setTimeout(() => {

        window.location.href = "main.html";

    }, 1000);

}

window.openWebsite = openWebsite;
