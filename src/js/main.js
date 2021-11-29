new Swiper('.hero-slider', {
    direction: 'horizontal',
    loop: true,
    autoplay: true,

});

const formTo = [...document.querySelectorAll('.btn-to-form')]

if (!formTo.length) {

} else {
    formTo.forEach(elem => {
        elem.addEventListener('click', function () {
            console.log('dasdsa')
            const id = 'form';
            const section = document.getElementById(id);
            const y = section.getBoundingClientRect().top + window.pageYOffset;
            elem.classList.add('hidden')
            window.scrollTo({top: y, behavior: 'smooth'});
        })
    })
}

// Перемещение вверх браузера при клике на лого
const logoBtn = [...document.querySelectorAll('.logo')]

if (!logoBtn.length) {

} else {
    logoBtn.forEach(elem => {
        elem.addEventListener('click', function () {
            window.scrollTo({top: 0, behavior: 'smooth'});
        })
    })
}


// Функция видимости кнопки к форме
function btnToForm() {
    const formTo = [...document.querySelectorAll('.btn-to-form')]

    if (!formTo.length) {

    } else {
        const section = document.getElementById('form');

        const y = section.getBoundingClientRect().top + window.pageYOffset;
        const windowTop = window.pageYOffset

        if (windowTop > y || windowTop === y) {
            formTo[0].classList.add('hidden')
        } else {
            formTo[0].classList.remove('hidden')
        }
    }
}

window.addEventListener('scroll', btnToForm)

window.addEventListener('load', btnToForm)

// Перемещение к секции при клике на кнопку следующая секция
const btnNextSection = [...document.querySelectorAll('.btn-next-section')]

if (!btnNextSection.length) {

} else {
    btnNextSection.forEach(elem => {

        elem.addEventListener('click', function (e) {
            e.preventDefault()

            const id = elem.getAttribute('href').replace('#', '')

            const section = document.getElementById(id)

            window.scrollTo({top: section.offsetTop, behavior: 'smooth'});
        })
    })
}

const videoTabs = [...document.querySelectorAll('.video__btn a')]

if (!videoTabs.length) {

} else {
    videoTabs.forEach(elem => {
        elem.addEventListener('click', function (e) {
            e.preventDefault()


            const id = elem.getAttribute('href').replace('#', '')
            const parentSection = elem.parentElement.parentElement.parentElement.parentElement.id
            const video = document.getElementById(id)
            const videoPlayer = document.querySelectorAll(`#${parentSection} .video__player`)
            const videoLinks = document.querySelectorAll(`#${parentSection} .video__btn a`)

            const iframe = document.querySelectorAll(`#${parentSection} iframe`)
            iframe.forEach(iframe => {
                if (iframe.src !== '') {
                    iframe.src = ''
                }
            })


            if (!video.classList.contains('active')) {
                videoLinks.forEach(element => {
                    element.classList.remove('active')
                })
                elem.classList.add('active')
                videoPlayer.forEach(item => {
                    item.classList.remove('active')
                })
                video.classList.add('active')
            }
        })
    })
}

const videoBtn = [...document.querySelectorAll('.video__player > a')]

if (!videoBtn.length) {

} else {
    videoBtn.forEach(elem => {
        elem.addEventListener('click', (e) => {
            e.preventDefault()
            showVideo(elem)
        })
    })
}

function showVideo(val) {
    const iframe = val.nextElementSibling
    if (iframe.tagName === 'IFRAME') {
        iframe.src = val.dataset.src
    }

}

