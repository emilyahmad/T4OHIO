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

const rev2 = document.getElementById('r2');
const rev3 = document.getElementById('r3');

const d1 = document.getElementById('dropdown1');
const short = document.getElementById('long-collapsed');
const long = document.getElementById('long-expanded');
long.hidden = true;
let isExpanded1 = false;
review1.addEventListener('click', reviewFunc1);
function reviewFunc1() {
    if (isExpanded1 == false) {
        // make sure other cards don't change height when 1st does
        rev2.style.height = '16rem';
        rev3.style.height = '16rem';

        review1.style.marginTop = '5.4%';
        d1.style.transform = 'rotate(' + 180 + 'deg)';
        short.hidden = true;
        long.hidden = false;
        isExpanded1 = true;
    } else { // collapse
        review1.style.marginTop = '.5%';
        d1.style.transform = 'rotate(' + 0 + 'deg)';
        short.hidden = false;
        long.hidden = true;
        isExpanded1 = false;
        long.innerHTML = "It was such a great experience coming here. I love trying new boba places. The staff was so nice and welcoming and if you had any questions they knew the answer! I tried the Kyoto matcha iced latte and I loved it! My fiancé tried the tiramisu";
    }
}

const first = document.getElementByClassName('menu-start');
first.hidden = false;
const second = document.getElementByClassName('menu-second');
second.hidden = true;

const bev = document.getElementById('drink-bubble-background');
const snack = document.getElementById('snack-bubble-background');

bev.addEventListener('click', showBevChoices);
function showBevChoices() {
    first.hidden = true;
    second.hidden = false;
}
