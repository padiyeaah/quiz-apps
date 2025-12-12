class AppLayout extends HTMLElement {
    connectedCallback() {
        fetch("components/layout.html")
            .then(res => res.text())
            .then(html => {
                this.innerHTML = html;

                this.initThemeButton();
                this.initVolumeButton();
            });
    }

    // ===============================
    // THEME HANDLER (PERSISTENT)
    // ===============================
    initThemeButton() {
        const themeBtn = this.querySelector(".theme");

        const savedTheme = localStorage.getItem("theme");
        const dark = savedTheme === "dark";

        document.body.classList.toggle("dark-theme", dark);

        themeBtn.addEventListener("click", () => {
            const newTheme = document.body.classList.toggle("dark-theme");
            localStorage.setItem("theme", newTheme ? "dark" : "light");
        });
    }

    // ===============================
    // MUSIC HANDLER (PERSISTENT + RESUME)
    // ===============================
    initVolumeButton() {
        const music = this.querySelector("#bg-music");
        const volumeBtn = this.querySelector(".volume");
        const iconOn = volumeBtn.querySelector(".bx-volume-full");
        const iconOff = volumeBtn.querySelector(".bx-volume-mute");

        // 1. Ambil data saved
        let savedVolume = localStorage.getItem("music");
        let savedTime = parseFloat(localStorage.getItem("music_time")) || 0;

        // 2. Kalau pertama kali buka website → default off
        if (savedVolume === null) {
            savedVolume = "off";
            localStorage.setItem("music", "off");
            iconOn.style.display = "none";
            iconOff.style.display = "block";
        }

        // 3. Set detik terakhir
        music.currentTime = savedTime;

        // 4. Apply status awal
        if (savedVolume === "on") {
            music.volume = 0.5;
            music.play().catch(() => {});

            iconOn.style.display = "none";
            iconOff.style.display = "block";
        } else {
            music.pause();
            iconOn.style.display = "block";
            iconOff.style.display = "none";
        }

        // 5. Simpan waktu berjalan
        music.addEventListener("timeupdate", () => {
            localStorage.setItem("music_time", music.currentTime);
        });

        // 6. Toggle ketika user klik
        volumeBtn.addEventListener("click", () => {
            if (music.paused) {
                music.play();
                localStorage.setItem("music", "on");

                iconOn.style.display = "block";
                iconOff.style.display = "none";
            } else {
                music.pause();
                localStorage.setItem("music", "off");

                iconOn.style.display = "none";
                iconOff.style.display = "block";
            }
        });
    }
}

customElements.define("app-layout", AppLayout);


// ===============================
// CURSOR EFFECT
// ===============================
document.addEventListener("mousemove", function (e) {
    const dot = document.createElement("div");
    dot.className = "cursor-dot";
    dot.style.left = e.pageX + "px";
    dot.style.top = e.pageY + "px";
    document.body.appendChild(dot);

    setTimeout(() => {
        dot.style.transition = "opacity 0.3s ease, transform 0.3s ease";
        dot.style.opacity = "0";
        dot.style.transform = "translate(-50%, -50%) scale(2)";
    }, 10);

    setTimeout(() => dot.remove(), 6000);
});

// ===============================
// BACK BUTTON
// ===============================
document.querySelector(".back").addEventListener("click", function (e) {
    e.preventDefault();
    window.history.back();
});