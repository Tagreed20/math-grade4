let currentQuestions = [];
let currentIndex = 0;
let score = 0;

function startLesson(type) {
    const name = document.getElementById('studentName').value;
    if (!name) {
        alert("من فضلك اكتب اسمك أولاً يا بطل!");
        return;
    }

    if (type === 'division') currentQuestions = divisionQuestions;
    if (type === 'geometry') currentQuestions = geometryQuestions;
    if (type === 'fractions') currentQuestions = fractionsQuestions;

    document.getElementById('lessonSelector').style.display = 'none';
    document.getElementById('questionBox').style.display = 'block';
    showQuestion();
    buildNav();
}

function showQuestion() {
    const q = currentQuestions[currentIndex];
    document.getElementById('questionText').innerHTML = `<h3>س${currentIndex + 1}: ${q.title}</h3>`;
    
    const optionsHtml = q.options.map(opt => 
        `<button class="option-btn" onclick="checkAnswer('${opt}')">${opt}</button>`
    ).join('');
    
    document.getElementById('optionsContainer').innerHTML = optionsHtml;
    document.getElementById('feedbackMessage').innerHTML = "";
    updateProgress();
}

function checkAnswer(selected) {
    const q = currentQuestions[currentIndex];
    const feedback = document.getElementById('feedbackMessage');
    
    if (selected === q.correctAnswer) {
        feedback.innerHTML = `<p style="color:green;">${q.feedback}</p>`;
        score++;
    } else {
        feedback.innerHTML = `<p style="color:red;">حاول مرة أخرى! الإجابة الصحيحة هي: ${q.correctAnswer}</p>`;
    }
}

function updateProgress() {
    const percent = ((currentIndex + 1) / currentQuestions.length) * 100;
    document.getElementById('progressBar').style.display = 'block';
    document.getElementById('progressBar').style.width = percent + '%';
}

function buildNav() {
    const grid = document.getElementById('numbersGrid');
    grid.innerHTML = currentQuestions.map((_, i) => 
        `<div class="q-circle">${i + 1}</div>`
    ).join('');
}

document.getElementById('nextBtn').style.display = 'inline-block';
document.getElementById('nextBtn').onclick = () => {
    if (currentIndex < currentQuestions.length - 1) {
        currentIndex++;
        showQuestion();
    } else {
        alert(`أحسنت يا ${document.getElementById('studentName').value}! درجتك هي: ${score} من ${currentQuestions.length}`);
    }
};
