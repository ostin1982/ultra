const body = document.querySelector('body');
const burgerButton = body.querySelector('.js-durger-button');
const menuHeader = body.querySelector('.js-menu-header');
const wrapperHeader = body.querySelector('.js-wrapper-header');
const scrollObservers = document.querySelectorAll('.observer');
let menuActive = false;

const scrollWidth = window.innerWidth - body.offsetWidth + 'px';

const anime = lottie;

anime.loadAnimation({
    container: burgerButton,
    render: 'svg',
    loop: false,
    autoplay: false,
    path: './json/burger.json',
})

burgerButton.addEventListener('click', (event) => {
    event.preventDefault();

    if(!menuActive) {
        menuHeader.classList.add('header__menu_active');
        wrapperHeader.classList.add('header__wrapper_active');
        body.classList.add('body_lock');
        anime.goToAndStop(18, true);
        body.style.paddingRight = scrollWidth;
        menuActive = true;
    } else {
        menuHeader.classList.remove('header__menu_active');
        wrapperHeader.classList.remove('header__wrapper_active');
        body.classList.remove('body_lock');
        anime.stop();
        body.style.paddingRight = '0px'
        menuActive = false;
    }
    
})

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if(entry.target.id === 'main') {
                wrapperHeader.classList.add('header__wrapper_1');
                wrapperHeader.classList.remove('header__wrapper_2');
                wrapperHeader.classList.remove('header__wrapper_3');
            } else if(entry.target.id === 'white') {
                wrapperHeader.classList.add('header__wrapper_2');
                wrapperHeader.classList.remove('header__wrapper_1');
                wrapperHeader.classList.remove('header__wrapper_3');
            }else if(entry.target.id === 'grey') {
                wrapperHeader.classList.add('header__wrapper_3');
                wrapperHeader.classList.remove('header__wrapper_2');
                wrapperHeader.classList.remove('header__wrapper_1');
            }
        }
    })
}, {
    root: null,
    threshold: [0.01, 0.99]
})

scrollObservers.forEach(scrollObserver => {
    observer.observe(scrollObserver)
});

new Swiper('.main__container', {
    navigation: {
        nextEl: '.main__button .swiper-button-next',
        prevEl: '.main__button .swiper-button-prev',
    },
    pagination: {
        el: '.main__pagination .swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },
    autoplay: {
        delay: 10000,
    },
    loop: true,
})