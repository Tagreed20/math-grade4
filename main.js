// تحميل مكتبة القصاصات
const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js';
document.head.appendChild(script);

let currentQuestions = [];
let currentIndex = 0;
let score = 0;

function startLesson(lessonType) {
    const name = document.getElementById('studentName').value;
    if (!name) { alert("اكتب اسمك يا بطل أولاً! ✨"); return; }

    if (lessonType === 'division') currentQuestions = divisionQuestions;
    if (lessonType === 'geometry') currentQuestions = geometryQuestions;
    if (lessonType === 'fractions') currentQuestions = fractionsQuestions;

    document.getElementById('lessonMenu').style.display = 'none';
    document.getElementById('quizArea').style.display = 'block';
    showQuestion();
}

function showQuestion() {
    const q = currentQuestions[currentIndex];
    const container = document.getElementById('questionContainer');
    const optionsBox = document.getElementById('optionsContainer');
    
    container.innerHTML = `<h2 style="color:#0284c7">السؤال ${currentIndex + 1}</h2><p style="font-size:1.3rem">${q.title}</p>`;
    
    optionsBox.innerHTML = q.options.map(opt => 
        `<button class="option-btn" onclick="checkAnswer('${opt}')">${opt}</button>`
    ).join('');
    
    document.getElementById('feedback').innerHTML = "";
    document.getElementById('feedback').className = "";
    updateProgress();
}

function checkAnswer(selected) {
    const q = currentQuestions[currentIndex];
    const feedback = document.getElementById('feedback');
    if (selected === q.correctAnswer) {
        feedback.innerHTML = `🎉 بطل/ة! ${q.feedback}`;
        feedback.className = "feedback-correct";
        score++;
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } else {
        feedback.innerHTML = `ركز قليلاً.. الإجابة الصحيحة هي: ${q.correctAnswer}`;
        feedback.className = "feedback-wrong";
    }
}

function updateProgress() {
    const prg = ((currentIndex + 1) / currentQuestions.length) * 100;
    document.getElementById('progressBar').style.width = prg + "%";
}

document.getElementById('nextBtn').onclick = () => {
    if (currentIndex < currentQuestions.length - 1) {
        currentIndex++;
        showQuestion();
    } else {
        confetti({ particleCount: 200, spread: 160 });
        alert(`انتهت الرحلة! نتيجتك: ${score} من ${currentQuestions.length}`);
        location.reload();
    }
};
