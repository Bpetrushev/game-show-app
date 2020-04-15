const qwertyID = document.querySelector('#qwerty');
const phraseID = document.querySelector('#phrase ');
const ul = phraseID.querySelector('ul');
const divOL = document.querySelector('#scoreboard');
const ol = divOL.querySelector('ol');
let missed = 0; //player life
let score = 0;
const phrases = ['The Dark Knight', 'The Dark Knight Rises', 'Lord of the rings', 'interstellar', 'Joker', 'The Green mile', 'Inception'];

//Hide overlay div on click .btn__reset
const overlay = document.querySelector('#overlay');
const h2 = overlay.querySelector('h2');
const a = overlay.querySelector('a');
const start = document.querySelector('.btn__reset');
start.addEventListener('click', (e) => {
    overlay.style.display = 'none';
});

const getRandomPhraseAsArray = (arr) => {
    let randNumb = Math.floor(Math.random() * Math.floor(arr.length));
    return arr[randNumb].split('');
}

const addPhraseToDisplay = (arr) => {
    console.log(arr);
    for(let i=0; i<arr.length; i++){
        const li = document.createElement('li');
        li.className = 'space';
        if(arr[i] !== " "){
            li.className = 'letter';
        }
        ul.appendChild(li);
    }

}
let praseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(praseArray);

const resetGame = () => {
    missed = 0;
    score = 0;
    ol.innerHTML = '';
    for(let i=0; i<5; i++){
        ol.innerHTML += `<li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li>`;
    }
    const button = qwertyID.querySelectorAll('button');
    for(let i=0; i<button.length; i++){
        button[i].className = '';
        button[i].disabled = false;
    }
    const li = ul.querySelectorAll('li');
    for(let i=0; i<li.length; i++){
        ul.removeChild(li[i]);
    }
    praseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(praseArray);
}

const checkLetter = (button) => {
    let check = false;
    const li = ul.querySelectorAll('li');
    for(let i=0; i<praseArray.length; i++){
        if(button.textContent === praseArray[i].toLowerCase()){
            check = true;
            score++;
            li[i].textContent = praseArray[i];
        }
        check ? button.className = 'show' : button.className = 'chosen';
        button.disabled = true;

    }
    return check ? button.textContent : null;
}

const checkWin = () => {
    const li = ul.querySelectorAll('li.letter').length;
    if(missed >= 5){
        overlay.style.display = "";
        overlay.className = 'lose';
        h2.textContent = "GAME OVER!";
        a.textContent = 'Try again.';
        resetGame();
    } else if(score === li){
        overlay.style.display = "";
        overlay.className = 'win';
        h2.textContent = "Winner!";
        a.textContent = 'Try again.';
        resetGame();
    }
}

qwertyID.addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON'){
        const button = e.target;
        const check = checkLetter(button);
        if(check === null) {
            const li = ol.firstElementChild;
            missed++;
            ol.removeChild(li); 
        }
        checkWin(); 
    }
});