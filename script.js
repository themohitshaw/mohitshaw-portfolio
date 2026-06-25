/* =========================
   SPLASH SCREEN
========================= */
window.addEventListener("load", () => {
    const splash = document.getElementById("splash");

    setTimeout(() => {
        splash.style.opacity = "0";

        setTimeout(() => {
            splash.style.display = "none";
            document.body.style.overflow = "auto";
        }, 600);

    }, 1000);
});


/* =========================
   NAVBAR MENU
========================= */
const menulist = document.getElementById("menulist");
const bar = document.getElementById("bar");

/* TOGGLE MENU */
function togglemenu() {

    menulist.classList.toggle("active");

    if (menulist.classList.contains("active")) {

        bar.classList.remove("fa-bars");
        bar.classList.add("fa-xmark");

    } else {

        bar.classList.remove("fa-xmark");
        bar.classList.add("fa-bars");
    }
}

/* CLOSE MENU (REUSABLE FIX) */
function closeMenu() {
    menulist.classList.remove("active");

    bar.classList.remove("fa-xmark");
    bar.classList.add("fa-bars");
}

/* CLOSE MENU ON LINK CLICK */
const menuLinks = document.querySelectorAll("#menulist li a");

menuLinks.forEach(link => {
    link.addEventListener("click", () => {

        if (window.innerWidth <= 768) {
            closeMenu();
        }

    });
});


/* =========================
   THEME TOGGLE (FIXED ISSUE)
========================= */
const modeIcon = document.getElementById("mode");
modeIcon.addEventListener("click", function () {
    document.body.classList.toggle("light");
    /* CLOSE MENU WHEN THEME CHANGES (FIX) */
    closeMenu();
    /* ICON SWITCH */
    if (document.body.classList.contains("light")) {
        modeIcon.classList.remove("fa-sun");
        modeIcon.classList.add("fa-moon");
    } else {
        modeIcon.classList.remove("fa-moon");
        modeIcon.classList.add("fa-sun");
    }
});


/* =========================
   TYPEWRITER EFFECT
========================= */
const words = ["Programmer", "Web Developer", "Flask Developer", "Tech Enthusiast", "Database Expert"]
let i = 0;
let j = 0;
let currentWord = "";
let isDeleting = false;
function typeEffect() {
    currentWord = words[i];
    if (isDeleting) {
        document.querySelector(".auto-type").textContent =
            currentWord.substring(0, j--);
    } else {
        document.querySelector(".auto-type").textContent =
            currentWord.substring(0, j++);
    }
    if (!isDeleting && j === currentWord.length + 1) {
        isDeleting = true;
        setTimeout(typeEffect, 1000);
        return;
    }
    if (isDeleting && j === 0) {
        isDeleting = false;
        i = (i + 1) % words.length;
    }
    setTimeout(typeEffect, isDeleting ? 60 : 120);
}

typeEffect();


/* =========================
   DOWNLOAD POPUP
========================= */
function openDownloadPopup(event) {
    event.preventDefault();
    document.getElementById("apkModal").style.display = "flex";
}
function closeModal() {
    document.getElementById("apkModal").style.display = "none";
}
function downloadAPK() {
    closeModal();
    const link = document.createElement("a");
    link.href = "assets/MohitVerse.apk";
    link.download = "MohitVerse.apk";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


/* =========================
   SUCCESS POPUP
========================= */
function openPopup() {
    document.getElementById("popup").style.display = "flex";
}
function closePopup() {
    document.getElementById("popup").style.display = "none";
}


/* =========================
   IMAGE SWITCH
========================= */
function changeImg(mainId, thumb) {
    const mainImg = document.getElementById(mainId);
    mainImg.style.opacity = "0.4";
    setTimeout(() => {
        mainImg.src = thumb.src;
        mainImg.style.opacity = "1";
    }, 150);
}


/* =========================
   VIEW MORE PROJECTS
========================= */
let expanded = false;
function toggleProjects() {
    const extras = document.querySelectorAll(".project-card.extra");
    const btn = document.getElementById("viewMoreBtn");
    if (!expanded) {
        extras.forEach(card => card.style.display = "block");
        btn.innerText = "...Show Less";
        expanded = true;
    } else {
        extras.forEach(card => card.style.display = "none");
        btn.innerText = "View More...";
        expanded = false;
    }
}


/* =========================
   BACK TO TOP BUTTON
========================= */
const topBtn = document.getElementById("topBtn");
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        topBtn.classList.add("show");
    } else {
        topBtn.classList.remove("show");
    }
});
topBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


/* =========================
   CONTACT FORM SUBMIT
========================= */
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const successPopup = document.getElementById("successMessagePopup");
    const closeSuccessBtn = document.getElementById("closeSuccessMessageBtn");
    form.addEventListener("submit", async function (e) {
        e.preventDefault();
        successPopup.classList.add("active");
        const formData = new FormData(form);
        form.reset();
        try {
            await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Accept": "application/json"
                },
                body: formData
            });
        } catch (error) {
            console.log(error);
        }
    });
    closeSuccessBtn.addEventListener("click", function () {
        successPopup.classList.remove("active");
    });
});