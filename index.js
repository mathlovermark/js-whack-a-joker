const holesdiv = document.querySelector(".holes");
const score = document.querySelector(".score");
const time = document.querySelector(".time");
const startbutton = document.querySelector(".modal button");
const modal = document.querySelector(".modal");
const highscore = document.querySelector(".highscore");
const gameover = document.querySelector(".display h2");
const hammer = document.querySelector(".hammer")


// Game Interface JS 
let ouch = new Audio("./sounds/ouch.mp3")
let hammerSound = new Audio("./sounds/Hit.mp3")

for (let i = 1 ; i <=16 ; i++) {
    let hole = document.createElement("div");
        hole.classList.add("hole");
        holesdiv.appendChild(hole);

    let pile = document.createElement("img")
        pile.classList.add("pile");
        hole.appendChild(pile)
        pile.src="./image/soil.png"

    let joker = document.createElement("img")
        joker.classList.add("joker");
        joker.src = "./image/joker.png"
        joker.setAttribute("name", "joker")
        hole.appendChild(joker)

}

// Hammer Interface
window.addEventListener("mousemove" , (e) => {
    hammer.style.left = e.pageX + "px";
    hammer.style.top = (e.pageY - 60) + "px";
})

// Game Functionality JS

let timeleft;
let playerscore = 0;
let maxscore = 0;

// Game Animation and Actions
window.addEventListener("click", (e)=> {
    hammer.style.transform="rotateZ(-50deg) rotateY(-180deg)";
    hammerSound.play();
    hammerSound.currentTime = 0
    setTimeout(() => {
        hammer.style.transform="rotateZ(0deg) rotateY(-180deg)"
    }, 40)
    
        if(e.target.name==="joker") {
            setTimeout(()=> {
                document.body.classList.toggle("flash")
            },100);
            document.body.classList.toggle("flash");
            ouch.play();
            ouch.currentTime = 0;
            playerscore = playerscore + 10
            score.textContent = playerscore;
        }
    })

// close modal, game start 
startbutton.addEventListener("click", () => {
    modal.classList.add("modalclose");
    timeleft = 30;
    playerscore = 0;
    score.textContent = playerscore;
    time.textContent = timeleft;
  
    let timer = setInterval(()=> {time.textContent = timeleft;
        if(timeleft === 0) {
            gameover.style.visibility='visible'
            modal.classList.remove('modalclose')
            if (playerscore > maxscore) {
                maxscore = playerscore
                highscore.textContent=maxscore
            }
            else {
                highscore.textContent=maxscore
            }
            clearInterval(timer)
        }
        else {
        timeleft--
        time.textContent = timeleft < 10 ? "0" + timeleft :
        timeleft
        const joker = document.querySelectorAll('.joker')
        let choosejoker = Math.floor(Math.random() * joker.length)
        joker[choosejoker].style.pointerEvents="all"
        joker[choosejoker].style.animation="faceup 2s ease"
        joker[choosejoker].addEventListener('animationend', ()=> {
            joker[choosejoker].style.pointerEvents="all"
            joker[choosejoker].style.animation="facedown 0.5s ease"
            joker[choosejoker].addEventListener('animationend', ()=> {
                joker[choosejoker].style.pointerEvents="none"
            })
        })

    }}, 1000);
})
