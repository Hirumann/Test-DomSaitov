const slider = document.querySelector('.wheight__slider');
const slides = document.querySelectorAll('.wheight__slide');
const prevButton = document.querySelector('.wheight__slider-nav.prev');
const nextButton = document.querySelector('.wheight__slider-nav.next');
const dots = document.querySelectorAll('.wheight__dot');

let currentIndex = 0;
let startX = 0;
let endX = 0;

// Функция для обновления позиции слайдера
function updateSliderPosition() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
}

// Функция для показа следующего слайда
function showNextSlide() {
    if (currentIndex < slides.length / 4) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateSliderPosition();
}

// Функция для показа предыдущего слайда
function showPrevSlide() {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = slides.length / 4;
    }
    updateSliderPosition();
}

// Обработчик клика по кнопке "вперед"
nextButton.addEventListener('click', showNextSlide);

// Обработчик клика по кнопке "назад"
prevButton.addEventListener('click', showPrevSlide);

// Обработчик клика по точкам навигации
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        updateSliderPosition();
    });
});

// Обработчики свайпов
slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

slider.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const threshold = 50; // Порог для определения свайпа
    if (startX - endX > threshold) {
        // Свайп влево
        showNextSlide();
    } else if (endX - startX > threshold) {
        // Свайп вправо
        showPrevSlide();
    }
}



window.addEventListener('scroll', function() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (window.scrollY > 300 && window.innerWidth > 1024) { // Показываем кнопку, если прокручено больше 300px
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

document.getElementById('scrollToTopBtn').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Плавная прокрутка наверх
    });
});

