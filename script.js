addEventListener('keydown', checkKey);
let player = document.getElementById('player');
let enemy = document.getElementById('enemy');
let scoreElement = document.getElementById('scoreId');

let score = 0;
let isJumping = false;
let checkTouchInterval = setInterval(checkCollision, 100);

function checkKey(e) {
    // check if pressed the space key
    if (e.key === ' ') {
        jump();
    }
}

function jump() {
    if (isJumping) {
        return; // get out of the function
    }
    isJumping = true;
    player.classList.add('jump');
    setTimeout(removeAnimation, 1000);
    let jumpSound = new Audio('jump.wav');
    jumpSound.play();
}

function removeAnimation() {
    player.classList.remove('jump');
    isJumping = false;
    score++; // increase score when the player lands
    scoreElement.innerHTML = 'Your score: ' + score;
    
    // Update the enemy image every 10 points
    if (score % 10 === 0) {
        changeEnemyImage();
    }
}

function checkCollision() {
    if (elementsOverlap(player, enemy)) {
        clearInterval(checkTouchInterval); // stop checking for collision
        let best = localStorage.getItem('best');
        // if first game (no record is saved) or if the user has beaten his record:
        if (!best || best < score) {
            localStorage.setItem('best', score);
            best = score;
        }

        document.body.innerHTML = `
        <div id="box">
                <p id="overId"> Game Over! </p>  
                <p id="result"> Your score is ${score}  </p> 
                <p id="best"> Your best score is... ${best}  </p> 
                <button id="restart">  <a href="hw.html">RETART</a> </button>
        </div>
        `;
        let overSound = new Audio('gameover.wav');
        overSound.play();
    }
}

function elementsOverlap(el1, el2) {
    const domRect1 = el1.getBoundingClientRect();
    const domRect2 = el2.getBoundingClientRect();

    return !(
        domRect1.top > domRect2.bottom ||
        domRect1.right < domRect2.left ||
        domRect1.bottom < domRect2.top ||
        domRect1.left > domRect2.right
    );
}

// פונקציה לשינוי תמונת האויב
function changeEnemyImage() {
    let enemyImages = [
        "https://d3m9l0v76dty0.cloudfront.net/system/photos/13896606/original/6c03aa146d191f6885de21493a022971.png",  // תמונה ראשונה
        "https://upload.wikimedia.org/wikipedia/he/5/5e/%D7%92%D7%95%D7%9E%D7%91%D7%94_%D7%9E%D7%A8%D7%99%D7%95.png",  // תמונה שנייה
        "https://upload.wikimedia.org/wikipedia/he/d/da/Sheldon_Plankton.png",  // תמונה שלישית
    ];

    let randomIndex = Math.floor(Math.random() * enemyImages.length);
    enemy.src = enemyImages[randomIndex];
}
