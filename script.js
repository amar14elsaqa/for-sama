// 1. تشغيل الموقع والموسيقى عند الضغط على زر الدخول
const enterBtn = document.getElementById('enterBtn');
const introOverlay = document.getElementById('introOverlay');
const mainContent = document.getElementById('mainContent');
const bgMusic = document.getElementById('bgMusic');
const playPauseBtn = document.getElementById('playPauseBtn');
const songStatus = document.getElementById('songStatus');

let isPlaying = false;

enterBtn.addEventListener('click', () => {
    introOverlay.classList.add('fade-out');
    mainContent.classList.remove('hidden');
    setTimeout(() => {
        mainContent.style.opacity = '1';
    }, 50);

    // تشغيل أغنية حلم عمري
    bgMusic.play().then(() => {
        isPlaying = true;
        playPauseBtn.textContent = '⏸️';
        songStatus.textContent = 'شغالة الآن...';
    }).catch(() => {
        songStatus.textContent = 'اضغطي للتشغيل';
    });
});

// التحكم في زر الصوت العائم
playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        playPauseBtn.textContent = '▶️';
        songStatus.textContent = 'متوقفة مؤقتاً';
    } else {
        bgMusic.play();
        playPauseBtn.textContent = '⏸️';
        songStatus.textContent = 'شغالة الآن...';
    }
    isPlaying = !isPlaying;
});

// 2. حساب العدادات (أول شات 24/2/2026 وأول مقابلة 24/5/2026)
const chatDate = new Date('2026-02-24T00:00:00').getTime();
const meetDate = new Date('2026-05-24T00:00:00').getTime();

function updateTimers() {
    const now = new Date().getTime();

    calculateDiff(now - chatDate, 'chat');
    calculateDiff(now - meetDate, 'meet');
}

function calculateDiff(diff, prefix) {
    if (diff < 0) diff = 0;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById(`${prefix}-days`).textContent = days;
    document.getElementById(`${prefix}-hours`).textContent = hours;
    document.getElementById(`${prefix}-mins`).textContent = mins;
    document.getElementById(`${prefix}-secs`).textContent = secs;
}

setInterval(updateTimers, 1000);
updateTimers();

// 3. فتح الظرف السري
const envelopeWrapper = document.getElementById('envelopeWrapper');
const fullLetter = document.getElementById('fullLetter');

envelopeWrapper.addEventListener('click', () => {
    envelopeWrapper.style.display = 'none';
    fullLetter.classList.remove('hidden');
});

// 4. تكبير الصور (Lightbox)
function openLightbox(src, caption) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');

    lightboxImg.src = src;
    lightboxCaption.textContent = caption;
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

// 5. رسم سماء النجوم المتحركة في الخلفية (تليق باسم Sky)
const canvas = document.getElementById('starsCanvas');
const ctx = canvas.getContext('2d');

let stars = [];
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

for (let i = 0; i < 140; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.6,
        alpha: Math.random(),
        speed: Math.random() * 0.015 + 0.005
    });
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        star.alpha += star.speed;
        if (star.alpha > 1 || star.alpha < 0.2) star.speed = -star.speed;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
    });
    requestAnimationFrame(animateStars);
}
animateStars();
// 6. برمجة السؤال اللطيف وهروب الزرار وتساقط القلوب
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const loveResponse = document.getElementById('loveResponse');
const quizButtons = document.getElementById('quizButtons');

// دالة تهريب زرار "شوية صغيرين"
function moveNoButton() {
    // نخلي الزرار يتحرك بحرية في الشاشة كلها عشان ميتقفش أبداً
    noBtn.style.position = 'fixed';
    
    const maxX = window.innerWidth - noBtn.offsetWidth - 20;
    const maxY = window.innerHeight - noBtn.offsetHeight - 20;
    
    const randomX = Math.max(20, Math.floor(Math.random() * maxX));
    const randomY = Math.max(20, Math.floor(Math.random() * maxY));
    
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
    noBtn.style.zIndex = '999';
}

// يهرب عند اقتراب الماوس (للكمبيوتر)
noBtn.addEventListener('mouseover', moveNoButton);

// يهرب عند محاولة لمسه (للموبايل)
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // يمنع الضغط الفعلي
    moveNoButton();
});

// دالة مطر القلوب والورد عند الضغط على "قد الدنيا كلها"
yesBtn.addEventListener('click', () => {
    // إخفاء الأزرار وإظهار رسالة الحب
    quizButtons.style.display = 'none';
    noBtn.style.display = 'none';
    loveResponse.classList.remove('hidden');

    // إطلاق 60 قلب ووردة يتساقطوا على الشاشة
    const emojis = ['❤️', '💖', '🌹', '💕', '✨', '🌸', '😍'];
    for (let i = 0; i < 60; i++) {
        setTimeout(() => {
            createFallingItem(emojis);
        }, i * 60);
    }
});

function createFallingItem(emojis) {
    const item = document.createElement('div');
    item.classList.add('falling-heart');
    item.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    
    // مكان عشوائي بالعرض وحجم وسرعة عشوائية
    item.style.left = Math.random() * 100 + 'vw';
    item.style.fontSize = (Math.random() * 1.2 + 1.2) + 'rem';
    item.style.animationDuration = (Math.random() * 2 + 2.5) + 's';
    
    document.body.appendChild(item);

    // مسح العنصر بعد انتهاء الحركة عشان ميتقلش المتصفح
    setTimeout(() => {
        item.remove();
    }, 4500);
}