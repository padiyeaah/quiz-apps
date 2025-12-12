const input = document.getElementById("username");
const startBtn = document.getElementById("start-btn");

startBtn.addEventListener("click", () => {
    const name = input.value.trim();

    if (name === "") {
        alert("Isi nama dulu yaa~");
        return;
    }

    localStorage.setItem("username", name);
    window.location.href = "quizez.html";
});