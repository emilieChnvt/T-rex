const dino =document.querySelector('.dino');
const grid = document.querySelector('.grid');
let position = 0;
let gravity = 0.9
let isJumping = false;

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
    let count = 0
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
document.addEventListener('keyup', control);