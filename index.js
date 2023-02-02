const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 400;

let mouseX = 0;
let mouseY = 0;
let hoveringKnight = false;

class Node{
    constructor(pos, path){
        this.pos = pos;
        this.path = path;          
    }
}

function knightMoves([x,y], [a,b]){
    //create queue for BFS with starting root coords
    let queue = [new Node([x,y], [[x,y]])];
    let currentNode = queue.shift();

    //while the knights current position doesnt === desired position
    while(currentNode.pos[0] !== a || currentNode.pos[1] !== b) {
        //list of current possible moves
        let moves = [
            [currentNode.pos[0] + 2, currentNode.pos[1] - 1],
            [currentNode.pos[0] + 2, currentNode.pos[1] + 1],
            [currentNode.pos[0] - 2, currentNode.pos[1] - 1],
            [currentNode.pos[0] - 2, currentNode.pos[1] + 1],
            [currentNode.pos[0] + 1, currentNode.pos[1] - 2],
            [currentNode.pos[0] + 1, currentNode.pos[1] + 2],
            [currentNode.pos[0] - 1, currentNode.pos[1] - 2],
            [currentNode.pos[0] - 1, currentNode.pos[1] + 2],
        ];
        //for each move, create a node, push it to the BFS queue
        moves.forEach((move) => {
            let node = new Node(move, currentNode.path.concat([move]));
            //node class constructor checks board size limit/ move validity
            if(node) {
                //if node didnt return null, push it to queue
                queue.push(node);
            }
        });
        //make shift item in queue the current node, repeat until youre at desired tile
        currentNode = queue.shift();
        // console.log(currentNode);
    }
    console.log(`if took ${currentNode.path.length - 1} moves to reach ${[a + 1, b + 1]}`);
    let pathToTile = [];
    currentNode.path.forEach((pos) => {
        pathToTile.push(pos);
    });
    console.log(pathToTile)
}

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
    if(
        event.clientX > knightPiece.position.x &&
        event.clientX < knightPiece.position.x + knightPiece.width &&
        event.clientY > knightPiece.position.y &&
        event.clientY < knightPiece.position.y + knightPiece.height
    ){
        hoveringKnight = true;
    } else hoveringKnight = false;     
});
canvas.addEventListener('click', () => {
    console.log(`mouseX: ${mouseX}, mouseY: ${mouseY}`);
    if(mouseX < 0 || mouseX > 7 || mouseY < 0 || mouseY > 7) return null;
    knightMoves(
        [(knightPiece.position.x / 50), (knightPiece.position.y / 50)],
        [mouseX, mouseY]        
    )
    knightPiece.position.x = mouseX * 50;
    knightPiece.position.y = mouseY * 50;
    
})
