/* Video controls */
const herovideo = document.getElementById('myVideo');
const pause = document.getElementById('pauseButton');
pause.addEventListener('click', pauseVideo);
const play = document.getElementById('playButton');
play.addEventListener('click', playVideo);
// hide play button first
play.hidden = true;
// track if playing or not
function pauseVideo() {
    pause.hidden = true;
    herovideo.pause();
    play.hidden = false;
}
function playVideo() {
    play.hidden = true;
    herovideo.play();
    pause.hidden = false;
}
/* OPTIMIZE LATER (use $ code) */
/* Read more button for reviews */
const review1 = document.getElementById('expand-review1');
const d1 = document.getElementById('dropdown1');
let isExpanded1 = false;
review1.addEventListener('click', reviewFunc1);
function reviewFunc1() {
    if (isExpanded1 == false) {
        review1.style.marginTop = '5.4%';
        d1.style.transform = 'rotate(' + 180 + 'deg)';
        isExpanded1 = true;
    } else { // collapse
        review1.style.marginTop = '.5%';
        d1.style.transform = 'rotate(' + 0 + 'deg)';
    }
}

const review2 = document.getElementById('expand-review2');
const d2 = document.getElementById('dropdown2');
let isExpanded2 = false;
review2.addEventListener('click', reviewFunc2);
function reviewFunc2() {
    if (isExpanded2 == false) {
        review2.style.marginTop = '5.4%';
        d2.style.transform = 'rotate(' + 180 + 'deg)';
        isExpanded2 = true;
    } else { // collapse
        review2.style.marginTop = '.5%';
        d2.style.transform = 'rotate(' + 0 + 'deg)';
    }
}

const review3 = document.getElementById('expand-review3');
const d3 = document.getElementById('dropdown3');
let isExpanded3 = false;
review3.addEventListener('click', reviewFunc3);
function reviewFunc3() {
    if (isExpanded3 == false) {
        review3.style.marginTop = '5.4%';
        d3.style.transform = 'rotate(' + 180 + 'deg)';
        isExpanded3 = true;
    } else { // collapse
        review3.style.marginTop = '.5%';
        d3.style.transform = 'rotate(' + 0 + 'deg)';
    }
}

