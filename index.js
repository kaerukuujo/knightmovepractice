const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');


canvas.width = 400;
canvas.height = 400;

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
                c.fillStyle = 'rgb(0, 0, 0)'
                c.fillRect(x, y, x + 50, y + 50);
                x += 50;
            }
        }        
        y += 50;
    }
}

drawSquares();