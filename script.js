// order now page functions

const first = document.getElementById('menu-start');
const second = document.getElementById('menu-second');
first.hidden = false;
second.hidden = true;

const bev = document.getElementById('drink');
const snack = document.getElementById('snack');

bev.addEventListener('click', showBevChoices);
function showBevChoices() {
    first.hidden = true;
    second.hidden = false;
}

// mobile media queries

const mobileMediaQuery = window.matchMedia("(max-width: 600px)");
const mobile = document.getElementById('mobile-view');
const desktop = document.getElementById('desktop-view');
mobile.hidden = true;
desktop.hidden = false;

if (mobileMediaQuery.matches) {
    mobile.hidden = false;
    desktop.hidden = true;
}

/* Video controls */
const herovideo = document.getElementById('myVideo');
const pause = document.getElementById('pauseButton');
const play = document.getElementById('playButton');
// only attach handlers if the elements exist on the page
if (pause) pause.addEventListener('click', pauseVideo);
if (play) play.addEventListener('click', playVideo);
// hide play button first (only if present)
if (play) play.hidden = true;
// track if playing or not
function pauseVideo() {
    if (pause) pause.hidden = true;
    if (herovideo) herovideo.pause();
    if (play) play.hidden = false;
}
function playVideo() {
    if (play) play.hidden = true;
    if (herovideo) herovideo.play();
    if (pause) pause.hidden = false;
} 



/* OPTIMIZE LATER (use $ code) */
/* Read more button for reviews */
const review1 = document.getElementById('expand-review1');
if (review1) {
    const rev2 = document.getElementById('r2');
    const rev3 = document.getElementById('r3');
    const d1 = document.getElementById('dropdown1');
    const short = document.getElementById('long-collapsed');
    const long = document.getElementById('long-expanded');
    if (long) long.hidden = true;
    let isExpanded1 = false;
    review1.addEventListener('click', reviewFunc1);
    function reviewFunc1() {
        if (!isExpanded1) {
            // make sure other cards don't change height when 1st does
            if (rev2) rev2.style.height = '16rem';
            if (rev3) rev3.style.height = '16rem';

            review1.style.marginTop = '5.4%';
            if (d1) d1.style.transform = 'rotate(180deg)';
            if (short) short.hidden = true;
            if (long) long.hidden = false;
            isExpanded1 = true;
        } else { // collapse
            review1.style.marginTop = '.5%';
            if (d1) d1.style.transform = 'rotate(0deg)';
            if (short) short.hidden = false;
            if (long) long.hidden = true;
            isExpanded1 = false;
            if (long) long.innerHTML = "It was such a great experience coming here. I love trying new boba places. The staff was so nice and welcoming and if you had any questions they knew the answer! I tried the Kyoto matcha iced latte and I loved it! My fiancé tried the tiramisu";
        }
    }
}