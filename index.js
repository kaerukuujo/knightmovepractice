const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 400;

let mouseX = 0;
let mouseY = 0;

const board = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
]

function drawSquares(){
    let x = 0;
    let y = 0;
    for(let i = 0; i < 8; i++){
        if(i === 0|| i % 2 === 0) x = 0;
        else x = -50;
        
        for(let j = 0; j < 9; j++){ 
            if(j === 0 || j % 2 === 0) {
                c.fillStyle = 'rgb(255, 255, 255)'
                c.fillRect(x, y, x + 50, y + 50);
                x += 50;
            } else {
                c.fillStyle = 'rgb(0, 0, 0)';
                c.fillRect(x, y, x + 50, y + 50);
                x += 50;
            }
        }        
        y += 50;
    }
}

class node{
    constructor({pos, path}){
        if(pos[0] < 0 || pos[0] > 7 || pos[1] < 0 || pos[1] > 7) return null;
        return { pos, path }
    }
}

class knight{
    constructor(){
        this.width = 50;
        this.height = 50;
        this.image = new Image();
        this.image.src = './img/knight.png';
        this.position = {
            x: 200,
            y: 200
        };
        this.moves = [
            [1, 2], [1, -2], [2, 1], [2, -1], [-1, 2], [-1, -2], [-2, 1], [-2, -1] 
        ];        
    }

    draw(){
        // this.image.width = 50;
        // this.image.height = 50;
        this.image.onload = 
        c.drawImage(
            this.image, 
            this.position.x, 
            this.position.y,
            this.width,
            this.height
        );
    }

    update(){
        this.draw();
    }

}

function animate(){
    const frame = requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    drawSquares();
    knightPiece.update();
}

const knightPiece = new knight();


// drawSquares();
animate();

canvas.addEventListener('mousemove', (event) => {
    mouseX = Math.floor((event.clientX * 2) / 100);
    mouseY = Math.floor((event.clientY * 2) / 100);       
});
canvas.addEventListener('click', () => {
    console.log(`mouseX: ${mouseX}, mouseY: ${mouseY}`);
    knightPiece.position.x = mouseX * 50;
    knightPiece.position.y = mouseY * 50;
})
