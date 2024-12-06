const dino =document.querySelector('.dino');
const grid = document.querySelector('.grid');


// dino jump
function control(e){
    // touche entrer taper
    if(e.code === 'Space'){
        jump()
    }
}
function jump(){

}
document.addEventListener('keyup', control);