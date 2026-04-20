// استدعاء مكتبة القصاصات الورقية (Confetti) من رابط خارجي
const confettiScript = document.createElement('script');
confettiScript.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js';
document.head.appendChild(confettiScript);

let currentQuestions = [];
let currentIndex = 0;
let score = 0;
let studentName = "";

function startLesson(lessonType) {
    studentName = document.getElementById('studentName').value;
    if (!studentName || studentName.trim() === "") {
        alert("يا مبدع/ة، فضلاً اكتب اسمك أولاً! ✍️");
        return;
    }

    try {
        if (lessonType === 'division') currentQuestions = divisionQuestions;
        if (lessonType === 'geometry') currentQuestions = geometryQuestions;
        if (lessonType === 'fractions') currentQuestions = fractionsQuestions;
        
        if (!currentQuestions || currentQuestions.length === 0) {
            throw new Error("الأسئلة غير موجودة");
        }

        document.getElementById('lessonMenu').style.display = 'none';
        document.getElementById('quizArea').style.display = 'block';
        showQuestion();
    } catch (error) {
        alert("فيه مشكلة في تحميل ملف الأسئلة.. تأكدي أن أسماء الملفات كلها أحرف صغيرة!");
        console.error(error);
    }
}

function showQuestion() {
    const q = currentQuestions[currentIndex];
    const container = document.getElementById('questionContainer');
    const optionsBox = document.getElementById('optionsContainer');
    
    // سطر عرض الصورة (للمستقبل): إذا كان السؤال يحتوي على صورة، سيظهرها
    const imageHtml = q.image ? `<img src="${q.image}" style="max-width:100%; border-radius:15px; margin-bottom:15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">` : "";
    
    container.innerHTML = `
        <div style="background:#f0f9ff; padding:20px; border-radius:20px; margin-bottom:20px; border: 2px solid #bae6fd;">
            ${imageHtml}
            <h2 style="color:#0369a1; margin:0 0 10px 0;">السؤال ${currentIndex + 1}</h2>
            <p style="font-size:1.3rem; font-weight:bold; color:#1e293b; margin:0;">${q.title}</p>
        </div>`;
    
    optionsBox.innerHTML = q.options.map(opt => 
        `<button class="option-btn" onclick="checkAnswer('${opt}')">${opt}</button>`
    ).join('');
    
    document.getElementById('feedback').innerHTML = "";
    document.getElementById('feedback').className = ""; // مسح التنسيق القديم
    updateProgress();
}

function checkAnswer(selected) {
    const q = currentQuestions[currentIndex];
    const feedback = document.getElementById('feedback');
    
    // تعطيل الأزرار بعد الإجابة لمنع الضغط المتكرر
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(btn => btn.disabled = true);

    if (selected === q.correctAnswer) {
        // تنسيق الإجابة الصحيحة
        feedback.innerHTML = `🌟 بطل/ة يا ${studentName}! ${q.feedback}`;
        feedback.className = "feedback-correct";
        score++;
        
        // تشغيل احتفالية القصاصات الورقية (Confetti)
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#0ea5e9', '#38bdf8', '#4ade80', '#fdf2f8'] // ألوان باستيل للقصاصات
            });
        }
    } else {
        // تنسيق الإجابة الخاطئة
        feedback.innerHTML = `محاولة جيدة يا ${studentName}، ركز في القادم! الإجابة الصحيحة هي: ${q.correctAnswer}`;
        feedback.className = "feedback-wrong";
    }
}

function updateProgress() {
    const prg = ((currentIndex + 1) / currentQuestions.length) * 100;
    document.getElementById('progressBar').style.width = prg + "%";
}

document.getElementById('nextBtn').onclick = () => {
    // التحقق من أن الطالب أجاب على السؤال الحالي قبل الانتقال
    if (document.getElementById('feedback').innerHTML === "") {
        alert("فضلاً اختر إجابة أولاً!");
        return;
    }

    if (currentIndex < currentQuestions.length - 1) {
        currentIndex++;
        showQuestion();
    } else {
        // احتفالية ختامية كبيرة
        if (typeof confetti === 'function') {
            confetti({ particleCount: 200, spread: 160, origin: { y: 0.6 } });
        }
        alert(`كفو يا ${studentName}! نتيجتك هي ${score} من ${currentQuestions.length}.. أنت رائع/ة! 🏆`);
        location.reload();
    }
};
