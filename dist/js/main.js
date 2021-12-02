new Swiper('.hero-slider', {
    direction: 'horizontal',
    loop: true,
    autoplay: true,
    effect: 'fade',
    fadeEffect: {
        crossFade: true,
    },
    speed: 3000,
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

        if ((windowTop + 350) > y || windowTop === y) {
            formTo[0].classList.add('hidden')
        } else {
            formTo[0].classList.remove('hidden')
        }
    }
}

window.addEventListener('scroll', btnToForm)

window.addEventListener('load', btnToForm)

// Перемещение к секции при клике на кнопку следующая секция
const btnNextSection = [...document.querySelectorAll('.btn-to-form-next-section')]

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

const videoTabs = [...document.querySelectorAll('.video a:not(.btn-next-section)')]

if (!videoTabs.length) {

} else {
    videoTabs.forEach(elem => {
        elem.addEventListener('click', function (e) {
            e.preventDefault()


            const id = elem.getAttribute('href').replace('#', '')
            const parentSection = elem.parentElement.parentElement.parentElement.parentElement.parentElement.id
            console.log(parentSection)

            const video = document.getElementById(id)
            const videoPlayer = document.querySelectorAll(`#${parentSection} .video-block`)
            const videoLinks = document.querySelectorAll(`#${parentSection} a:not(.btn-next-section)`)

            const iframe = document.querySelectorAll(`#${parentSection} iframe`)
            iframe.forEach(iframe => {
                if (iframe.src !== '') {
                    iframe.remove()
                }
            })

            $('.block-overlay').fadeIn(300);

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

// Scroll to anchor
$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    if ($.attr(this, 'href') === '#') {
        return false;
    }

    let offset = 0;

    if ($(window).width() < 992) {
        offset = 0;
    }

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top - offset
    }, 500);
});


let player;

function createVideo(videoBlockId, videoId) {
    player = new YT.Player(videoBlockId, {
        videoId: videoId,
        playerVars: {
            // 'autoplay':1,
            'autohide': 1,
            'showinfo': 0,
            'rel': 0,
            'loop': 1,
            'playsinline': 1,
            'fs': 0,
            'allowsInlineMediaPlayback': true
        },
        events: {
            'onReady': function (e) {
                // e.target.mute();
                // if ($(window).width() > 991) {
                setTimeout(function () {
                    e.target.playVideo();
                }, 200);
                // }
            }
        }
    });
}

// Video
$('.video-block:not([data-video-modal])').on('click', function () {
    $(this).addClass('playing');
    $(this).find('.block-overlay').fadeOut(300);

    let videoId = $(this).find('.play-btn').data('video-id');

    if (!videoId) {
        videoId = $(this).data('video-id');
    }

    if (videoId == undefined) {
        $(this).find('video')[0].play();
    } else{
        let videoType = $(this).data('video-type') ? $(this).data('video-type').toLowerCase() : 'youtube';

        if (videoType == 'youtube') {
            $(this).append('<div class="video-iframe" id="'+videoId+'"></div>');
            createVideo(videoId, videoId);
        } else if(videoType == 'vimeo'){
            $(this).append('<div class="video-iframe" id="'+videoId+'"><iframe allow="autoplay" class="video-iframe" src="https://player.vimeo.com/video/'+videoId+'?playsinline=1&autoplay=1&transparent=0&app_id=122963"></div>');
        }
    }
});



