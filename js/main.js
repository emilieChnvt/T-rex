const dino =document.querySelector('.dino');
const grid = document.querySelector('.grid');
const alert = document.querySelector('#alert');
const scoreDiv = document.querySelector('#score');
let score = 0;
let position = 0;
let gravity = 0.9;
let isJumping = false;
let isGameOver = false;

// dino jump
function control(e){
    // touche entrer taper
    if(e.code === 'Space'){
        if(!isJumping){
            jump()
        }
    }
}
function jump(){
    isJumping = true;
    //how dino move upe/
    let count = 0;

    // permet de découper le mouyvement en petites étapes, ce qui donne l'illusion d'un mouvement continu
    let timerId = setInterval(() => {

        //move down, if(count === 15) => move up stop
        if(count === 15){
            //to stop execution
            clearInterval(timerId);
            let downTimerId = setInterval(() => {
                if(count === 0){
                    clearInterval(downTimerId);
                    isJumping = false
                }
                position -=5;
                count--;
                position = position * gravity;
                dino.style.bottom =  position + 'px';

            }, 20)
        }

        //move up
        position +=30;
        count++;
        position = position * gravity;
        dino.style.bottom = position + 'px'

    }, 20)
}

function generateObstacles(){
    if(!isGameOver){ //cactus en dehors de la grille
        let randomTime = Math.floor(Math.random()*4000);
        let obstaclePosition = window.innerWidth; // commence l'obstacle hors de l'écran
        const obstacle = document.createElement('div');
        obstacle.classList.add('obstacles');
        grid.appendChild(obstacle);
        obstacle.style.left = obstaclePosition + 'px'

        //positionner l'obstacle
        obstacle.style.position = 'absolute';
        obstacle.style.bottom = '0px';
        obstacle.style.left = obstaclePosition + 'px';

        //setInterval déplace l'obstacle => mouvement continu, si l'obstacle sors de l'écran => GAME OVER, tous les éléments du grid supprimés
        let timerId = setInterval(() => {
            if(obstaclePosition > 0 && obstaclePosition < 60 && position < 60){
                clearInterval(timerId);
                alert.innerHTML = ' Game Over'
                isGameOver = true
                //remove all children
                while (grid.firstChild) {
                    grid.removeChild(grid.lastChild);
                }
            }
            obstaclePosition -=10;
            obstacle.style.left = obstaclePosition + 'px';
            if(obstaclePosition<0){
                score++;
                scoreDiv.innerHTML=`Score: ${score}`;
                clearInterval(timerId);
            }
        },20)
        setTimeout(generateObstacles, randomTime);
    }}




generateObstacles()
document.addEventListener('keyup', control);