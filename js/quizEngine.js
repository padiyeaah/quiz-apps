 // ======================
 // DATA SOAL (5 soal)
 // ======================
 const questions = [{
         q: "Hewan apa yang bisa terbang?",
         answers: ["Kucing", "Ayam", "Kelelawar", "Ular"],
         correct: 2
     },
     {
         q: "2 + 2 = ?",
         answers: ["3", "4", "5", "6"],
         correct: 1
     },
     {
         q: "Ibu kota Indonesia adalah?",
         answers: ["Bandung", "Surabaya", "IKN", "Medan"],
         correct: 2
     },
     {
         q: "Warna langit biasanya?",
         answers: ["Merah", "Hijau", "Biru", "Hitam"],
         correct: 2
     },
     {
         q: "Hari sebelum Jumat adalah?",
         answers: ["Senin", "Selasa", "Rabu", "Kamis"],
         correct: 3
     }
 ];


 // ======================
 // VARIABEL GLOBAL
 // ======================
 const username = localStorage.getItem("username") || "Pengguna";
 let currentIndex = 0;
 let score = 0;

 const questionText = document.getElementById("question");
 const buttons = document.querySelectorAll(".btn-answer");

 // popup
 const popup = document.getElementById("result-popup");
 const resultText = document.getElementById("result-text");
 const closeBtn = document.getElementById("close-popup");


 // ======================
 // TAMPILKAN SOAL
 // ======================
 function showQuestion() {
     const q = questions[currentIndex];
     questionText.textContent = q.q;

     // isi text jawaban A-D
     buttons.forEach((btn, index) => {
         btn.innerHTML = `<span class="badge">${String.fromCharCode(65+index)}</span>
                         <p>${q.answers[index]}</p>`;
     });
 }


 // ======================
 // KETIKA JAWABAN DIKLIK
 // ======================
 buttons.forEach((btn, index) => {
     btn.addEventListener("click", () => {
         const correctIndex = questions[currentIndex].correct;

         if (index === correctIndex) score++;

         currentIndex++;

         if (currentIndex < questions.length) {
             showQuestion();
         } else {
             showResult();
         }
     });
 });


 // ======================
 // TAMPILKAN POPUP HASIL
 // ======================
 const feedbackByScore = {
     0: `Yah... gapapa banget ${username}, namanya juga baru pertama kali coba`,
     1: `gwenchanaa~, ${username} masi bisa ningkatin di next koo. Semangat yaa!`,
     2: `Lumayan laa, ${username} bisa coba lagi. Kamu udah dapet beberapa nii`,
     3: `Wow, Sedikit lagi ${username} pasti lebih jago`,
     4: `Bagusss ${username}! Tinggal dikit lagi nii menuju perfect!`,
     5: `PERFECT!! Kamu keren bangett ${username}!!`
 };

 function showResult() {
     const feedback = feedbackByScore[score] || `${username}, good job!`;

     resultText.innerHTML = `
        ${feedback}<br>
        <strong>Skor: ${score} dari ${questions.length}</strong>
    `;

     popup.classList.remove("hidden");
 }




 closeBtn.addEventListener("click", () => {
     popup.classList.add("hidden");
     location.reload(); // restart
 });


 // ======================
 // MULAI QUIZ
 // ======================
 showQuestion();