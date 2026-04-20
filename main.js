let currentQuestions = [];
let currentIndex = 0;
let score = 0;

function startLesson(lessonType) {
    const name = document.getElementById('studentName').value;
    if (!name) {
        alert("لطفاً اكتب اسمك أولاً!");
        return;
    }

    // ربط الاختيار بالمصفوفات الموجودة في الملفات الأخرى
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
    
    container.innerHTML = `<h3>س${currentIndex + 1}: ${q.title}</h3>`;
    
    optionsBox.innerHTML = q.options.map(opt => 
        `<button class="option-btn" onclick="checkAnswer('${opt}')">${opt}</button>`
    ).join('');
    
    document.getElementById('feedback').innerHTML = "";
}

function checkAnswer(selected) {
    const q = currentQuestions[currentIndex];
    const feedback = document.getElementById('feedback');
    if (selected === q.correctAnswer) {
        feedback.innerHTML = `<p style="color:green; font-weight:bold;">✅ ${q.feedback}</p>`;
        score++;
    } else {
        feedback.innerHTML = `<p style="color:red;">❌ حاول ثانية، الإجابة هي: ${q.correctAnswer}</p>`;
    }
}

document.getElementById('nextBtn').onclick = () => {
    if (currentIndex < currentQuestions.length - 1) {
        currentIndex++;
        showQuestion();
    } else {
        alert(`كفو يا ${document.getElementById('studentName').value}! حصلت على ${score} من ${currentQuestions.length}`);
        location.reload(); // لإعادة الموقع للبداية
    }
};
