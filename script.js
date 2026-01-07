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
