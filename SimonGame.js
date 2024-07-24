let gameSeq = []; // stores random color 
let userSeq = []; // stores color picked by user
let started = false; // initially game is not started
let level = 0; // initially level is 0

let h2 = document.querySelector("h2");
let colors = ["red", "yellow", "green", "purple"]; // button colors

document.addEventListener("keypress", function() {  // document mei cursor raha aur key press kiye toh game start ho jayega
    if (started == false) { // if game is not started
        console.log("game is started");

        started = true; // game is started
        levelUp(); // start the game
    }
});

function levelUp() {
    userSeq = []; // new level ke liye userseq fir se start hoga
    level++;
    h2.innerText = `Level ${level}`; // h2 ke jgh ye line dikhegi

    let randomIdx = Math.floor(Math.random() * 4); // random indx nikal liye koi random color ke liye of color array
    let randomColor = colors[randomIdx];
    let randomButton = document.querySelector(`.${randomColor}`); // jo color ayega voh button select hogi random button

    gameSeq.push(randomColor);
    console.log(gameSeq);
    gameFlash(randomButton); // fir voh color(button) flash hoga (means white hoga thode der ke liye)
}

function gameFlash(randomButton) { // game flash karega ek baar if above situation is satisfy
    randomButton.classList.add("gameFlash"); // flash class add kiye btn mei
    setTimeout(function() {
        randomButton.classList.remove("gameFlash"); // 1 sec ke liye white color hoga
    }, 250);
} // yaha bs ek button press ho rahi hai

function userFlash(randomButton) {
    randomButton.classList.add("userFlash"); // flash class add kiye btn mei
    setTimeout(function() {
        randomButton.classList.remove("userFlash"); // 1 sec ke liye white color hoga
    }, 250);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function btnPress() { // user click btn
    console.log(this);
    let btn = this;
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    userFlash(btn); // current btn flash ho after pressing it

    checkAns(userSeq.length - 1); // last element ko check karege
}

function checkAns(idx) { // for checking color seq
    if (userSeq[idx] === gameSeq[idx]) { // sequence match kiye toh ans sahi h
        if (userSeq.length === gameSeq.length) { // jb dono ki length same h means ans bhi sahi h toh level up
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game over! Your score was <b>${level}</b> <br />press any key to restart`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
