let currentQuestions = [];
let currentIndex = 0;
let score = 0;

function startLesson(lessonType) {
    const name = document.getElementById('studentName').value;
    if (name.trim() === "") {
        alert("يا بطل/ة، اكتب اسمك أولاً! 😊");
        return;
    }

    // هنا نتأكد أن البيانات تم تحميلها من الملفات الأخرى
    if (lessonType === 'division') currentQuestions = typeof divisionQuestions !== 'undefined' ? divisionQuestions : [];
    if (lessonType === 'geometry') currentQuestions = typeof geometryQuestions !== 'undefined' ? geometryQuestions : [];
    if (lessonType === 'fractions') currentQuestions = typeof fractionsQuestions !== 'undefined' ? fractionsQuestions : [];

    if (currentQuestions.length === 0) {
        alert("عذراً، لم يتم تحميل الأسئلة بعد. تأكد من ملفات الأسئلة!");
        return;
    }

    document.getElementById('lessonMenu').style.display = 'none';
    document.getElementById('quizArea').style.display = 'block';
    showQuestion();
}

function showQuestion() {
    const q = currentQuestions[currentIndex];
    const container = document.getElementById('questionContainer');
    const optionsBox = document.getElementById('optionsContainer');
    
    container.innerHTML = `<h2 style="color:#1976d2">السؤال ${currentIndex + 1}</h2><h3>${q.title}</h3>`;
    
    optionsBox.innerHTML = q.options.map(opt => 
        `<button class="option-btn" onclick="checkAnswer('${opt}')">${opt}</button>`
    ).join('');
    
    document.getElementById('feedback').innerHTML = "";
    updateProgress();
}

function checkAnswer(selected) {
    const q = currentQuestions[currentIndex];
    const feedback = document.getElementById('feedback');
    if (selected === q.correctAnswer) {
        feedback.innerHTML = `<span style="color:#4caf50">🎉 بطل/ة! ${q.feedback}</span>`;
        score++;
    } else {
        feedback.innerHTML = `<span style="color:#f44336">ركز قليلاً.. الإجابة: ${q.correctAnswer}</span>`;
    }
}

function updateProgress() {
    const prg = ( (currentIndex + 1) / currentQuestions.length ) * 100;
    document.getElementById('progressBar').style.width = prg + "%";
}

document.getElementById('nextBtn').onclick = () => {
    if (currentIndex < currentQuestions.length - 1) {
        currentIndex++;
        showQuestion();
    } else {
        alert(`كفو يا بطل/ة! نتيجتك: ${score} من ${currentQuestions.length}`);
        location.reload();
    }
};
